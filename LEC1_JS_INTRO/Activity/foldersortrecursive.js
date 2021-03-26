let fs = require("fs");
let path = require("path");
let extensions = require("./util");
let folderpath = "C:/Users/anubh/Desktop/Dev_PP/LEC1_JS_INTRO/Downloads";
let fixpath = "C:/Users/anubh/Desktop/Dev_PP/LEC1_JS_INTRO/Downloads";
let extFolderpath;

function sortFolder(folderpath){
    let content = fs.readdirSync(folderpath);
        //
    for(let i = 0; i<content.length ; i++){
        let isDirectory = fs.lstatSync(`${folderpath}/${content[i]}`).isDirectory();
        if(isDirectory){
            //CONTENT IS A FOLDER
            let utilfolder = false;
            for(let key in extensions){
                if(key == content[i]){
                    utilfolder = true;
                    break;
                }
            }

            if(!utilfolder){
                sortFolder(`${folderpath}/${content[i]}`);
            }
        }else{
            //CONTENT IS A FILE
        let extName = path.extname(content[i]);
        

        let ifFolderExist = checkFolder(extName);

        if(ifFolderExist){
            moveFile(folderpath,content[i]);
        }else{
            createFolder();
            moveFile(folderpath,content[i]);
        }
       }
    }
}

function checkFolder(extname){
    //creating a path
    for(let key in extensions){
        let currKey = key;
        if(extensions[currKey].includes(extname)){
            extFolderpath = `${folderpath}/${currKey}`;
            break;
        }
    }
//checking if the path exists or not
    return fs.existsSync(extFolderpath);
}

function moveFile(folderpath,filename){

    console.log("Source --> " + `${folderpath}/${filename}`);
    console.log("Destination --> " + extFolderpath+"/"+filename);

    let sourceFilePath = `${folderpath}/${filename}`;
    
    let destinationFilePath = `${extFolderpath}/${filename}`;
    
    fs.copyFileSync(sourceFilePath,destinationFilePath);
    
    fs.unlinkSync(sourceFilePath);
}
function createFolder(){
    fs.mkdirSync(extFolderpath)
}

sortFolder(folderpath);