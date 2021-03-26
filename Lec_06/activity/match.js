const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

 let leaderboard = [];
 let count = 0;
function getAllMatchesData(link){
    console.log("Request sent!")
    count++;
    request(link,cb);
}

function cb(error,response,data){
    console.log("Data revieved!!!");
    parseBody(data);
    count--;
    if(count == 0){
        console.table(leaderboard);
    }
}

function parseBody(html){
    let ch = cheerio.load(html+"");
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
                
                //console.log(`batsmanName : ${batsmanName} runs : ${runs} balls : ${balls} fours : ${fours} six : ${sixes}`);
                processBatsman(teamName,batsmanName,runs,balls,fours,sixes);
                

            }
        }

        console.log("############################################");
    }

}
//when using a local leaderboard
function processBatsman(teamName,batsmanName,runs,balls,fours,sixes){
    runs = Number(runs);
  balls = Number(balls);
  fours = Number(fours);
  sixes = Number(sixes);
  if (leaderboard.length) {
    // leaderboard has atleast 1 object
    for (let i = 0; i < leaderboard.length; i++) {
      let obj = leaderboard[i];
      if (obj.Team == teamName && obj.Batsman == batsmanName) {
        obj.Runs += runs;
        obj.Balls += balls;
        obj.Fours += fours;
        obj.Sixes += sixes;
        return;
      }
    }
  }
  // leaderboard is empty
  let obj = {
    Team: teamName,
    Batsman: batsmanName,
    Runs: runs,
    Balls: balls,
    Fours: fours,
    Sixes: sixes,
  };
  leaderboard.push(obj);
}
// when working with json file
// function processBatsman(teamName,batsmanName,runs,balls,fours,sixes){
// //let leaderboard = JSON.parse(fs.readFileSync("./leaderboard.json"));
// let leaderboard = JSON.parse(fs.readFileSync("./leaderboard.json"));
// runs  = Number(runs);
// balls = Number(balls);
// fours = Number(fours);
// sixes = Number(sixes);

// if(leaderboard.length){
//     // console.log("in if")
//     //leaderboard has atleast 1 object
//     for(let i = 0; i<leaderboard.length; i++){
//         // console.log("1");
//         let obj = leaderboard[i];
//         if(obj.Team == teamName && obj.Batsman == batsmanName){
//             obj.Runs += runs;
//             obj.Balls += balls;
//             obj.Fours += fours;
//             obj.Sixes += sixes;
//             //push this object into json file
//             fs.writeFileSync("./leaderboard.json", );
//         //    console.log("in for loop")
//             return;
//         }
//     }
// }
//     //LEADERBOARD IS EMPTY  
//     let obj = {
//         Team : teamName,
//         Batsman : batsmanName,
//         Runs : runs,
//         Balls : balls,
//         Fours : fours,
//         Sixes : sixes
//     }
//     console.log("in else")
//     leaderboard.push(obj);
//     fs.writeFileSync("./leaderboard.json",JSON.stringify(leaderboard));


// }

module.exports = getAllMatchesData;