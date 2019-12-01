const yarnRootDir = require("find-yarn-workspace-root");
const path = require("path");
const workSpace = yarnRootDir(__dirname);
const rootVueConfig = require(path.resolve(workSpace, "vue.widget.config.js"));
module.exports = rootVueConfig(workSpace);