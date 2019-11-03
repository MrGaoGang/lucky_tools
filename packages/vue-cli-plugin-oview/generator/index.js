// generator/index.js
module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        dependencies: {
            'oview': '^1.1.2',
        },
    });

    api.onCreateComplete(() => {
        let oview = `\nimport oView from 'oview';\n\nVue.use(oView);`;

        const fs = require('fs');
        const mainPath = api.resolve('./src/main.js');
        // 获取内容
        let contentMain = fs.readFileSync(mainPath, {
            encoding: 'utf-8'
        });
        if (contentMain.indexOf("oview") === -1) {
            const lines = contentMain.split(/\r?\n/g).reverse();
            // 注入import
            const lastImportIndex = lines.findIndex(line => line.match(/^import/));
            lines[lastImportIndex] += oview;
            // 修改应用
            contentMain = lines.reverse().join('\n');
            fs.writeFileSync(mainPath, contentMain, {
                encoding: 'utf-8'
            });
        }
    });


    if (options.example) {
        api.render('./template', {
            ...options,
        });
    }

}