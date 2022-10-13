import { Schema } from "mongoose";

export interface UserData {
  user: Schema.Types.ObjectId;
  favorites: number[];
}
