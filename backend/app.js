import express from "express"
import todoRoutes from "./src/routes/todo.routes.js"
import cors from "cors"

const app = express();
app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req, res)=>{
    res.send("hello gyus fully woking ci cd")
})

app.use("/api/todo", todoRoutes)

export default app;