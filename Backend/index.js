import express from "express";
import { config as configDotenv } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import purchaseroute from "./route/product.route.js";
import signroute from "./route/users.route.js"

configDotenv();

const app = express();


const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

try{
    await mongoose.connect(URI);
    console.log("connected");
} catch (error) {
    console.log("error occured while connecting: ",error);
}

app.use(cors());
app.use(express.json());
app.use('/product', purchaseroute);
app.use('/user', signroute);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});