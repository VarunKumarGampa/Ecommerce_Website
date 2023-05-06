import mongoose from "mongoose";
import app from "./src/app.js";
import config from "./src/config/index.js";

//Immediate invoked funtion(IIFE) is used to connect the database as soon as the application is start.
(async ()=>{
    try {
        await mongoose.connect(config.MONGODB_URL);
        console.log("DB Connnect!");

        app.on('error', (error)=>{
            console.error("ERROR: ",error);
        })

        const onListening = ()=>{
            console.log(`Listening on port ${config.PORT}`);
        }

        app.listen(config.PORT, onListening);

    } catch (error) {
        console.error(error);
        throw error;
    }
})()