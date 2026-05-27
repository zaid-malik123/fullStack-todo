import app from "./app.js";
import dotenv from "dotenv"
import { connectDb } from "./src/db/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    connectDb()
    console.log(`server is running on port ${PORT}`)
})
