import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js";
import { connectToMongoDB } from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server} from "./socket/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
    credentials: true
}));

app.get("/", (req, res) => {
    res.send("Hello world!!")
})

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`)
});