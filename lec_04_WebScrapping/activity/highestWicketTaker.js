const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
let highestWickerTaker = {};

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard"

request(url,cb);

function cb(error,response,body){
    parseBody(body);
}

function parseBody(html){
    let ch = cheerio.load(html);
    let allBowlingTables = ch('table.bowler');

    //GETTING TEAM 1 NAME
    let allTeams = ch('.header-title.label');
    let team1 = ch(allTeams['0']).text();
    let team1arr = team1.split("INNINGS");
    let team1name = team1arr[0].trim();
    console.log(team1name);
    
    //GETTING TEAM 2 NAME
    let team2 = ch(allTeams['1']).text();
    let team2arr = team2.split("INNINGS");
    let team2name = team2arr[0].trim();
    console.log(team2name);


    let highestWicketsSoFar = 0;
    let nameOfHighestWicketTaker;
    let economy;
    let TeamName;
    let opponentName;


    for(let i = 0; i<allBowlingTables.length;i++){
        let currTable = ch(allBowlingTables[i]);

        let allRows = ch(currTable).find("tbody tr"); //YE HAMKO SAARE TR KA EK OBJECT LAAKE DEDEGA

        //NOW PARSE ON ROWS
        for(let j = 0; j<allRows.length;j++){
            let allTd = ch(allRows[j]).find("td");

            //AB SAARE TABLE DATA KA EK OBJECT AA GAYA HAIN
            let currWicketsTaken = ch(allTd["4"]).text();

            //NOW CHECK IF IT IS THE HIGHEST NUMBER OF WICKET
            if(currWicketsTaken>highestWicketsSoFar){

                highestWicketsSoFar = currWicketsTaken;

                nameOfHighestWicketTaker = ch(allTd['0']).text();

                economy = ch(allTd['5']).text();

                if(i == 0){
                    teamName = team1name;
                    opponentName = team2name;
                }else if(i == 1){
                    teamName = team2name;
                    opponentName = team1name;
                }

            }

        }
    }

    highestWickerTaker.name = nameOfHighestWicketTaker;
    highestWickerTaker.wickets = highestWicketsSoFar;
    highestWickerTaker.economy = economy;
    highestWickerTaker.Team = teamName;
    highestWickerTaker.opponent = opponentName;


    console.log(highestWickerTaker);
    
}