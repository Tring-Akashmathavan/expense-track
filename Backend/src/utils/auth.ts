import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
};
