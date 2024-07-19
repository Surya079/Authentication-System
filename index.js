import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import pg from 'pg';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get('/', (req, res)=>{
    res.render("index.ejs")
})




// Server 
app.listen(port, (req, res)=>{
    console.log("Running Port :", port);
})