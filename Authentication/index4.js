import express from 'express';
import bodyparser from 'body-parser';
import axios from 'axios';
import pkt from 'pg';
import {Strategy} from 'passport-local';
import passport from 'passport';
import bycrpt from 'bcrypt';
import { Cookie } from 'express-session';
import dotenv from 'dotenv'



const app = express();
const port = 3000;
env.config();

app.use(bodyparser.urlencoded({ extended : true }));


const db = new Client({
    username : process.env.PH_USER,
    host: process.env.PH_HOST,
    database: process.env.PH_DATABASE,
    password: process.env.PH_PASSWORD,
    port: process.env.PH_PORT

})

app.use(session({
    secret: process.env.PH_SECRET,
    resave:false,
    unInitialized:false
    
    
})
)

app.use(passport.initialize());
app.use(passport.serializeUser());


app.use(new googleStrategy({
    clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
},
async (accessToken , referenceToken , profile , done) =>{
    try{
        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const photo = profile.photos[0].value;

        const result = await db.query("SELECT * FROM user WHERE google_id = $1",[googleId]);

        if(result.row[0])
            return done(null, result.row[0])
        else{
            const insertResult = await db.query(
            `INSERT INTO google_users (google_id, name, email, photo)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [googleId, name, email, photo]
          );
           return done(null, insertResult.row[0])
        }
    }
    catch(err){
        return done(err);
    }
}
))

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(user_id,done)=>{
    const result = await db.query("SELECT * FROM user WHERE google_id = = $1",[user_id])
    done(null , result.row[0])
})


app.get("/",(req,res)=>{
    res.send(`<a href="/auth/google">Login with Google</a>`)
})

app.get("/auth/google",passport.authenticate("google",{scope:[profile,email]}))

app.get("/auth/google",
    passport.authenticate("google",{
        successRedirect:"/dashboard",
        failureRedirect:"/"
    })
)

function isLoggedIn(req,res,next){
    if(req.authenticate())
        return next();
    res.redirect("/");

}

app.get("/dashboard",isLoggedIn,(req,res)=>{
    res.send("index",{user:req.user.name});
})

app.get("/logout",(req,res)=>{
    res.logout(()=>{
        res.redirect("/");
    })
})