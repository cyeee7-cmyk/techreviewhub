import nodemailer from "nodemailer";

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

function getSmtpConfig() {
  const host = getRequiredEnv("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT || "587");
  const user = getRequiredEnv("SMTP_USER");
  const pass = getRequiredEnv("SMTP_PASS");
  const from = process.env.SMTP_FROM_EMAIL || user;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    from,
  };
}

function createTransporter() {
  const config = getSmtpConfig();

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });
}

export async function sendLoginCodeEmail(params: {
  email: string;
  code: string;
  expiresInMinutes: number;
}) {
  const config = getSmtpConfig();
  const transporter = createTransporter();

  await transporter.sendMail({
    from: config.from,
    to: params.email,
    subject: "Your TechReviewHub login code",
    text: [
      "Use the verification code below to sign in to TechReviewHub.",
      "",
      `Code: ${params.code}`,
      `Expires in: ${params.expiresInMinutes} minutes`,
      "",
      "If you did not request this code, you can safely ignore this email.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin-bottom: 12px;">TechReviewHub sign in</h2>
        <p>Use the verification code below to complete your sign in.</p>
        <p style="font-size: 32px; font-weight: 700; letter-spacing: 6px; margin: 24px 0;">${params.code}</p>
        <p>This code expires in <strong>${params.expiresInMinutes} minutes</strong>.</p>
        <p>If you did not request this email, you can ignore it.</p>
      </div>
    `,
  });
}

export async function sendContactNotificationEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}) {
  const config = getSmtpConfig();
  const transporter = createTransporter();
  const contactRecipient = process.env.CONTACT_FORM_TO_EMAIL || config.auth.user;

  await transporter.sendMail({
    from: config.from,
    to: contactRecipient,
    replyTo: params.email,
    subject: `[Contact] ${params.subject}`,
    text: [
      "A new message was submitted from the TechReviewHub contact form.",
      "",
      `Name: ${params.name}`,
      `Email: ${params.email}`,
      `Time: ${params.createdAt.toISOString()}`,
      `Subject: ${params.subject}`,
      "",
      params.message,
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin-bottom: 12px;">New contact form message</h2>
        <p><strong>Name:</strong> ${params.name}</p>
        <p><strong>Email:</strong> ${params.email}</p>
        <p><strong>Time:</strong> ${params.createdAt.toISOString()}</p>
        <p><strong>Subject:</strong> ${params.subject}</p>
        <p style="margin-top: 16px; white-space: pre-wrap;">${params.message}</p>
      </div>
    `,
  });
}
