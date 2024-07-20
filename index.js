import express from 'express';
import bodyParser from 'body-parser';
import bcrypt, { hash } from 'bcrypt';
import passport from 'passport';
import session from 'express-session';
import pg from 'pg';
import env from 'dotenv';

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
env.config();

app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true
}));

app.use(passport.initialize());
app.use(passport.session());


const db = new pg.Client({
    user : process.env.USER_DATABASE,
    database : process.env.DATABASE_NAME,
    host : process.env.HOST_NAME,
    password : process.env.PASSWORD,
    port : process.env.PORT,
}) 
db.connect();


// Home 
app.get('/', (req, res)=>{
    res.send("Home Page")
})

// Get Register page
app.get('/register', (req, res)=>{
    res.render("register.ejs")
})

// Get Login Page
app.get('/login', (req, res)=>{
    res.render("login.ejs")
})

// Register user

app.post('/register', async (req, res)=>{
    const email = req.body.username;
    const password = req.body.password;
    const mobile = req.body.mobile;

    try {
        const checking_Data = await db.query("select * from  users where email = $1", [email])
        try {
            if (checking_Data.rows[0] > 0) {
                res.render("register.ejs", { error : "You have already registered."})
            } else {
                bcrypt.hash(passport,saltRounds, async(err , hash)=>{
                    if (err) {
                        console.log(err);
                    } else{
                        const Inserting_Data = await db.query("insert into")
                    }
                })
            }
        } catch (error) {
            
        }
    } catch (error) {
        console.log("Error While checking email are availabe");
    }

})






// Server 
app.listen(port, (req, res)=>{
    console.log("Running Port :", port);
})