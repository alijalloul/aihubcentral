import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import https from "https";
import * as cheerio from 'cheerio';
import { Readable } from "stream";

import axios from "axios"
import FormData from "form-data"

import fs, { read } from "fs";


dotenv.config();

const APIKEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    organization: "org-r2BOPUThXA383fEqMcF3ClYY",
    apiKey: APIKEY,
});

const openai = new OpenAIApi(configuration);

export const dalle = async (req, res) => {
    const {prompt, nbImages, resolution} = req.body;
    
    console.log(req.body)

    try {
        const dalleRes = await openai.createImage({
            prompt: prompt,
            n: parseInt(nbImages),
            size: `${resolution}x${resolution}`,
            response_format: "b64_json",
        });
        console.log(dalleRes.data.data.length);

        const images = [];
        dalleRes.data.data.forEach(image => {
            images.push(`data:image/jpeg;base64,${image.b64_json}`);
        });

        console.log(images);

        res.status(200).json({ images: images });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error });
    }
}

export const chatGPT = async (req, res) => {
    const {chat} = req.body;

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
}

export const summarize = async (req, res) => {
    const {url} = req.body;

    const fetchTextContentFromUrl = (url) => {
        return new Promise((resolve, reject) => {
            https.get(url, (response) => {
                let html = '';
                response.on('data', (chunk) => {
                    html += chunk;
                });
                response.on('end', () => {
                    const $ = cheerio.load(html);
                    $('style, script').remove();
                    const textContent = $('body').text().replace(/\n|\t/g, '').trim();
                    resolve(textContent);
                });
            }).on('error', (error) => {
                console.error(`Failed to fetch website: ${url}`, error);
                reject(error);
            });
        });
    }

    let chat;
    if((url.includes("wikipedia.org") || url.includes("openai.com")) && url.includes("http")){
        chat = [{role: "user", content: `Summarize: "${url}`}]
    } else if(url.includes("http")) {
        chat = [{role: "user", content: `Summarize: "${await fetchTextContentFromUrl(url)}"`}]
    } else {
        chat = [{role: "user", content: `Summarize: "${url}"`}]
    }

    try {
        const gptRes = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chat
        });

        const chatResponse = gptRes.data.choices[0].message.content;
        console.log(gptRes.data.usage);

        res.status(200).json(chatResponse);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error });
    }
}

export const translate = async (req, res) => {
    const {langFrom, langTo, text} = req.body;
    const chat = [{role: "user", content: `Translte ${text} from ${langFrom} to ${langTo}`}];
    console.log(chat);

    try {
        const gptRes = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chat
        });

        const chatResponse = gptRes.data.choices[0].message.content;

        res.status(200).json(chatResponse);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error });
    }
}

export const transcribe = async (req, res) => {
    const { audioBuffer, lang} = req.body;

    const fileName = "recording.wav"
    const folderPath = "./audio";
    const filePath = `${folderPath}/${fileName}`;

    const audioBufferBase64 = Buffer.from(audioBuffer, 'base64');

    const writableStream = fs.createWriteStream(filePath);
    writableStream.write(audioBufferBase64);
    writableStream.end();

    writableStream.on('finish', async () => {

        fs.readFile('./audio/recording.wav', (err, data) => {
            if (err) {
              console.error('Error occurred while reading file:', err);
            } else {
              // Process data with CT() function
              console.log(data);
            }
          });

        const readStream = fs.createReadStream(filePath);

        // console.log(fs.createReadStream("./audio/test.wav"));
        // console.log("\n\n NEXT STREAM \n\n");
        // console.log(readStream);

        try {
            const whisperRes = await openai.createTranscription(
                readStream,
                "whisper-1",
            )
    
            console.log(whisperRes);
            const chatResponse = whisperRes.data.text;
            console.log(chatResponse)
    
            res.status(200).json({ chatResponse: chatResponse });            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error });
        }
    });
}