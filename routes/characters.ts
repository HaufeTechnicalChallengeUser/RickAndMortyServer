import { Router } from "express";
import { auth } from "../middleware/auth";
import {
  getAllCharacters,
  getSingleCharacter,
  getMultipleCharacters,
} from "../controllers/characters";

const router = Router();

router.get("/all", auth, ...getAllCharacters);
router.get("/single/:id", auth, ...getSingleCharacter);
router.get("/multiple/:ids", auth, ...getMultipleCharacters);

export default router;
