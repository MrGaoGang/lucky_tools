// let minimist = require("minimist");
let program = require("commander");
program.version(require("../package.json").version).usage('<command> [options]');
program.command("create <app-name>")
    .description("create a new project powered by mendix-widgets-cli")
    .action(function (name, cmd) {
        console.log('====================================');
        console.log(name, cmd);
        console.log('====================================');
    });