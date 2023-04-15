import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Configuration, OpenAIApi } from "openai";

import dallePostSchema from "./schemas/dallePost.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

const atlasURL = process.env.MONGODB_URL;    
const PORT = process.env.PORT || 5000;

mongoose.connect(atlasURL)
    .then(() => app.listen(PORT, () => console.log(`Successfully connected to port ${PORT}`)))
    .catch(error => console.log("There was an error: ", error));

const APIKEY = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    organization: "org-r2BOPUThXA383fEqMcF3ClYY",
    apiKey: APIKEY,
});

const openai = new OpenAIApi(configuration);

app.get("/", async (req, res) => {
    res.send("Server is RUNNING");
})

app.post("/api/openai/dalle", async (req, res) => {
    const {prompt} = req.body;

    console.log(prompt);
    try {
        const dalleRes = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const image = dalleRes.data.data[0].b64_json;

        res.status(200).json({ image: image });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error });
    }
});

app.post("/api/openai/chatGPT", async (req, res) => {
    const {chat} = req.body;

    console.log(chat);
    try {
        const gptRes = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chat
        });

        const chatResponse = gptRes.data.choices[0].message.content;

        res.status(200).json({ chatResponse: chatResponse });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error });
    }
});