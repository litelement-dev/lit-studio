// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { html } from "./LitServer";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "lit-studio" is now active!');
	let disposable = vscode.commands.registerCommand("lit-studio.previewElement", () => {

		vscode.window.showInformationMessage("Hello World from Lit Studio!");

		vscode.window.activeTextEditor?.document.fileName;
		context.extensionPath;

		const panel = vscode.window.createWebviewPanel("catCoding", "Cat Coding", vscode.ViewColumn.Beside, {
			enableScripts: true, enableCommandUris: true
			
			// retainContextWhenHidden: true
		});

		// And set its HTML content
		panel.webview.options;
		panel.webview.html = getWebviewContent();

		// Handle messages from the webview
		panel.webview.onDidReceiveMessage(
			(message) => {
				switch (message.command) {
					case "alert":
						vscode.window.showErrorMessage(message.text);
						return;
				}
			},
			undefined,
			context.subscriptions
		);

		function send(){
			panel.webview.postMessage({ command: 'refactor' });
		}
		// Cuando se cierra
		panel.onDidDispose(
			() => {
				// Handle user closing panel before the 5sec have passed
			},
			null,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}
function getWebviewContent() {
	return html`<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Cat Coding</title>
			</head>
			<body>
				<img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
			</body>
			<script>
				async function main() {
					const vscode = acquireVsCodeApi();

					vscode.postMessage({
						command: "alert",
						text: "From html"
					});
				}
				// main();

				async function receive() {
					// Handle the message inside the webview
					window.addEventListener("message", (event) => {
						const message = event.data; // The JSON data our extension sent

						switch (message.command) {
							case "refactor":
								count = Math.ceil(count * 0.5);
								counter.textContent = count;
								break;
						}
					});
				}
			</script>
		</html>`;
}
// this method is called when your extension is deactivated
export function deactivate() {}
