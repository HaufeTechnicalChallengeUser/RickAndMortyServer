import supertest from "supertest";
import app from "../server";

describe("server", () => {
  test("should respond with a 200 status code", async () => {
    const { status } = await supertest(app).get("/");
    expect(status).toBe(200);
  });
  test("should respond with Rick and Morty api", async () => {
    const { text } = await supertest(app).get("/");
    expect(text).toBe("Rick and Morty api");
  });
});
