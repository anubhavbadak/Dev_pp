const fs = require("fs");
const cheerio = require("cheerio");


let htmlKaData = fs.readFileSync("./index.html");

//call cheerio
let ch = cheerio.load(htmlKaData);

//ab .main class ka saman chahiye
let pTags = ch("p");
let pKaData = ch(".main").text();

console.log(ch(pTags['1']).text());
