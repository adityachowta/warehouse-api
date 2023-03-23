require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');


const mongo = process.env.DATABASE_URL;


mongoose.connect(mongo);
const database = mongoose.connection

database.on('error',(error)=>{
    console.log('Database connection error. ',error);
})

database.once('connected', ()=>{
    console.log('Database connected successfully')
})

const port = 3000;

const app = express();

app.use(express.json());

app.listen(port, ()=>{
    console.log(`Server started at ${port}`)

})

app.use('/api', routes);