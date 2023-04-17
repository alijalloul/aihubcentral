import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import fs from "fs";
import path from "path";   

import dalleImageSchema from "./schemas/dalleImages.js";

import { dalle, chatGPT } from "./api/openai/openai.js";
import { login, signup } from "./api/user/user.js";

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

app.get("/imageShowcase", async (req, res) => {
    const images = await dalleImageSchema.find();

    images.map(image => {
        const imagePath = path.join("./images/dalle_images", image.generatedImage);

        var base64Data;
        if(fs.existsSync(imagePath)){
            base64Data = fs.readFileSync(imagePath, { encoding: 'base64' });
        }else {
            base64Data = fs.readFileSync('./images/notfound.jpeg').toString("base64");
        }



        image.generatedImage = "data:image/png;base64," + base64Data;  
    })
    
    res.json(images);
})

app.post("/imageShowcase", async (req, res) => {
    const image = req.body;

    const base64Image = image.generatedImage;

    // Extract image type and base64 data
    const fileExtension = base64Image.split(';')[0].split('/')[1];
    const buffer = Buffer.from(base64Image.split(',')[1], 'base64');
    
    const filename = `image-${Date.now()}.${fileExtension}`;
    fs.writeFileSync(path.join("./images/dalle_images", filename), buffer);

    image.generatedImage = filename;    

    console.log(image);

    const newImage = new dalleImageSchema(image);

    try {
        await newImage.save();

        res.status(200).json({message: "image submitted successfully!"});
    } catch (error) {
        res.status(409).json({message: error});
    }
  
})