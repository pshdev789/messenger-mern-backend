import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

import mongoMessages from './messageModel.js'

// App config
const app = express();
const port = process.env.PORT || 9000;

// Middleware

// DB Config
const mongoURI =
  "mongodb+srv://admin:admin@cluster0.omw9p.mongodb.net/messengerDB?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

mongoose.connection.once('open', ()=>{
    console.log('DB Connected');
})

// API Routes
app.get("/", (req, res) => res.status(200).send("hello World"));

app.post('/save/messages')

// Listen
app.listen(port, () => console.log(`listening on: ${port}`));
