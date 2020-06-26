"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
var path = __importStar(require("path"));
var os = __importStar(require("os"));
var fs = __importStar(require("fs"));
var vscode_1 = require("vscode");
var json_to_ts_1 = __importDefault(require("json-to-ts"));
var lib_1 = require("./lib");
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand("jsonToTs.fromSelection", transformFromSelection));
    context.subscriptions.push(vscode_1.commands.registerCommand("jsonToTs.fromClipboard", transformFromClipboard));
    context.subscriptions.push(vscode_1.commands.registerCommand("jsonToTs.fromJSONFile", transformFromJSONFile));
}
exports.activate = activate;
function transformFromSelection() {
    var tmpFilePath = path.join(os.tmpdir(), "json-to-ts.ts");
    var tmpFileUri = vscode_1.Uri.file(tmpFilePath);
    lib_1.getSelectedText()
        .then(lib_1.validateLength)
        .then(lib_1.parseJson)
        .then(function (json) {
        return json_to_ts_1.default(json).reduce(function (a, b) { return a + "\n\n" + b; });
    })
        .then(function (interfaces) {
        fs.writeFileSync(tmpFilePath, interfaces);
    })
        .then(function () {
        vscode_1.commands.executeCommand("vscode.open", tmpFileUri, lib_1.getViewColumn());
    })
        .catch(lib_1.handleError);
}
function transformFromJSONFile() {
    var _a;
    var activeFile = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.fileName;
    var filePath = activeFile === null || activeFile === void 0 ? void 0 : activeFile.substring(0, activeFile === null || activeFile === void 0 ? void 0 : activeFile.lastIndexOf("/"));
    var tmpFilePath = path.join(filePath ? filePath : os.tmpdir(), "json-to-ts.ts");
    var tmpFileUri = vscode_1.Uri.file(tmpFilePath);
    lib_1.getSelectedFile()
        .then(lib_1.parseJson)
        .then(function (json) {
        return json_to_ts_1.default(json).reduce(function (a, b) { return a + "\n\n" + b; });
    })
        .then(function (interfaces) {
        fs.writeFileSync(tmpFilePath, interfaces);
    })
        .then(function () {
        vscode_1.commands.executeCommand("vscode.open", tmpFileUri, lib_1.getViewColumn());
    })
        .catch(lib_1.handleError);
}
function transformFromClipboard() {
    lib_1.getClipboardText()
        .then(lib_1.validateLength)
        .then(lib_1.parseJson)
        .then(function (json) {
        return json_to_ts_1.default(json).reduce(function (a, b) { return a + "\n\n" + b; });
    })
        .then(function (interfaces) {
        lib_1.pasteToMarker(interfaces);
    })
        .catch(lib_1.handleError);
}
