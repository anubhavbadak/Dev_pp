let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
const makeIssueFile = require("./singleIssue");
// let gFolderPath;

function getProjects(link,folderPath){
    
    request(link,function cb(error,response,data){
        let ch = cheerio.load(data);
        let project_aTags = ch(".f3.color-text-secondary.text-normal.lh-condensed a.text-bold");
        //let project_names = ch(".lh-condensed .text-bold");
        
        for(let i = 0 ; i<2;i++){
            let project_name = ch(project_aTags[i]).text().trim();
            let projectIssuesLink ="https://github.com" + ch(project_aTags[i]).attr("href") + "/issues";
            
            let project_folderPath = `${folderPath}/${project_name}`;
            let if_project_folderExists = fs.existsSync(project_folderPath);
            //CHECK IF THE PROJECT FOLDER EXISTS OR NOT 
            if(!if_project_folderExists){
                fs.mkdirSync(project_folderPath);
            }
            // debug -->console.log(project_folderPath);
            
            makeIssueFile(projectIssuesLink,project_folderPath);
        }
    })
}
 


module.exports = getProjects;