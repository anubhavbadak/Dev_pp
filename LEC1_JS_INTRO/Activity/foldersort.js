const fs = require("fs");
const path = require("path");
let extensions = require("./util");
let FolderPath = "C:/Users/anubh/Desktop/Dev_PP/LEC1_JS_INTRO/Downloads";
let currentExtpath;

function sortFolder(FolderPath){

 let content = fs.readdirSync(FolderPath);
 //HERE WE GOT A ARRAY FULL OF CONTENT IN FOLDERPATH
    
 for(i = 0; i<content.length;i++){
     let extensionName = path.extname(content[i]);
     if(!extensionName){
         continue;
     }
     let extensionFolderExist = checkFolder(extensionName);

     if(extensionFolderExist){
        moveFile(content[i]);
     }else{
        //CREATE A FILE FIRST
        createFolder();
        moveFile(content[i]);
     }
 }
}

function checkFolder(currentExtension){
    //Check if extension key i.e image for.png is matching with any present folder
    
    //STEP 1: CREATING A PATH FOR OUR EXTENSION FOLDER
    for(let key in extensions){
        
        // "Images" \\ "Audio" ......
        if(extensions[key].includes(currentExtension)){
            
            currentExtpath = `${FolderPath}/${key}`;
            break;
        }
    }
    //STEP 2:CHECK IF THIS PATHS EXISTS OR NOT AND RETURN THE ANS;
     
return fs.existsSync(currentExtpath);
}

function createFolder(){
    fs.mkdirSync(currentExtpath);
}

function moveFile(filename){
    let sourceFilePath = `${FolderPath}/${filename}`;
    let destinationFilePath = `${currentExtpath}/${filename}`;

    //1.COPY
    fs.copyFileSync(sourceFilePath,destinationFilePath);
    //2.DELETE THE EXTRA
    fs.unlinkSync(sourceFilePath);
}

sortFolder(FolderPath);