import mongoose from "mongoose";

const gptChats = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    chats: {
        type: [String],
        required: true
    },
});

const GPTchatsDB = mongoose.model('GPT_chats', gptChats);

export default GPTchatsDB;