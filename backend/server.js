const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require("cors")
require("dotenv").config()

//Import routes
const authRoute = require('./routes/auth');
const postRoute = require("./routes/post")
//environment variables
const port = process.env.PORT;
const uri = process.env.ATLAS_URI;

//connect to the DB
mongoose.connect(uri,{useNewUrlParser:true}, () =>console.log("Successfuly Connected to database"));

//Middleware
app.use(express.json())

const corsOptions = {
    exposedHeaders: 'Authorization'
  };
  
  app.use(cors(corsOptions));


//Route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute)

app.listen(port, () => console.log('Server listening on port ' + port));
