import supertest from "supertest";
import app from "../server";
import { authUrl } from "./auth.test";

const userUrl = "/api/user";
let token = "";

beforeAll(async () => {
  const { body } = await supertest(app).post(`${authUrl}/signin`).send({
    username: "usertest",
    password: "usertest",
  });
  token = body.token;
});

describe("user getUser", () => {
  test("should show a user", async () => {
    const { body } = await supertest(app).get(userUrl).set("token", token);
    expect(body).toHaveProperty("username");
  });
});

describe("user getUserData", () => {
  test("should show a user with details", async () => {
    const { body } = await supertest(app)
      .get(`${userUrl}/userdata`)
      .set("token", token);
    expect(body).toHaveProperty("favorites");
  });
});

describe("user putUserData", () => {
  test("should show an error for invalid favorite", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .put(`${userUrl}/userdata`)
      .set("token", token)
      .send({
        favorite: 850,
      });
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          msg: "Favorite must be a number between 1 and 826",
        }),
      ])
    );
  });

  test("should edit the favorites section", async () => {
    const favoriteActual = 10;
    const {
      body: { favorites: favoritesBefore },
    } = await supertest(app).get(`${userUrl}/userdata`).set("token", token);
    const {
      body: { favorites: favoritesAfter },
    } = await supertest(app)
      .put(`${userUrl}/userdata`)
      .set("token", token)
      .send({
        favorite: favoriteActual,
      });

    if (favoritesBefore.includes(favoriteActual)) {
      expect(favoritesAfter).toEqual(
        expect.not.arrayContaining([favoriteActual])
      );
    } else {
      expect(favoritesAfter).toEqual(expect.arrayContaining([favoriteActual]));
    }
  });
});
