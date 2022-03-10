const express = require('express');
const cors= require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/User')

const app= express()
require("dotenv").config();

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/user',userRouter)

const port = process.env.PORT || 3000;
app.listen('3000', () => {
    console.log('Server started on port 3000');
});