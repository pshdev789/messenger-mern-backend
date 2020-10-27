import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'

// App config
const app = express();
const port = process.env.PORT || 9000;



// Middleware


// DB Config

// API Routes
app.get('/',(req,res)=> res.status(200).send('hello World'));

// Listen
app.listen(port, ()=>console.log(`listening on: ${port}`))
