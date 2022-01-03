import fs from "fs";
import path from "path"

const __dirname = path.resolve(path.dirname('')); 

export const read = () => {
    return new Promise(resolve => {
        fs.readFile(__dirname + '/db/db.json', 'utf-8', (err, saved) => err ? console.log(err) : resolve(JSON.parse(saved)))
    })
}
    

export const write = async (incoming) => {
    let saved = await read();
    let match = saved.find( user => user.username== incoming.username) || null;
    if(match){
        return {error: "User already exists."}
    }
    saved.push(incoming);
    return new Promise(resolve => {
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(saved), err => err ? console.log(err) : 
        resolve(console.log({message: "file saved"})))
    })
}

export const findUser = async username => {
    let saved = await read();
    let match = saved.find(user => user.username === username) || {error: "User not found"};
    return match;
}

// console.log(await findUser("wesley"), "match")

// console.log(await write({username: "new", password: "new"}), "write");

// read().then(data => {
//     console.log(data, "read");
// })