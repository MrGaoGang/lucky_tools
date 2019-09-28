const ora = require('ora')
const inquirer = require('inquirer')
const chalk = require('chalk')
const request = require('request')
const download = require('download-git-repo')

function parse(projectName, repos) {


    let tplNames = [];
    if (Array.isArray(repos)) {
        repos.forEach(repo => {
            tplNames.push(repo.name);
        })
    } else {
        tplNames.push(repos.name);
    }


    let promptList = [{
        type: 'list',
        message: 'Please select templates',
        name: 'tplName',
        choices: tplNames
    }]
    inquirer.prompt(promptList).then(answers => {

        let ind = repos;
        if (Array.isArray(repos)) {
            ind = repos.find(function (ele) {
                return answers.tplName == ele.name;
            });
        }

        let gitUrl = `${ind.full_name}#${ind.default_branch}`,
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
module.exports = (name) => {
    request({
        url: 'https://api.github.com/repos/mrgaogang/mendix_vue_template',
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