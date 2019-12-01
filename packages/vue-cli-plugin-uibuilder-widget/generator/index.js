// generator/index.js
let fs = require("fs");
module.exports = (api, options, rootOptions) => {

    let widgetName = options.widgetName;
    api.render("./template", {
        ...options
    });

    api.onCreateComplete(() => {
        fs.renameSync("src/@ui/pie-chart", `src/@ui/${widgetName}`);
        fs.renameSync(`src/@ui/${widgetName}/pie-chart.vue`, `src/@ui/${widgetName}/${widgetName}.vue`);
        fs.renameSync(`src/@ui/${widgetName}/pie-chart-prop.vue`, `src/@ui/${widgetName}/${widgetName}-prop.vue`);

    });
}