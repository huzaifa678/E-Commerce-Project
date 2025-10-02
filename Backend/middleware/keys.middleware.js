import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createPrivateKey, createPublicKey } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKeyPath = path.resolve(__dirname, "../keys/private.pem");
const publicKeyPath = path.resolve(__dirname, "../keys/public.pem");

const privatePem = readFileSync(privateKeyPath, "utf8");
const publicPem = readFileSync(publicKeyPath, "utf8");

export const privateKey = createPrivateKey({
  key: privatePem,
  format: "pem",
  type: "pkcs8",
});

export const publicKey = createPublicKey({
  key: publicPem,
  format: "pem",
  type: "spki",
});
