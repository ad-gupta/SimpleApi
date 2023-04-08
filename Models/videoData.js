import mongoose  from "mongoose";

const Schema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    url:{
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    description:{
        type: String,
        required: true
    },
    shares:{
        type: Number,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // name of collection to be refered
        ref: "user",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Videos = mongoose.model('video', Schema)