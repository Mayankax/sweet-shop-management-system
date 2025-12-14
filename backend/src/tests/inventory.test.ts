import request from "supertest";
import app from "../app";
import { clearDatabase } from "./testUtils";

let adminToken: string;
let userToken: string;
let sweetId: string;

beforeEach(async () => {
  await clearDatabase();

  // Admin setup
  await request(app).post("/api/auth/register").send({
    name: "Admin",
    email: "admin@test.com",
    password: "password123"
  });

  const { prisma } = await import("../utils/prisma");
  await prisma.user.update({
    where: { email: "admin@test.com" },
    data: { role: "ADMIN" }
  });

  const adminLogin = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "password123"
  });

  adminToken = adminLogin.body.token;

  // User setup
  const userRes = await request(app).post("/api/auth/register").send({
    name: "User",
    email: "user@test.com",
    password: "password123"
  });

  userToken = userRes.body.token;

  // Create sweet
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Ladoo",
      category: "Indian",
      price: 5,
      quantity: 10
    });

  sweetId = sweetRes.body.id;
});

describe("Inventory Management", () => {
  it("user should purchase a sweet (quantity decreases)", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 2 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(8);
  });

  it("admin should restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(15);
  });

  it("should not allow purchase beyond available quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 50 });

    expect(res.status).toBe(400);
  });
});
