## lucky_tools

This project mainly records the tools commonly used in daily work.

### 1. mendix-cli

> Use vue to create mendix widgets!

**Usage**

```bash
npm install mendix-cli -g

mendix create your-project
```

How to use it ,please see [mendix_vue_template](https://github.com/MrGaoGang/mendix_vue_template)

**Widgets structure**

```
├─.gitignore 
├─README.md ------------------ // README
├─ZH_README.md --------------- // 中文说明文档
├─babel.config.js 
├─build ---------------------- // Project Build Result
│ ├─HelloWorld 
│ │ ├─HelloWorld.xml 
│ │ └─widget 
│ │   ├─HelloWorld.js 
│ │   └─template 
│ │     └─HelloWorld.html 
│ ├─package.xml 
│ └─widget.mpk 
├─mendix --------------------- // Widgets demo
├─package.xml.js ------------- // Build tools
├─src ------------------------ // Project source code
│ ├─HelloMendix.xml ---------- // Mendix widgets config files
│ └─widget 
│   ├─App.vue ---------------- // Vue file
│   ├─HelloMendix.js --------- // Contact Vue file and Mendix widget config
│   └─template --------------- // HTML template
│     └─template.html 
└─webpack.config.js ---------- // webpack config
```
