import request from "supertest";
import app from "../app";
import { clearDatabase } from "./testUtils";

beforeEach(async () => {
  await clearDatabase();
});

describe("Auth - Register", () => {
  it("should register a new user and return JWT", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Mayank",
        email: "mayank@test.com",
        password: "password123"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });
});
