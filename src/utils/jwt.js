import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "default-secret";

export const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
