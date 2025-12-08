import express from 'express';
import ejs from 'ejs';
import axios from 'axios';
import bodyparser from 'body-parser';
import pkt from 'pg';
import bcrypt from 'bcrypt';
import LocalStrategy from "passport-local";
import passport, { session, use } from 'passport';

const app = express();
const port = 3000;

const {Client} = pkt;

app.use(bodyparser.urlencoded({ extended : true })); 

const db = new Client({
    username:"postgres",
    host:"localhost",
    database:"world",
    password:"Duvaraka_26",
    port:5432
})

app.use(session({
    secret: "my secret key",
    resave:false,
    saveUninitialized:false, 
    cookie:{
        maxAge:24 * 60 * 60 * 1000
    }
}));

app.use(passport.initialize())
app.use(passport.session())

passport.use(
     new LocalStrategy(async(username,passport,done)=>{

        const result = await db.query("SELECT * FROM user WHERE $1",[username]);
        let user = result.row[0];
        if(!user)
            return done(null , false)

        const match = await bcrypt.compare(password,user.password);
        if(!match)
            return done(null,false)

        if(match)
            return done(null,user)
     })
)

passport.serializeUser((user,done)=>{
    done(null,user.id);
})


passport.deserializeUser(async(id,done)=>{
   const result =  await db.query("SELECT * FROM user WHERE $1",[id]);
   done(null,result.row[0],)
})

app.get("/",(req,res)=>{
    res.send("index",{});
})

app.post("/login",passport.authentication("local",{
    successRedirect:"/dashboard",
    failureRedirect:"/login"
}))

app.get("/dashboard",(req,res)=>{
    if(!res.authentication())
        res.redirect("/")

    res.send(req.user);
})

app.get("/logout",(req,res)=>{
    req.logOut(()=>{
       res.redirect('/');
    })
})