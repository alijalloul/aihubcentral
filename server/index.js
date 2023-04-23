import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import { dalle, chatGPT, summarize } from "./api/openai.js";
import { getImages, postImage } from "./api/imageShowcase.js";
import { login, signup } from "./api/user.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

const atlasURL = process.env.MONGODB_URL;    
const PORT = process.env.PORT || 5000;

mongoose.connect(atlasURL)
    .then(() => app.listen(PORT, () => console.log(`Successfully connected to port ${PORT}`)))
    .catch(error => console.log("There was an error: ", error));

app.get("/", async (req, res) => {
    res.send("Server is RUNNING");
})

app.post("/api/openai/dalle", (req, res) => dalle(req, res));
app.post("/api/openai/chatGPT", (req, res) => chatGPT(req, res));
app.post("/api/openai/summarize", (req, res) => summarize(req, res));

app.get("/imageShowcase", (req, res) => getImages(req, res))
app.post("/imageShowcase", (req, res) => postImage(req, res))

app.post("/users/login", (req, res) => login(req, res)); 
app.post("/users/signup", (req, res) => signup(req, res));
