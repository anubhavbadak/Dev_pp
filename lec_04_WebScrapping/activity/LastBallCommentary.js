const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary"

request(url,cb);

function cb(error,response,body){
    parseBody(body);
}

function parseBody(html){
    let ch = cheerio.load(html);
    //let commentaries = ch('.col-14.col-md-15.col-lg-14');
    let commentaries = ch('.match-comment-long-text');
    
    let lastBallCommentary = ch(commentaries['1']).text();
    console.log("last ball commentary \n"+lastBallCommentary);
}