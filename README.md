## lucky_tools

[English](./en_README.md)

- [lucky_tools](#lucky_tools)
  - [1. vscode-plugin-json-to-ts](#1-vscode-plugin-json-to-ts)
  - [2. vue-cli-plugin-uibuilder-widget](#2-vue-cli-plugin-uibuilder-widget)
  - [3. mendix-cli](#3-mendix-cli)
  - [4. vue-cli-plugin-oview](#4-vue-cli-plugin-oview)
  - [5. vscode-react-typescript-snippet](#5-vscode-react-typescript-snippet)

此工程主要记录一些日常工作中常用的 vscode 插件。

### 1. vscode-plugin-json-to-ts

> 将 `json` 字符串转换成 `typescript` 的 `interface`;

[vscode-plugin-json-to-ts](./packages/vscode-plugin-json-to-ts)

1. 从剪切板 json 数据转换成 interface (windows: `ctrl+alt+C ` , Mac : `^+⌥+C`)

2. 选择 json 数据转换成 interface (windows: `ctrl+alt+S ` , Mac : `^+⌥+S`)

3. 将 json 文件转换成 interface (windows: `ctrl+alt+F ` , Mac : `^+⌥+F`)

### 2. vscode-react-typescript-snippet

使用 `typescript` 编写 `react` 程序的代码模板。

打开`vscode插件`并搜索`React code snippets Typescript`即可。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a964dd70029467381e38f20f05f315b~tplv-k3u1fbpfcp-zoom-1.image)

[vscode-react-typescript-snippet](./packages/vscode-react-typescript-snippet)

### 2. vue-cli-plugin-uibuilder-widget

> 一个编写视图编辑器的 vue cli 插件

[vue-cli-plugin-uibuilder-widget](./packages/vue-cli-plugin-uibuilder-widget)

### 3. mendix-cli

> 使用 vue 去编写 mendix 组件的 cli

**使用**

```bash
npm install mendix-cli -g

mendix create your-project

# select template

```

![](./images/mendix-demo.png)

如何使用请见[mendix_vue_template](https://github.com/MrGaoGang/mendix_vue_template)

### 4. vue-cli-plugin-oview

`vue` 移动图表库 `oview` 的 `vue-cli` 插件。

> [oview](https://github.com/MrGaoGang/oview) is a mobile chart library!
