import request from "supertest";
import app from "../app";
import { clearDatabase } from "./testUtils";

beforeEach(async () => {
  await clearDatabase();
});

describe("Auth - Register Validation", () => {
  it("should fail if email is invalid", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Mayank",
        email: "not-an-email",
        password: "password123"
      });

    expect(res.status).toBe(400);
  });

  it("should fail if password is too short", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Mayank",
        email: "mayank@test.com",
        password: "123"
      });

    expect(res.status).toBe(400);
  });
});
