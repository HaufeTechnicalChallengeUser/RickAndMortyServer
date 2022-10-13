import supertest from "supertest";
import app from "../server";
import { authUrl } from "./auth.test";

const charactersUrl = "/api/characters";
let token = "";

beforeAll(async () => {
  const { body } = await supertest(app).post(`${authUrl}/signin`).send({
    username: "usertest",
    password: "usertest",
  });
  token = body.token;
});

describe("characters getAllCharacters", () => {
  test("should show an error for invalid page", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .get(`${charactersUrl}/all?page=800`)
      .set("token", token);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Page must be a number between 1 and 42",
        }),
      ])
    );
  });

  test("should show an error for search not found", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .get(`${charactersUrl}/all?page=10&search=ohter`)
      .set("token", token);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Character not found",
        }),
      ])
    );
  });

  test("should return a characters page", async () => {
    const {
      body: { results },
    } = await supertest(app)
      .get(`${charactersUrl}/all?page=20&search=`)
      .set("token", token);
    expect(results).toHaveLength(20);
  });
});

describe("characters getSingleCharacter", () => {
  test("should show an error for invalid id", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .get(`${charactersUrl}/single/999`)
      .set("token", token);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Id must be a number between 1 and 826",
        }),
      ])
    );
  });

  test("should return a character detail", async () => {
    const {
      body: { id },
    } = await supertest(app)
      .get(`${charactersUrl}/single/30`)
      .set("token", token);
    expect(id).toBe(30);
  });
});

describe("characters getMultipleCharacters", () => {
  test("should show an error for invalid ids", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .get(`${charactersUrl}/multiple/1,2,900`)
      .set("token", token);
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Ids must be numbers between 1 and 826",
        }),
      ])
    );
  });

  test("should return a character detail", async () => {
    const { body } = await supertest(app)
      .get(`${charactersUrl}/multiple/10,20,30`)
      .set("token", token);
    const { id } = body[0];
    expect(id).toBe(10);
  });
});
