import express from "express";
import { Player, Enemy, combat } from "./functions/entities.js";
const app = express();
let port = process.env.PORT || 4040;
app.set("view engine", "ejs");

app.listen(port, () =>{
    console.log("Server listening on port " + port);
})

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("landing");
})

app.get("/dungeon/:stage/:playerName/:stats/:sideQuest", (req, res) => {
    let { stage, playerName, stats, sideQuest } = req.params;
    let enemy1 = new Enemy("Ragged Wraith", 100, 20, 2);
    let enemy2 = new Enemy("Possessed Swordsman", 100, 26, 3)
    let enemy3 = new Enemy("The Abysmal Knight", 100, 31, 5);
    let enemies = [enemy1, enemy2, enemy3];
    let enemy = enemies[stage - 1];
    console.log(enemy);
    stats = stats.split("!");
    console.log(stats);
    let player = new Player(playerName, 100, parseInt(stats[1]), parseInt(stats[2]));
    let result = combat(player, enemy);
    console.log(result);
    res.render(`dungeon${stage}`, {enemy: enemy, player: player, victor: result.pop(), log: result.reverse(), rounds: result.length, stats: player.returnStats(), sideQuest: sideQuest });
})

app.get("/victory/:playerName/:stats/", (req, res) => {
    let { playerName, stats } = req.params;
    let player = new Player(playerName, 100, parseInt(stats[1]), parseInt(stats[2]));
    res.render('victory', {player: player});
})

app.get("/gameover", (req, res) => {
    
})