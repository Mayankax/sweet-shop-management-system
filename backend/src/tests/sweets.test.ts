import request from "supertest";
import app from "../app";
import { clearDatabase } from "./testUtils";

let adminToken: string;
let userToken: string;

beforeEach(async () => {
  await clearDatabase();

  // Register admin
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Admin",
      email: "admin@test.com",
      password: "password123"
    });

  // Promote admin in DB
  const { prisma } = await import("../utils/prisma");
  await prisma.user.update({
    where: { email: "admin@test.com" },
    data: { role: "ADMIN" }
  });

  // Login again to get ADMIN token
  const adminLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@test.com",
      password: "password123"
    });

  adminToken = adminLogin.body.token;

  // Register normal user
  const userRes = await request(app)
    .post("/api/auth/register")
    .send({
      name: "User",
      email: "user@test.com",
      password: "password123"
    });

  userToken = userRes.body.token;
});


describe("Sweets API", () => {
  it("admin should add a new sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 10,
        quantity: 100
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Gulab Jamun");
  });

  it("user should not add a sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Rasgulla",
        category: "Indian",
        price: 12,
        quantity: 50
      });

    expect(res.status).toBe(403);
  });

  it("authenticated user should view sweets list", async () => {
    await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 15,
        quantity: 40
      });

    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
