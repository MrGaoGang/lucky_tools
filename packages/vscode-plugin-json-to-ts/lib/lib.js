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
exports.validateLength = exports.getSelectedFile = exports.getSelectedText = exports.pasteToMarker = exports.getViewColumn = exports.parseJson = exports.handleError = exports.getClipboardText = void 0;
var vscode_1 = require("vscode");
var copyPaste = __importStar(require("copy-paste"));
var lodash_1 = __importDefault(require("lodash"));
var humps_1 = require("humps");
var fs_1 = __importDefault(require("fs"));
function getClipboardText() {
    try {
        return Promise.resolve(copyPaste.paste());
    }
    catch (error) {
        return Promise.reject(error);
    }
}
exports.getClipboardText = getClipboardText;
function handleError(error) {
    vscode_1.window.showErrorMessage(error.message);
}
exports.handleError = handleError;
function parseJson(json, humps) {
    if (humps === void 0) { humps = false; }
    var tryEval = function (str) { return eval("const a = " + str + "; a"); };
    try {
        return Promise.resolve(humps === true ? humps_1.camelizeKeys(JSON.parse(json)) : JSON.parse(json));
    }
    catch (ignored) { }
    try {
        return Promise.resolve(tryEval(json));
    }
    catch (error) {
        return Promise.reject(new Error("JSON 格式 无效"));
    }
}
exports.parseJson = parseJson;
function getViewColumn() {
    var activeEditor = vscode_1.window.activeTextEditor;
    if (!activeEditor) {
        return vscode_1.ViewColumn.One;
    }
    switch (activeEditor.viewColumn) {
        case vscode_1.ViewColumn.One:
            return vscode_1.ViewColumn.Two;
        case vscode_1.ViewColumn.Two:
            return vscode_1.ViewColumn.Three;
    }
    return activeEditor.viewColumn;
}
exports.getViewColumn = getViewColumn;
function pasteToMarker(content) {
    var activeTextEditor = vscode_1.window.activeTextEditor;
    return activeTextEditor === null || activeTextEditor === void 0 ? void 0 : activeTextEditor.edit(function (editBuilder) {
        editBuilder.replace(activeTextEditor.selection, content);
    });
}
exports.pasteToMarker = pasteToMarker;
function getSelectedText() {
    var _a = vscode_1.window.activeTextEditor, selection = _a.selection, document = _a.document;
    return Promise.resolve(document.getText(selection).trim());
}
exports.getSelectedText = getSelectedText;
function getSelectedFile() {
    var document = vscode_1.window.activeTextEditor.document;
    if (lodash_1.default.endsWith(document.fileName, "json")) {
        return Promise.resolve(fs_1.default.readFileSync(document.fileName, "utf8").toString());
    }
    return Promise.resolve("");
}
exports.getSelectedFile = getSelectedFile;
exports.validateLength = function (text) {
    if (text.length === 0) {
        return Promise.reject(new Error("Nothing selected"));
    }
    else {
        return Promise.resolve(text);
    }
};
