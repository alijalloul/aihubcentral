import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import http from 'http';

import { dalle, chatGPT, summarize, translate, transcribe } from "./api/openai.js";
import { getImages, postImage } from "./api/imageShowcase.js";
import { login, signup } from "./api/user.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));

const atlasURL = process.env.MONGODB_URL;    
const PORT = process.env.PORT || 5000;

if(process.env.PORT){
    function pingWebsite() {
        http.get('https://aihubcentral-server.onrender.com/', (res) => {
          console.log('Website pinged successfully');
        }).on('error', (err) => {
          console.error('Error while pinging website:', err);
        });
      }
      
      // Ping website every 14 minutes (840000 milliseconds)
      setInterval(pingWebsite, 840000);
}

mongoose.connect(atlasURL)
    .then(() => app.listen(PORT, "0.0.0.0",() => console.log(`Successfully connected to port ${PORT}`)))
    .catch(error => console.log("There was an error: ", error));

app.get("/", async (req, res) => {
    res.send("Server is RUNNING");
})

app.post("/api/openai/dalle", (req, res) => dalle(req, res));
app.post("/api/openai/chatGPT", (req, res) => chatGPT(req, res));
app.post("/api/openai/summarize", (req, res) => summarize(req, res));
app.post("/api/openai/translator", (req, res) => translate(req, res));
app.post("/api/openai/transcriber",(req, res) => transcribe(req, res));

app.get("/imageShowcase", (req, res) => getImages(req, res))
app.post("/imageShowcase", (req, res) => postImage(req, res))

app.post("/users/login", (req, res) => login(req, res)); 
app.post("/users/signup", (req, res) => signup(req, res));
