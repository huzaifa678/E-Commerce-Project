import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  username: { type: String, ref: "User", required: true },
  refreshToken: { type: String, required: true, unique: true },
});

const session = mongoose.model("Session", sessionSchema);

export default session;
