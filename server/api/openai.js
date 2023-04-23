import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import https from "https";
import * as cheerio from 'cheerio';

import fs from "fs";

dotenv.config();

const APIKEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    organization: "org-r2BOPUThXA383fEqMcF3ClYY",
    apiKey: APIKEY,
});

const openai = new OpenAIApi(configuration);

export const dalle = async (req, res) => {
    const {prompt} = req.body;

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