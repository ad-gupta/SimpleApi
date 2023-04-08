import mongoose from "mongoose";

export const connectToDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "shorts"
    })
    .then((c)=> console.log(`database is connected with ${c.connection.host}`))
    .catch((e)=> console.log(e))
    // console.log(`URI is ${process.env.MONGO_URI}`)
}