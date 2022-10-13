import { Schema, model } from "mongoose";
import { User } from "../interfaces/user";

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("Users", UserSchema);
export default UserModel;
