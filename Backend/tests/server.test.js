import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import userRouter from "../route/users.route.js";
import purchaseRouter from "../route/product.route.js";
import Session from "../model/session.model.js";
import { privateKey, publicKey } from "../middleware/keys.middleware.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testdb";

beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
}, 30000);

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
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");

    const session = await Session.findOne({ refreshToken: res.body.refreshToken });
    expect(session).not.toBeNull();
    expect(session.UserName).toBe(res.body.UserName);
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

  it("should login with correct credentials and return tokens", async () => {
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
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");

    const session = await Session.findOne({ refreshToken: res.body.refreshToken });
    expect(session).not.toBeNull();
  });

  it("should renew access token using refresh token", async () => {
    const signupRes = await request(app).post("/api/users/signup").send({
      UserName: "Huzaifa Gill",
      Email: "huzaifagill433@gmail.com",
      Password: "vdfvfvdfvdv"
    });

    const refreshToken = signupRes.body.refreshToken;

    const res = await request(app).post("/api/users/renew").send({ refreshToken });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");
    expect(res.body.refreshToken).not.toBe(refreshToken);

    const oldSession = await Session.findOne({ refreshToken });
    expect(oldSession).toBeNull();

    const newSession = await Session.findOne({ refreshToken: res.body.refreshToken });
    expect(newSession).not.toBeNull();
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
  let accessToken;

  beforeAll(async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ UserName: "huzaifa433", Password: "secret123" });

    accessToken = res.body.accessToken;
  });

  it("should create a purchase", async () => {
    const res = await request(app)
      .post("/api/products/payments")
      .set("Authorization", `Bearer ${accessToken}`) 
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
