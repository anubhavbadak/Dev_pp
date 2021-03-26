const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

function getAllMatchesData(link){
    request(link,cb);
}

function cb(error,response,data){
    parseBody(data);
}

function parseBody(html){
    let ch = cheerio.load(html);
    let bothInnings = ch(".Collapsible");
    
    for(let i = 0; i<bothInnings.length;i++){
        let singleInnings = bothInnings[i];
        let teamName = ch(singleInnings).find("h5").text();

        teamName = teamName.split("INNINGS")[0].trim();

        let batsmanTable = bothInnings.find(".table.batsman");

        let allTrs = batsmanTable.find("tbody tr");
        //YE HAMKO BATSMAN TABLE KE SAARE ROWS LAAKE DE DEGA DONO TABLE K

        for(let j = 0; j<allTrs.length - 1; j++){
            let allTds = ch(allTrs[j]).find("td");

            if(allTds.length > 1){
                let batsmanName = ch(allTds['0']).text().trim();
                let runs = ch(allTds['2']).text().trim();
                let balls = ch(allTds['3']).text().trim();
                let fours = ch(allTds['5']).text().trim();
                let sixes = ch(allTds['6']).text().trim();
                let strikeRate = ch(allTds['7']).text().trim();
                
                //console.log(`batsmanName : ${batsmanName} runs : ${runs} balls : ${balls} fours : ${fours} six : ${sixes} strikeRates : ${strikeRate}`);
                processBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);

            }
        }

        console.log("############################################");
    }

}

function checkteamFolder(teamName){
  let teamPath = `./IPL/${teamName}`;
  return fs.existsSync(teamPath);  
}

function checkBatsmanFile(teamName,batsmanName){
 let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`
 return fs.existsSync(batsmanFilePath);
}

function updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let stringifiedData = fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
    let inning = {
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}

function createBatsManFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
     // "./IPL/Mumbai Indians/Rohit Sharma.json"
     let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
     let batsmanFile = [];
     let inning = {
         Runs : runs , 
         Balls : balls , 
         Fours : fours , 
         Sixes : sixes , 
         StrikeRate : strikeRate
     }
     batsmanFile.push(inning);
     let stringifiedData = JSON.stringify(batsmanFile); // [object] => [ {}]
     fs.writeFileSync(batsmanPath , stringifiedData  );
}

function createTeamFolder(teamName){
    let teamPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}

function processBatsman(teamName,batsmanName,runs,balls,fours,sixes,strikeRate){
    let isTeam = checkteamFolder(teamName);

    if(isTeam){
        let isBatsmanFile = checkBatsmanFile(teamName,batsmanName);
        if(isBatsmanFile){
            //BATSMAN FILE HAIN --> YE INNINGS UPDATE KRDO
            updateBatsmanFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }else{
                createBatsManFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
    }else{
        createTeamFolder(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        createBatsManFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
    }
}

module.exports = getAllMatchesData;