import users from "../model/users.model.js";
import Session from "../model/session.model.js";
import { generateTokens, verifyRefreshToken } from "../middleware/auth.middleware.js";
import { privateKey, publicKey } from "../middleware/keys.middleware.js";
import bcryptjs from "bcryptjs";

export const signup = async(req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { UserName, Email, Password } = req.body;
        const user = await users.findOne({ Email });
        if (user) {
            return res.status(400).json({ message: "user's account exists" });
        }

        const hash = await bcryptjs.hash(Password, 10);
        const userCreated = new users({
            UserName,
            Email,
            Password: hash
        });
        
        try {
            await userCreated.save();
            console.log("User saved successfully");
        } catch (err) {
            console.error("Error saving user:", err);
        }

        const { accessToken, refreshToken } = await generateTokens({
            id: userCreated.id,
            username: userCreated.UserName,
        });

        const session = new Session({
            username: userCreated.UserName,
            refreshToken,
        })

        await session.save();

        console.log("User created successfully:", userCreated); // Debugging log

        res.status(201).json({
            message: "User added successfully!",
            accessToken,
            refreshToken,
            user: {
                id: userCreated.id,
                UserName:userCreated.UserName,
                Email: userCreated.Email
            },
        });
    } catch (error) {
        console.log("error occured: ", error);
        res.status(500).json({ message : "server error" });
    }
};

export const login = async(req, res) => {
    try {
        console.log("Login request body:", req.body);
        const { UserName, Password } = req.body;
        if (!UserName || !Password) {
            console.log("Missing Username or Password");
            return res.status(400).json({ message: "Username and Password are required" });
        }
        const user = await users.findOne({ UserName });
        if (!user) {
            console.log("User not found"); // Debugging log
            return res.status(400).json({ message: "Invalid Username or Password" });
        }

        const match =  await bcryptjs.compare(Password, user.Password);
        if (!match) {
            console.log("Password mismatch"); // Debugging log
            return res.status(400).json({ message: "Invalid Username or Password" });
        }

        const { accessToken, refreshToken } = await generateTokens({
            id: user.id,
            username: user.UserName,
        });

        const session = new Session({
            username: user.UserName,
            refreshToken,
        });

        await session.save();

        console.log("User logged in successfully:", user.UserName); // Debugging log
        
        res.status(200).json({
            message: "Successful login",
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                username: user.UserName,
            }
        })
    } catch (error) {
        console.log("error occured at the server: ", error);
        res.status(500).json({
            message: "Server error occured"
        })
    }
}

export const renewAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token not found" });
  }

  try {
    const payload = await verifyRefreshToken(refreshToken);

    const { accessToken, refreshToken: newRefresh } = await generateTokens({
      id: payload.id,
      username: payload.username,
    });

    const session = await Session.findOne({ username: payload.username });
    if (!session) return res.status(403).json({ message: "Session not found" });

    session.refreshToken = newRefresh;
    await session.save();

    return res.json({ accessToken, refreshToken: newRefresh });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};