import users from "../model/users.model.js";
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
        await userCreated.save();
        res.status(201).json({
            message: "User added successfully!",
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
        
        res.status(200).json({
            message: "Successful login",
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

