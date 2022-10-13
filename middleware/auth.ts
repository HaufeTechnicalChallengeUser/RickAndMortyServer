import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("token");
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, authorization denied" }] });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    typeof decoded !== "string" && (req.user = decoded.user);
    next();
  } catch {
    res.status(401).json({ errors: [{ msg: "Token is invalid" }] });
  }
};
