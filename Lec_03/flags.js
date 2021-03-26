let fs = require("fs");
let f1KaData = fs.readFileSync("./f1.txt");
// console.log(f1KaData);
f1KaData = f1KaData +"";

//s-> removes extra spaces
// console.log(f1KaData+"")
let data = f1KaData.split("\r\n");
console.log(data);
// console.log.data;


let removedSpaces = [];
function removeLargeSpaces(){
    let spaceCount = false;
    for(let i = 0; i<data.length; i++){
        let val = data[i];
        if(val == "" && spaceCount == false){
            removedSpaces.push(val);
            spaceCount = true;
        }else if(val != ""){
            removedSpaces.push(val);
        }
        
}
}
removeLargeSpaces(data);
let temp = removedSpaces.join("\n");
console.log(temp);

