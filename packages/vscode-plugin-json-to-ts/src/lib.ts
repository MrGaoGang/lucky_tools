import { ViewColumn, window, Range, Position } from "vscode";
import * as os from "os";
import * as copyPaste from "copy-paste";
import _ from "lodash";
import { camelizeKeys } from "humps";
import fs from "fs";

export function getClipboardText() {
  try {
    return Promise.resolve(copyPaste.paste());
  } catch (error) {
    return Promise.reject(error);
  }
}

export function handleError(error: Error) {
  window.showErrorMessage(error.message);
}

export function parseJson(json: string, humps = false): Promise<object> {
  const tryEval = (str: any) => eval(`const a = ${str}; a`);
  try {
    return Promise.resolve(
      humps === true ? camelizeKeys(JSON.parse(json)) : JSON.parse(json)
    );
  } catch (ignored) {}

  try {
    return Promise.resolve(tryEval(json));
  } catch (error) {
    return Promise.reject(new Error("JSON 格式 无效"));
  }
}

export function getViewColumn(): ViewColumn {
  const activeEditor = window.activeTextEditor;
  if (!activeEditor) {
    return ViewColumn.One;
  }

  switch (activeEditor.viewColumn) {
    case ViewColumn.One:
      return ViewColumn.Two;
    case ViewColumn.Two:
      return ViewColumn.Three;
  }

  return activeEditor.viewColumn as any;
}

export function pasteToMarker(content: string) {
  const { activeTextEditor } = window;

  return activeTextEditor?.edit((editBuilder) => {
    editBuilder.replace(activeTextEditor.selection, content);
  });
}

export function getSelectedText(): Promise<string> {
  const { selection, document } = window.activeTextEditor!;
  return Promise.resolve(document.getText(selection).trim());
}

export function getSelectedFile(): Promise<string> {
  const { document } = window.activeTextEditor!;
  if (_.endsWith(document.fileName, "json")) {
    return Promise.resolve(
      fs.readFileSync(document.fileName, "utf8").toString()
    );
  }
  return Promise.resolve("");
}

export const validateLength = (text: any) => {
  if (text.length === 0) {
    return Promise.reject(new Error("Nothing selected"));
  } else {
    return Promise.resolve(text);
  }
};
