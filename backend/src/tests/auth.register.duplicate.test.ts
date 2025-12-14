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

describe("Auth - Register Duplicate Email", () => {
  it("should not allow registering with same email twice", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Mayank",
        email: "mayank@test.com",
        password: "password123"
      });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Email already in use");
  });
});
