import express from "express"
import cors from "cors"
import {connectDB} from "./db.js"

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

connectDB()
.then(() => {
    app.listen(PORT, () =>{
        console.log(`Server successfully connected at ${PORT}`)
    })
})
.catch((err) => {
    console.error("Failed to connect to database: ", err)
})