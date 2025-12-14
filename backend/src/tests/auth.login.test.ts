import request from "supertest";
import app from "../app";
import { clearDatabase } from "./testUtils";

beforeEach(async () => {
  await clearDatabase();

  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Mayank",
      email: "mayank@test.com",
      password: "password123"
    });
});

describe("Auth - Login", () => {
  it("should login an existing user and return JWT", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "mayank@test.com",
        password: "password123"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
