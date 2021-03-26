let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

function makeIssueFile(link,projectpath){
    request(link,function cb(error,response,data){
        let ch = cheerio.load(data);
        let Issue = ch('a[data-hovercard-type="issue"]');

        for(let i= 0; i<Issue.length;i++){
            let Issue_name = ch(Issue[i]).text().trim();
            //console.log(Issue_name);
            let Issue_Link = ch(Issue[i]).attr("href");
            //console.log(Issue_Link);
            let Issue_file_path = `${projectpath}/Issue.json`;
            //npm/nok/issuename

            let if_issueFileExists = fs.existsSync(Issue_file_path);

            if(!if_issueFileExists){
                let obj = [{
                    "issuename" : Issue_name,
                    "issuelink" : Issue_Link
                }];
                fs.writeFileSync(`${Issue_file_path}` , JSON.stringify(obj));
            }else{
                let issue_file = JSON.parse(fs.readFileSync(Issue_file_path));
                // let issues = JSON.parse(fs.readFileSync(`${projectPath}/issues.json`));
                let obj = {
                    "issuename" : Issue_name,
                    "issuelink" : Issue_Link
                }

                issue_file.push(obj);  
                fs.writeFileSync(`${Issue_file_path}`,JSON.stringify(issue_file));
            }
        }
    }
        )
}

module.exports = makeIssueFile;

