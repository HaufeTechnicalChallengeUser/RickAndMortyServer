import supertest from "supertest";
import jwt from "jsonwebtoken";
import app from "../server";

export const authUrl = "/api/auth";

describe("auth signin", () => {
  test("should show an error asking for password", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .post(`${authUrl}/signin`)
      .send({ username: "user" });
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Password is required" }),
      ])
    );
  });

  test("should show an error for invalid credentials", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .post(`${authUrl}/signin`)
      .send({ username: "user", password: "usertest" });
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Invalid credentials" }),
      ])
    );
  });

  test("should return a valid token", async () => {
    const {
      body: { token },
    } = await supertest(app)
      .post(`${authUrl}/signin`)
      .send({ username: "usertest", password: "usertest" });
    expect(jwt.verify(token, process.env.JWT_SECRET || "")).toHaveProperty(
      "user"
    );
  });
});

describe("auth signup", () => {
  test("should show an error asking for an especific password", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .post(`${authUrl}/signup`)
      .send({ username: "user" });
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "Password with 6 or more characters" }),
      ])
    );
  });

  test("should show an error if user already exists", async () => {
    const {
      body: { errors },
    } = await supertest(app)
      .post(`${authUrl}/signup`)
      .send({ username: "usertest", password: "usertest" });
    expect(errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ msg: "User already exists" }),
      ])
    );
  });
});
