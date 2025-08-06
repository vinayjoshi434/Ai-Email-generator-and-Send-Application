import { app } from "./app.js";

import dotenv from "dotenv"

const port = process.env.PORT || 4500


dotenv.config(({
    path: "./env"
}))

app.listen(port, () => {
    console.log(`Server is listning on port: ${port}`);

})