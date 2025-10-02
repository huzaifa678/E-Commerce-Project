import { V4 } from "paseto";
import { privateKey, publicKey } from "./keys.middleware.js"; 

export const generateTokens = async (payload) => {
  const accessToken = await V4.sign(payload, privateKey, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  });

  const refreshToken = await V4.sign(payload, privateKey, {
    expiresIn: process.env.REFRESH_TOKEN_EXP,
  });

  return { accessToken, refreshToken };
};

export const verifyAccessToken = async (token) => {
  return await V4.verify(token, publicKey);
};

export const verifyRefreshToken = async (token) => {
  return await V4.verify(token, publicKey);
};
