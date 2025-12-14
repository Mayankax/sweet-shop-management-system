import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../utils/validators";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const token = await registerUser(
      parsed.data.name,
      parsed.data.email,
      parsed.data.password
    );

    res.status(201).json({ token });
  } catch (err: any) {
    if (err.message === "EMAIL_EXISTS") {
      return res.status(409).json({ message: "Email already in use" });
    }

    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const token = await loginUser(parsed.data.email, parsed.data.password);
    res.status(200).json({ token });
  } catch {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
