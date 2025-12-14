import request from "supertest";
import app from "../app";
import { clearDatabase } from "./testUtils";

let adminToken: string;

beforeEach(async () => {
  await clearDatabase();

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

  const login = await request(app).post("/api/auth/login").send({
    email: "admin@test.com",
    password: "password123"
  });

  adminToken = login.body.token;

  await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Barfi",
      category: "Indian",
      price: 15,
      quantity: 20
    });

  await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${adminToken}`)
    .send({
      name: "Chocolate",
      category: "Western",
      price: 30,
      quantity: 10
    });
});

describe("Sweets Search", () => {
  it("should search by name", async () => {
    const res = await request(app)
      .get("/api/sweets/search?name=barfi")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.body.length).toBe(1);
  });

  it("should search by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.body.length).toBe(1);
  });

  it("should search by price range", async () => {
    const res = await request(app)
      .get("/api/sweets/search?minPrice=10&maxPrice=20")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.body.length).toBe(1);
  });
});
