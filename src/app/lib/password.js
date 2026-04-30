import crypto from "crypto";

const ITERATIONS = 120000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = await pbkdf2(password, salt);

  return `${ITERATIONS}:${salt}:${hash}`;
}

export async function verifyPassword(password, storedHash) {
  const [iterations, salt, originalHash] = storedHash.split(":");
  const hash = await pbkdf2(password, salt, Number(iterations));

  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
}

function pbkdf2(password, salt, iterations = ITERATIONS) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, KEY_LENGTH, DIGEST, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey.toString("hex"));
    });
  });
}
