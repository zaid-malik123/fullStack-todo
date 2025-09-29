import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./src/db/db.js";
import todoRoutes from "./src/routes/todo.routes.js"
import cors from "cors"

const app = express();
dotenv.config()
app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req, res)=>{
    res.send("hello")
})

app.use("/api/todo", todoRoutes)

connectDb()
app.listen(3000, ()=>{
    console.log("server is running on 3000 port")
})