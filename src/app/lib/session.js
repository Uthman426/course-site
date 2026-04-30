import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "courseflow_session";
const MAX_AGE = 60 * 60 * 24 * 7;
const MIN_SECRET_LENGTH = 20;

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`AUTH_SECRET must be at least ${MIN_SECRET_LENGTH} characters in .env.local.`);
  }

  return secret;
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionToken(payload) {
  const body = base64url(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + MAX_AGE
    })
  );

  return `${body}.${sign(body)}`;
}

export function readSessionToken(token) {
  if (!token) return null;

  const [body, signature] = token.split(".");

  if (!body || !signature || sign(body) !== signature) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}

export async function setSessionCookie(user) {
  const token = createSessionToken({
    id: user._id.toString(),
    name: user.name,
    email: user.email
  });

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/"
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/"
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return readSessionToken(token);
}
