import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult, ValidationChain } from "express-validator";
import User from "../models/User";
import UserData from "../models/UserData";
import { UserData as UserDataInterface } from "../interfaces/userData";

const signInValidation: ValidationChain[] = [
  check("username", "Username is required").not().isEmpty(),
  check("password", "Password is required").not().isEmpty(),
];

const signInRequest = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
      expiresIn: 86400,
    });
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

const signUpValidation: ValidationChain[] = [
  check("username", "Username is required").not().isEmpty(),
  check("password", "Password with 6 or more characters").isLength({
    min: 6,
  }),
];

const signUpRequest = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(409).json({ errors: [{ msg: "User already exists" }] });
  }

  const { username, password } = req.body;

  user = new User({
    username,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const userData = new UserData({
    user: user.id,
    favorites: [],
  });
  await userData.save();

  const payload = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
    expiresIn: 86400,
  });

  res.status(200).json({ token });
};

export const signIn = [signInValidation, signInRequest];
export const signUp = [signUpValidation, signUpRequest];
