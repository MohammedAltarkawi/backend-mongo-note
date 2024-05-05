

import app from "./app";
import mongoose from "mongoose";
import env from "./util/validate";





mongoose.connect(env.MONGO_CONNECTION)
    .then(() => {
        app.listen(env.PORT, () => {
            console.log("Express server listening on port", env.PORT);
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });
