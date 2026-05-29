import crypto from "node:crypto";

import { ObjectId } from "mongodb";
import type { NextResponse } from "next/server";

import { getCollections } from "@/lib/mongodb";

export const SESSION_COOKIE_NAME = "trh_session";
const LOGIN_CODE_TTL_MINUTES = 10;
const SESSION_TTL_DAYS = 30;
const MAX_CODE_ATTEMPTS = 5;

export interface SessionUser {
  id: string;
  email: string;
  createdAt: string;
  lastLoginAt?: string;
}

function hashValue(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

export function generateLoginCode() {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

function generateSessionToken() {
  return crypto.randomBytes(32).toString("hex");
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

export function getLoginCodeTtlMinutes() {
  return LOGIN_CODE_TTL_MINUTES;
}

export async function createVerificationCode(email: string) {
  const { verificationCodes } = await getCollections();
  const normalizedEmail = normalizeEmail(email);
  const code = generateLoginCode();
  const createdAt = new Date();
  const expiresAt = addMinutes(createdAt, LOGIN_CODE_TTL_MINUTES);

  await verificationCodes.deleteMany({ email: normalizedEmail });

  const insertResult = await verificationCodes.insertOne({
    email: normalizedEmail,
    codeHash: hashValue(code),
    createdAt,
    expiresAt,
    usedAt: null,
    attempts: 0,
  });

  return {
    code,
    insertedId: insertResult.insertedId,
    expiresAt,
  };
}

export async function deleteVerificationCodeById(id: ObjectId) {
  const { verificationCodes } = await getCollections();
  await verificationCodes.deleteOne({ _id: id });
}

export async function canSendNewCode(email: string) {
  const { verificationCodes } = await getCollections();
  const normalizedEmail = normalizeEmail(email);
  const sixtySecondsAgo = new Date(Date.now() - 60 * 1000);

  const recentCode = await verificationCodes.findOne(
    {
      email: normalizedEmail,
      createdAt: { $gte: sixtySecondsAgo },
    },
    {
      sort: { createdAt: -1 },
    },
  );

  return !recentCode;
}

async function createSessionForUser(userId: ObjectId) {
  const { sessions } = await getCollections();
  const token = generateSessionToken();
  const expiresAt = addDays(new Date(), SESSION_TTL_DAYS);

  await sessions.insertOne({
    userId,
    tokenHash: hashValue(token),
    createdAt: new Date(),
    expiresAt,
  });

  return {
    token,
    expiresAt,
  };
}

export async function verifyEmailCode(email: string, code: string): Promise<
  | { ok: false; message: string }
  | {
      ok: true;
      token: string;
      expiresAt: Date;
      user: SessionUser;
    }
> {
  const { verificationCodes, users } = await getCollections();
  const normalizedEmail = normalizeEmail(email);

  const verificationCode = await verificationCodes.findOne(
    {
      email: normalizedEmail,
      usedAt: null,
    },
    {
      sort: { createdAt: -1 },
    },
  );

  if (!verificationCode) {
    return { ok: false, message: "Verification code not found. Please request a new code." };
  }

  if (verificationCode.expiresAt.getTime() < Date.now()) {
    return { ok: false, message: "Verification code has expired. Please request a new code." };
  }

  if (verificationCode.attempts >= MAX_CODE_ATTEMPTS) {
    return { ok: false, message: "Too many failed attempts. Please request a new code." };
  }

  if (verificationCode.codeHash !== hashValue(code.trim())) {
    await verificationCodes.updateOne(
      { _id: verificationCode._id },
      {
        $inc: { attempts: 1 },
        $set: { lastAttemptAt: new Date() },
      },
    );

    return { ok: false, message: "Incorrect verification code." };
  }

  await verificationCodes.updateOne(
    { _id: verificationCode._id },
    {
      $set: {
        usedAt: new Date(),
        lastAttemptAt: new Date(),
      },
    },
  );

  const now = new Date();
  let user = await users.findOne({ email: normalizedEmail });

  if (!user) {
    const insertResult = await users.insertOne({
      email: normalizedEmail,
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    });

    user = await users.findOne({ _id: insertResult.insertedId });
  } else {
    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          updatedAt: now,
          lastLoginAt: now,
        },
      },
    );

    user = {
      ...user,
      updatedAt: now,
      lastLoginAt: now,
    };
  }

  if (!user?._id) {
    return { ok: false, message: "Unable to create or load user account." };
  }

  const session = await createSessionForUser(user._id);

  return {
    ok: true,
    token: session.token,
    expiresAt: session.expiresAt,
    user: {
      id: user._id.toHexString(),
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      lastLoginAt: user.lastLoginAt?.toISOString(),
    },
  };
}

export async function getSessionUserFromToken(token?: string | null): Promise<SessionUser | null> {
  if (!token) {
    return null;
  }

  const { sessions, users } = await getCollections();
  const tokenHash = hashValue(token);
  const session = await sessions.findOne({ tokenHash });

  if (!session) {
    return null;
  }

  if (session.expiresAt.getTime() < Date.now()) {
    await sessions.deleteOne({ _id: session._id });
    return null;
  }

  const user = await users.findOne({ _id: session.userId });

  if (!user?._id) {
    await sessions.deleteOne({ _id: session._id });
    return null;
  }

  return {
    id: user._id.toHexString(),
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    lastLoginAt: user.lastLoginAt?.toISOString(),
  };
}

export async function deleteSessionByToken(token?: string | null) {
  if (!token) {
    return;
  }

  const { sessions } = await getCollections();
  await sessions.deleteOne({ tokenHash: hashValue(token) });
}

export function setSessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}
