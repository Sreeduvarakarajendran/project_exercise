import express from 'express';
import axios from 'axios';
import pkt from 'pg';
import bodyparser from 'body-parser';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Cookie } from 'express-session';
import { Strategy } from 'passport-local';

const app = express();
const port = 3000;

const {client} = pkt;

const db = new client({
    username: "postgres",
    host: "localhost",
    database: "world",
    password: "Duvaraka_26",
    port: 5432
})

app.use(bodyparser.urlencoded( {extended : true }));

app.use (session({
     secret: "Mysecretkey",
     resave:false,
     saveUninitialized: false,
     cookie:{
               maxAge : 24 * 60 * 60 * 1000
     }
})
)

app.use(passport.initialize());
app.use(passport.session());

app.passport
(new localStrategy (async(username , password , done)=>{
    const user = await db.query("SELECT * FROM user WHERE username = $1",[username])

    if(!user)
        return(false,done)

    const match = await bcrypt.compare(password,user.password)

    if(!match)
        return(false,done)

    return(user,done)
})
)

app.serializerUser((user,done)=>{
     done(null , user.id);
})

app.deserializeUser(async(id , done)=>{
    const result = await db.query("SELECT * FROM user WHERE id = $1",[id]);
    done(null, result.row[0]);
})

app.get("/", (req,res)=>{
    res.send("index",{});
})

app.post("/login",(req,res)=>{
    passport.authenticate("local",{
        sucessRedirect : "/dashboard",
        failureRedirect:"/login",
    })
})


app.get("/dashboard",isLoggedIn ,(req,res)=>{
    res.send("index",{user: req.user})
})

function isLoggedIn(req,res,next){
    if(!req.authenticate)
        return next();

    res.redirect("/")
}

app.get("/logout",(req,res)=>{
    res.logout(()=>{
        res.send("/")
    })
})