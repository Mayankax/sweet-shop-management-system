import request from "supertest";
import app from "../app";

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
