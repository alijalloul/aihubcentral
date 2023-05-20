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


const fetchTextContentFromUrl = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            let html = '';
            response.on('data', (chunk) => {
                html += chunk;
            });
            response.on('end', () => {
                const $ = cheerio.load(html);
                
                $('script').remove();
                $('noscript').remove();
                $('img').remove();
                $('svg').remove();
                $('video').remove();
                $('audio').remove();
                $('use').remove();
                $('input').remove();
                $('meta').remove();
                $('link').remove();
                $('style').remove();
                $('a').remove();
                $('head').remove();
                //console.log($.html().toString().substring(0,3000));

                const textContent = $('body').text().replace(/\n|\t/g, '').replace(/\s+/g, ' ').trim();
                console.log(textContent.split(" ").length);
                resolve(textContent);
            });
        }).on('error', (error) => {
            console.error(`Failed to fetch website: ${url}`, error);
            reject(error);
        });
    });
}

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

        res.status(200).json({ images: images });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error });
    }
}

export const chatGPT = async (req, res) => {
    const {chat} = req.body;
    console.log("chat",chat);
    

    try {
        const gptRes = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chat
        });

        const chatResponse = gptRes.data.choices[0].message.content;

        console.log("response",chatResponse)
        res.status(200).json({ chatResponse: chatResponse });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error });
    }
}

export const summarize = async (req, res) => {
    const {url} = req.body;

    let chat;
    if((url.trim().split(" ")[0].includes("wikipedia.org") || url.trim().split(" ")[0].includes("openai.com")) && (url.trim().split(" ")[0].includes("http")) && (url.trim().split(" ").length === 1)){
        chat = [{role: "user", content: `Summarize: "${url}" and then translate the summary to its original language. Only give me the original language summarization`}]
    } else if(url.trim().split(" ")[0].includes("http")) {
        chat = [{role: "user", content: `Summarize: "${await fetchTextContentFromUrl(url)}" and then translate the summary to its original language. Only give me the original language summarization`}]
    } else {
        chat = [{role: "user", content: `Summarize: "${url}" and then translate the summary to its original language. Only give me the original language summarization`}]
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

export const context = async (req, res) => {
    const {question, url} = req.body;

    let chat;
    if((url.trim().split(" ")[0].includes("wikipedia.org") || url.trim().split(" ")[0].includes("openai.com")) && (url.trim().split(" ")[0].includes("http")) && (url.trim().split(" ").length === 1)){
        chat = [{role: "user", content: `From this text: "${url}", ${question}`}]
    } else if(url.trim().split(" ")[0].includes("http")) {
        chat = [{role: "user", content: `From this text: "${await fetchTextContentFromUrl(url)}", ${question}`}]
    } else {
        chat = [{role: "user", content: `From this text: "${url}", ${question}`}]
    }

    console.log("chat", chat);

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
    const { audioData } = req.body;

    // Decode the base64 audio data
    const audioBuffer = Buffer.from(audioData, 'base64');
    
    try {
      // Create a transcription using the Whisper API
      const transcriptionRequest = {
        audio: audioBuffer.toString('base64'),
        model: 'whisper-1'
    };
  
      const transcriptionResponse = await openai.createTranscription(transcriptionRequest);
      
      // Retrieve the transcription result
      const { id } = transcriptionResponse.data;
      console.log(transcriptionResponse.data)
      const transcriptionResult = await openai.getTranscription(id);
      const transcription = transcriptionResult.data;
  
      res.json({ transcription });
    } catch (error) {
      console.error('Error transcribing audio:', error);
      res.status(500).json({ error: 'An error occurred while transcribing the audio.' });
    }
  }