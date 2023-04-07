import mongoose from "mongoose";


const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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

export const Task = mongoose.model('Task', taskSchema)