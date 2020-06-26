import * as path from "path";
import * as os from "os";
import * as fs from "fs";
import { Uri, ExtensionContext, commands, window } from "vscode";
import JsonToTS from "json-to-ts";
import {
  handleError,
  getClipboardText,
  parseJson,
  pasteToMarker,
  getSelectedText,
  getViewColumn,
  validateLength,
  getSelectedFile,
} from "./lib";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("jsonToTs.fromSelection", transformFromSelection)
  );
  context.subscriptions.push(
    commands.registerCommand("jsonToTs.fromClipboard", transformFromClipboard)
  );
  context.subscriptions.push(
    commands.registerCommand("jsonToTs.fromJSONFile", transformFromJSONFile)
  );
}

function transformFromSelection() {
  const tmpFilePath = path.join(os.tmpdir(), "json-to-ts.ts");
  const tmpFileUri = Uri.file(tmpFilePath);

  getSelectedText()
    .then(validateLength)
    .then(parseJson)
    .then((json) => {
      return JsonToTS(json).reduce((a, b) => `${a}\n\n${b}`);
    })
    .then((interfaces) => {
      fs.writeFileSync(tmpFilePath, interfaces);
    })
    .then(() => {
      commands.executeCommand("vscode.open", tmpFileUri, getViewColumn());
    })
    .catch(handleError);
}

function transformFromJSONFile() {
  const activeFile = window.activeTextEditor?.document.fileName;
  const filePath = activeFile?.substring(0, activeFile?.lastIndexOf("/"));
  const tmpFilePath = path.join(filePath?filePath:os.tmpdir(), "json-to-ts.ts");
  const tmpFileUri = Uri.file(tmpFilePath);
  getSelectedFile()
    .then(parseJson)
    .then((json) => {
      return JsonToTS(json).reduce((a, b) => `${a}\n\n${b}`);
    })
    .then((interfaces) => {
      fs.writeFileSync(tmpFilePath, interfaces);
    })
    .then(() => {
      commands.executeCommand("vscode.open", tmpFileUri, getViewColumn());
    })
    .catch(handleError);
}

function transformFromClipboard() {
  getClipboardText()
    .then(validateLength)
    .then(parseJson)
    .then((json) => {
      return JsonToTS(json).reduce((a, b) => `${a}\n\n${b}`);
    })
    .then((interfaces) => {
      pasteToMarker(interfaces);
    })
    .catch(handleError);
}
