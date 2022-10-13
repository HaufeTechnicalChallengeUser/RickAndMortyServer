import { Router } from "express";
import { auth } from "../middleware/auth";
import { getUser, putUserData, getUserData } from "../controllers/user";

const router = Router();

router.get("/", auth, getUser);
router.get("/userdata", auth, getUserData);
router.put("/userdata", auth, ...putUserData);

export default router;
