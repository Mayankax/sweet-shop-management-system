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

describe("Auth - Login Invalid Credentials", () => {
  it("should fail with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "mayank@test.com",
        password: "wrongpassword"
      });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});
