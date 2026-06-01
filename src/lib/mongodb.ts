import { MongoClient, ObjectId, type Collection, type Db } from "mongodb";

export interface UserDoc {
  _id?: ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface VerificationCodeDoc {
  _id?: ObjectId;
  email: string;
  codeHash: string;
  createdAt: Date;
  expiresAt: Date;
  usedAt: Date | null;
  attempts: number;
  lastAttemptAt?: Date;
}

export interface SessionDoc {
  _id?: ObjectId;
  userId: ObjectId;
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface ContactMessageDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  notificationStatus: "pending" | "sent" | "failed";
  emailedAt?: Date;
  notificationError?: string;
}

declare global {
  var __mongoClientPromise__: Promise<MongoClient> | undefined;
}

let indexesPromise: Promise<void> | null = null;

function getMongoUri() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  return uri;
}

function getDatabaseName() {
  return process.env.MONGODB_DB_NAME || "techreviewhub";
}

function createMongoClient() {
  return new MongoClient(getMongoUri());
}

export function getMongoClient() {
  if (!global.__mongoClientPromise__) {
    global.__mongoClientPromise__ = createMongoClient().connect();
  }

  return global.__mongoClientPromise__;
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(getDatabaseName());
}

async function ensureIndexes() {
  if (!indexesPromise) {
    indexesPromise = (async () => {
      const db = await getDatabase();

      await Promise.all([
        db.collection<UserDoc>("users").createIndex({ email: 1 }, { unique: true }),
        db.collection<VerificationCodeDoc>("verification_codes").createIndex(
          { email: 1, createdAt: -1 },
        ),
        db.collection<VerificationCodeDoc>("verification_codes").createIndex(
          { expiresAt: 1 },
          { expireAfterSeconds: 0 },
        ),
        db.collection<SessionDoc>("sessions").createIndex({ tokenHash: 1 }, { unique: true }),
        db.collection<SessionDoc>("sessions").createIndex({ userId: 1 }),
        db.collection<SessionDoc>("sessions").createIndex(
          { expiresAt: 1 },
          { expireAfterSeconds: 0 },
        ),
        db.collection<ContactMessageDoc>("contact_messages").createIndex({ createdAt: -1 }),
      ]);
    })().catch((error) => {
      indexesPromise = null;
      throw error;
    });
  }

  await indexesPromise;
}

export async function getCollections(): Promise<{
  users: Collection<UserDoc>;
  verificationCodes: Collection<VerificationCodeDoc>;
  sessions: Collection<SessionDoc>;
  contactMessages: Collection<ContactMessageDoc>;
}> {
  await ensureIndexes();

  const db = await getDatabase();

  return {
    users: db.collection<UserDoc>("users"),
    verificationCodes: db.collection<VerificationCodeDoc>("verification_codes"),
    sessions: db.collection<SessionDoc>("sessions"),
    contactMessages: db.collection<ContactMessageDoc>("contact_messages"),
  };
}
