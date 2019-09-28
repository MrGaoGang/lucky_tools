const fs = require("fs");
const path = require("path");
const utils = require("util");
const prettier = require("prettier");

/**
 * rename packages
 * @param {*} name 
 */
function renamePackage(name, path) {
    let filePath = path + 'package.json';
    let package = require(filePath);
    package.name = name;
    fs.writeFileSync(filePath, prettier.format(JSON.stringify(package), {
        parser: "json"
    }));
}
/**
 * rename md file
 * @param {*} name 
 */
function renameMdFile(name, filePath) {

    let readMe = filePath + "README.md";
    let cnME = filePath + "ZH_README.md";
    if (fs.existsSync(readMe)) {
        fs.writeFileSync(readMe, "\n## " + name + "\n> this is description! \n\ncreated by lucky_tools!")
    }

    if (fs.existsSync(cnME)) {
        fs.unlinkSync(cnME)
    }
}
/**
 * rename src files
 * @param {*} name 
 */
function renameFile(name, filePath) {
    function finder(fileP) {
        let files = fs.readdirSync(fileP);
        files.forEach((val) => {
            let fPath = path.join(fileP, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) finder(fPath);
            if (stats.isFile() && val.indexOf("HelloMendix") != -1) {
                let file = fs.readFileSync(fPath).toString();
                file = file.replace(/HelloMendix/g, name);
                fs.writeFileSync(fPath, file);
                fs.renameSync(fPath, path.join(fileP, val).replace(/HelloMendix/g, name))
            }
        });
    }

    finder(filePath);

}

/**
 * delete build files
 * @param {*} filePath 
 */
function deleteFiles(filePath) {

    function deleteTemp(ff) {
        let files = fs.readdirSync(ff);
        files.forEach(val => {
            let fPath = path.join(ff, val);
            let stats = fs.statSync(fPath);
            if (stats.isDirectory()) deleteTemp(fPath);
            else if (stats.isFile()) fs.unlinkSync(fPath);
        });
        fs.rmdirSync(ff);
    }

    deleteTemp(filePath + "build" + path.sep);
}

module.exports = function rename(name, cb) {
    filePath = process.cwd() + path.sep + name + path.sep;
    if (fs.existsSync(filePath) != null) {
        renamePackage(name, filePath);
        renameMdFile(name, filePath);
        renameFile(name, filePath);
        deleteFiles(filePath);
        cb();
    } else {
        cb(new Error("Directory not find,please check it!"))
    }

}