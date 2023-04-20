import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const APIKEY = process.env.OPENAI_API_KEY;

const configuration = new Configuration({
    organization: "org-r2BOPUThXA383fEqMcF3ClYY",
    apiKey: APIKEY,
});

const openai = new OpenAIApi(configuration);


console.log(openai);

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