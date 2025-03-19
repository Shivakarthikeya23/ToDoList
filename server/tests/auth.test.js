const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../models/user");

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    // Use test database
    await mongoose.connect(
      process.env.MONGODB_URI_TEST || process.env.MONGODB_URI
    );
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/register", () => {
    it("should create a new user", async () => {
      const res = await request(app).post("/api/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message");
    });

    it("should validate required fields", async () => {
      const res = await request(app).post("/api/register").send({
        username: "test",
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("POST /api/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });
    });

    it("should login with valid credentials", async () => {
      const res = await request(app).post("/api/login").send({
        email: "test@example.com",
        password: "password123",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("user");
    });

    it("should not login with invalid credentials", async () => {
      const res = await request(app).post("/api/login").send({
        email: "test@example.com",
        password: "wrongpassword",
      });
      expect(res.statusCode).toBe(401);
    });
  });
});
