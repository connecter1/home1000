import { v4 as uuidv4 } from "uuid";
import { createUser, getUserByEmail, getUserById } from "../models/userModel.js";
import { isValidUsername, isValidEmail, isValidPassword } from "../utils/validate.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import tokenUtils from "../utils/tokenUtils.js";
const { generateToken } = tokenUtils;

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!isValidUsername(username) || !isValidEmail(email) || !isValidPassword(password))
      return res.status(400).json({ message: "Invalid user input" });

    if (await getUserByEmail(email)) return res.status(409).json({ message: "Email already in use" });

    const userId = uuidv4();
    await createUser(userId, username, email, await hashPassword(password));

    return res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !(await comparePassword(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken({ userId: user.id, email: user.email });
    return res.json({ message: "Login successful", token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    next(err);
  }
};