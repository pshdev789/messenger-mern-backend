import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

import mongoMessages from "./messageModel.js";

// App config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1098478",
  key: "e69bc457bbad1aca20a2",
  secret: "8959e1ebb283481c2224",
  cluster: "mt1",
  useTLS: true,
});

// Middleware
app.use(express.json());
app.use(cors());

// DB Config
const mongoURI =
  "mongodb+srv://admin:admin@cluster0.omw9p.mongodb.net/messengerDB?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");

  // service that watches if any changes are there
  const changeStream = mongoose.connection.collection("messages").watch();
  changeStream.on("change", (change) => {
    pusher.trigger("messages", "newMessage", {
      'change':change
    });
  });
});

// API Routes
app.get("/", (req, res) => res.status(200).send("hello World"));

app.post("/save/message", (req, res) => {
  const dbMessage = req.body;
  mongoMessages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/conversation", (req, res) => {
  mongoMessages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listen
app.listen(port, () => console.log(`listening on: ${port}`));
