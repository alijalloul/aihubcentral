import mongoose from "mongoose";

const dalleImages = new mongoose.Schema({
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

const dalleImageSchema = mongoose.model('dalle_images', dalleImages);

export default dalleImageSchema;