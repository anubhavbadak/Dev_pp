let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
const getProjects = require("./TopProjects");
const { Console } = require("console");
let url = "https://github.com/topics";

request(url,cb);

function cb(error,response,data){
    parseBody(data);
}

function parseBody(html){
    let ch = cheerio.load(html);
    let topics = ch(".col-12.col-sm-6.col-md-4.mb-4 a");
    let topics_title = ch(".f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
    for(let i = 0; i<topics.length;i++){
        let aTag = topics[i];
        //MAKING A FOLDER FOR THE TOPIC
        let folderName = ch(topics_title[i]).text().trim();
        let folderPath = `./${folderName}`;
        let ifFolderExists = fs.existsSync(folderPath);
        if(!ifFolderExists){
            fs.mkdirSync(folderPath);
        }
        //GETTING LINKS FOR THE TOPICS
        let topicLink = "https://github.com" + ch(aTag).attr("href");
        getProjects(topicLink,folderPath);
    }
}