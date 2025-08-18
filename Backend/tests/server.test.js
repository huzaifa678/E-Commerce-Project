import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

import userRouter from "../route/users.route.js";
import purchaseRouter from "../route/product.route.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

const app = express();
app.use("/api/users", userRouter);
app.use("/api/products", purchaseRouter);

describe("User Signup & Login", () => {
  it("should signup a new user", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({
        UserName: "huzaifa433",
        Email: "huzaifa433@example.com",
        Password: "secret123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("Email", "huzaifa433@example.com");
  });

  it("should not signup with duplicate email", async () => {
    await request(app).post("/api/users/signup").send({
      UserName: "huzaifa433",
      Email: "huzaifa433@example.com",
      Password: "secret123"
    });

    const res = await request(app).post("/api/users/signup").send({
      UserName: "huzaifa123",
      Email: "huzaifa433@example.com",
      Password: "secret456"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "user's account exists");
  });

  it("should login with correct credentials", async () => {
    const hash = await bcryptjs.hash("secret123", 10);
    await mongoose.connection.collection("users").insertOne({
      UserName: "huzaifa433",
      Email: "huzaifa433@example.com",
      Password: hash
    });

    const res = await request(app).post("/api/users/login").send({
      UserName: "huzaifa433",
      Password: "secret123"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Successful login");
    expect(res.body.user).toHaveProperty("username", "huzaifa433");
  });

  it("should not login with wrong password", async () => {
    const hash = await bcryptjs.hash("secret123", 10);
    await mongoose.connection.collection("users").insertOne({
      UserName: "huzaifa433",
      Email: "huzaifa433@example.com",
      Password: hash
    });

    const res = await request(app).post("/api/users/login").send({
      UserName: "huzaifa433",
      Password: "wrongpassword"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid Username or Password");
  });
});

describe("Purchase API", () => {
  it("should create a purchase", async () => {
    const res = await request(app)
      .post("/api/products/payments")
      .send({
        Address: "123 Main St",
        Payment_Method: "Credit Card",
        Phone_Number: "1234567890"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("Address", "123 Main St");
    expect(res.body).toHaveProperty("Payment_Method", "Credit Card");
  });
});
