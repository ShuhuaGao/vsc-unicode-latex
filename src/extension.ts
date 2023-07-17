import * as vscode from 'vscode';
import {LatexSymbol, latexSymbols} from './latex';



export function activate(context: vscode.ExtensionContext) {
    const pickOptions: vscode.QuickPickOptions = { matchOnDescription: true };
    const latexPickItems: vscode.QuickPickItem[] = loadPickItems();

    let insertion = vscode.commands.registerCommand('unicode-input.insertMathSymbol', () => {
        vscode.window.showQuickPick(latexPickItems, pickOptions).then(insertSymbol);
    });

    const selector: vscode.DocumentSelector = [
        'plaintext', 'markdown', 'coq', 'python', 'java', 'haskell', 
        'sml', 'ocaml', 'rmd', 'r', 'txt', 'typescript', 'html', 'yaml', 'javascript',
        'groovy', 'go', 'clojure', 'fsharp', 'asciidoc', 'c', 'cpp', 'toml', 'json', 'textile',
        'csv', 'csharp', 'ini', 'jsonc', 'objective-c', 'markdown', 'xml', 'scala'
    ];
    const provider = new LatexCompletionItemProvider('\\', latexSymbols);
    const completionSub = vscode.languages.registerCompletionItemProvider(selector, provider, '\\');

    context.subscriptions.push(insertion);
    context.subscriptions.push(completionSub);
}

function loadPickItems() : vscode.QuickPickItem[] {
    const items: vscode.QuickPickItem[] = [];

    for (const sym of latexSymbols) {
        items.push({description: sym.latex, label: sym.unicode});
    }

    return items;
}

function insertSymbol(item: vscode.QuickPickItem | undefined) {
    const editor = vscode.window.activeTextEditor;

    if (!editor) { return; }
    if (!item) { return; }

    editor.edit( (editBuilder) => { editBuilder.delete(editor.selection); })
          .then( () => { editor.edit( (editBuilder) => {
              editBuilder.insert(editor.selection.start, item.label); });
            });
}

class LatexCompletionItemProvider implements vscode.CompletionItemProvider {

    completionItems: vscode.CompletionItem[];
    prefix: string;

    public constructor(prefix: string, symbols: LatexSymbol[]) {
        this.prefix = prefix;
        this.completionItems = [];

        for (const sym of symbols) {
            const item = new vscode.CompletionItem(prefix + sym.latex, vscode.CompletionItemKind.Text);
            item.insertText = sym.unicode;
            item.detail = sym.unicode;
            this.completionItems.push(item);
        }
    }

    public provideCompletionItems(doc: vscode.TextDocument, pos: vscode.Position)
        : vscode.CompletionItem[]
    {
        // , /\/[\^_]?[^\s\\]*/
        const range = doc.getWordRangeAtPosition(pos, /\\[\^_]?[^\s\\]*/);
        if (!range) {
            return [];
        }
        const word = range.with(undefined, pos);
        if (!word) {
            return [];
        }

        return this.completionItems.map((item) => {
            item.range = word;
            return item;
        });
    }
}

// this method is called when your extension is deactivated
export function deactivate() {}
