const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');




// pick environment
dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
})

// initialize database connection
const mongo = process.env.DATABASE_URL;
mongoose.connect(mongo);    
const database = mongoose.connection

database.on('error',(error)=>{
    console.log('Database connection error. ',error);
})

database.once('connected', ()=>{
    console.log('Database connected successfully')
})

const NODE_ENV = process.env.NODE_ENV   
const PORT = process.env.PORT 

const app = express();

app.use(express.json());

app.listen(PORT, ()=>{
    console.log(`Server started at ${PORT} in ${NODE_ENV}`)

})

app.use('/api', routes);