import crypto from "crypto";

const algorithm = "aes-256-cbc";

const SECRET_KEY = Buffer.from("12345678901234567890123456789012"); 
const IV = Buffer.from("1234567890123456");

const TOKEN_EXPIRY_HOURS = 24;

const generateToken = (payload) => {
  const cipher = crypto.createCipheriv(algorithm, SECRET_KEY, IV);
  const tokenData = JSON.stringify({ ...payload, timestamp: Date.now() });

  let encrypted = cipher.update(tokenData, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encrypted;
};

const verifyToken = (token) => {
  try {
    const decipher = crypto.createDecipheriv(algorithm, SECRET_KEY, IV);

    let decrypted = decipher.update(token, "base64", "utf8");
    decrypted += decipher.final("utf8");

    const data = JSON.parse(decrypted);
    const expiryMs = TOKEN_EXPIRY_HOURS * 60 * 60 * 1000;

    if (Date.now() - data.timestamp > expiryMs) {
      throw new Error("Token expired");
    }

    return data;
  } catch {
    throw new Error("Invalid token");
  }
};

export default { generateToken, verifyToken };
