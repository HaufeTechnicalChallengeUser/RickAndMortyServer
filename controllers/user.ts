import { Request, Response } from "express";
import { check, validationResult, ValidationChain } from "express-validator";
import User from "../models/User";
import UserData from "../models/UserData";
import { UserData as UserDataInterface } from "../interfaces/userData";
import { addOrDeleteFavorites } from "../utils/favorites";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    const userData = await UserData.findOne({
      user: req.user.id,
    }).populate("user", ["username"]);

    if (!userData) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const putUserDataValidation: ValidationChain[] = [
  check("favorite", "Favorite must be a number between 1 and 826").isFloat({
    min: 1,
    max: 826,
  }),
];

const putUserDataRequest = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user?.id).select("-password");
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "User not found" }] });
    }

    const { favorite } = req.body;

    const userDataFields: UserDataInterface = {
      user: req.user.id,
      favorites: [favorite],
    };

    userDataFields.user = req.user.id;
    userDataFields.favorites = [favorite];

    let userData = await UserData.findOne({ user: req.user.id }).populate(
      "user",
      ["username"]
    );

    if (userData) {
      userDataFields.favorites = addOrDeleteFavorites(
        userData?.favorites,
        favorite
      );
    }
    userData = await UserData.findOneAndUpdate(
      { user: req.user.id },
      { $set: userDataFields },
      { new: true }
    ).populate("user", ["username"]);
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const putUserData = [putUserDataValidation, putUserDataRequest];
