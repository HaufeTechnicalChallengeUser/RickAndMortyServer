import { Request, Response } from "express";
import { check, validationResult, ValidationChain } from "express-validator";
import {
  getAllCharactersByPage,
  getSingleCharacterById,
  getMultipleCharactersByIds,
} from "../services/characters";

const getAllCharactersValidation: ValidationChain[] = [
  check("page", "Page must be a number between 1 and 42").isFloat({
    min: 1,
    max: 42,
  }),
  check("search", "Search must be a string").isString(),
];

const getAllCharactersRequest = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { page, search } = req.query;

  try {
    const { data } = await getAllCharactersByPage(
      page as string,
      search as string
    );

    res.status(200).json(data);
  } catch (err: any) {
    if (err.response.status === 404) {
      res.status(404).json({ errors: [{ msg: "Character not found" }] });
    } else {
      res.status(500).send("Server Error");
    }
  }
};

const getSingleCharacterValidation: ValidationChain[] = [
  check("id", "Id must be a number between 1 and 826").isFloat({
    min: 1,
    max: 826,
  }),
];

const getSingleCharacterRequest = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const { data } = await getSingleCharacterById(id);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getMultipleCharactersValidation: ValidationChain[] = [
  check("ids").custom((value) => {
    if (
      !value
        .split(",")
        .every((value: string) => parseInt(value) > 0 && parseInt(value) <= 826)
    )
      throw new Error("Ids must be numbers between 1 and 826");
    return true;
  }),
];

const getMultipleCharactersRequest = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ids } = req.params;

  try {
    const { data } = await getMultipleCharactersByIds(ids);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const getAllCharacters = [
  getAllCharactersValidation,
  getAllCharactersRequest,
];
export const getSingleCharacter = [
  getSingleCharacterValidation,
  getSingleCharacterRequest,
];
export const getMultipleCharacters = [
  getMultipleCharactersValidation,
  getMultipleCharactersRequest,
];
