const ora = require('ora')
const inquirer = require('inquirer')
const chalk = require('chalk')
const request = require('request')
const download = require('download-git-repo')
const TEMPLATE_URL = 'https://api.github.com/repos/mrgaogang/mendix_vue_template';

/**
 * 
 * @param {*} projectName 
 * @param {*} repos 
 * @param {*} tplNames 
 */
function cloneGit(projectName, repos, tplNames) {
    let promptList = [{
        type: 'list',
        message: 'Please select templates',
        name: 'tplName',
        choices: tplNames
    }]
    inquirer.prompt(promptList).then(answers => {

        let ind = repos;


        let gitUrl = `${ind.full_name}#${answers.tplName==='default'?'master':answers.tplName}`,
            projectUrl = `./${projectName}`,
            spinner = ora('\n Start building project, please wait...');
        spinner.start();
        download(gitUrl, projectUrl, (error) => {
            if (error) {
                console.log('Template download failed ……')
                console.log(error)
                process.exit()
            }

            spinner.stop();

            // rename files
            require("./rename.js")(projectName, function (error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(chalk.green(`\n √ ${projectName} The project is generated!`))
                    console.log(`\n cd ${projectName} && npm install \n`)
                }
            });


        })
    })
}

function parse(projectName, repos) {

    request({
        url: TEMPLATE_URL + "/branches",
        headers: {
            'User-Agent': 'mendix-cli'
        }
    }, function (error, res, body) {
        if (error) {
            console.log(chalk.red('Query branches error, please add issue!'))
            process.exit();
        }

        let result = JSON.parse(body);
        let tplNames = [];

        result.forEach(ele => {
            if (ele.name === "master") {
                tplNames.push("default");
            } else {
                tplNames.push(ele.name);
            }
        });

        cloneGit(projectName, repos, tplNames);


    });


}
module.exports = (name) => {
    request({
        url: TEMPLATE_URL,
        headers: {
            'User-Agent': 'mendix-cli'
        }
    }, (err, res, body) => {
        if (err) {
            console.log(chalk.red('Query template faild, please add issue!'))
            process.exit();
        }
        parse(name, JSON.parse(body));
    })
}