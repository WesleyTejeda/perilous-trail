import express from "express";
import { Player, Enemy, combat } from "./functions/entities.js";
import { authenticationCheck } from "./functions/check.js";
import { write, findUser, read } from "./functions/dbController.js";
import fs from "fs";
import path from "path";
import session from "express-session";
const app = express();
let port = process.env.PORT || 4040;
app.set("view engine", "ejs");

app.listen(port, () =>{
    console.log("Server listening on port " + port);
})

//static
app.use(express.static('public'));

//body parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//session
app.use(session({
    secret: 'temporary',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get("/", (req, res) => {
    let messages = req.query;
    console.log(messages, "Message log")
    console.log(messages.loginError);
    console.log(messages.signupError)
    res.render("landing", {error: messages});
})

app.post("/login", async (req, res) => {
    let match = await findUser(req.body.username);
    console.log(match)
    if(match.password === req.body.password){
        req.session.username = match.username;
        res.redirect(`/dungeon/1/${match.username}/100!20!3/false`);
    } else if(match.error){
        res.redirect("/?loginError="+match.error)
    } else if(!(match.password === req.body.password)) {
        res.redirect("/?loginError=Username and password entered do not match")
    }
})

app.post("/signup", async (req, res) => {
    let { username, password } = req.body;
    req.session.username = username;
    let status = await write({username: username}, {password: password});
    console.log(status);
    if(status.error){
        res.redirect("/?signupError="+status.error);
    } else {
        req.session.username = match.username;
        res.redirect(`/dungeon/1/${match.username}/100!20!3/false`)
    }
})

app.get("/dungeon/:stage/:playerName/:stats/:sideQuest", authenticationCheck, (req, res) => {
    let username = req.session.username;
    let { stage, playerName, stats, sideQuest } = req.params;
    let enemy1 = new Enemy("Ragged Wraith", 100, 20, 2);
    let enemy2 = new Enemy("Possessed Swordsman", 100, 26, 3)
    let enemy3 = new Enemy("The Abysmal Knight", 100, 31, 5);
    let enemies = [enemy1, enemy2, enemy3];
    let enemy = enemies[stage - 1];
    stats = stats.split("!");
    let player = new Player(playerName, 100, parseInt(stats[1]), parseInt(stats[2]));
    let result = combat(player, enemy);
    res.render(`dungeon${stage}`, {enemy: enemy, player: player, victor: result.pop(), log: result.reverse(), rounds: result.length, stats: player.returnStats(), sideQuest: sideQuest, username: username });
})

app.get("/victory/:playerName/:stats/", authenticationCheck, (req, res) => {
    let { playerName, stats } = req.params;
    let player = new Player(playerName, 100, parseInt(stats[1]), parseInt(stats[2]));
    res.render('victory', {player: player});
})

app.get("/gameover", (req, res) => {
    
})