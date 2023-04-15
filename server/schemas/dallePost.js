import mongoose from "mongoose";

const dallePost = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    generatedImage: {
        type: String,
        required: true
    }
});

const dallePostSchema = mongoose.model('DALLE_IMAGE_PROMPTS',dallePost);

export default dallePostSchema;