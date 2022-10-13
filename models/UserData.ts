import { Schema, model } from "mongoose";
import { UserData } from "../interfaces/userData";

const UserDataSchema = new Schema<UserData>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    favorites: [Number],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserDataModel = model("UsersDatas", UserDataSchema);
export default UserDataModel;
