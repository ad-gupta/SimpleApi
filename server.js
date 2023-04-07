import { connectToDB } from "./Data/DB.js";
import { app } from "./index.js";


connectToDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is working on PORT ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
