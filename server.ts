import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database";
import auth from "./routes/auth";
import user from "./routes/user";
import characters from "./routes/characters";

dotenv.config();
connectDB();

const app: Express = express();
const port: string = process.env.PORT || "8000";

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Rick and Morty api");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log("Server is running");
  });
}

app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/characters", characters);

export default app;
