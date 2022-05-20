# Unicode input for vs code using LaTeX-like abbreviation

A visual studio code extension that allows the insertion of unicode symbols from the latex names of those symbols. This extension is developed based on [studykit/unicode-latex](https://github.com/studykit/unicode-latex), which itself is a fork of [ojsheikh/unicode-latex](https://github.com/ojsheikh/unicode-latex).

The list of symbols is currently generated from the Julia programming language's REPL's latex completions ([see the symbol list here](https://docs.julialang.org/en/v1/manual/unicode-input/)).

## Install
Install from the [VSC marketplace](https://marketplace.visualstudio.com/items?itemName=gao-shuhua.vsc-unicode-latex). 

## Usage

- Completions are triggered on backslack '\\'. For example, type `\alpha`, an autocompletion will pop up.
- Supported document types are specified in *extension.ts*, which currently include

  ```typescript
  const selector: vscode.DocumentSelector = [
        'plaintext', 'markdown', 'coq', 'python', 'java', 'haskell', 
        'sml', 'ocaml', 'rmd', 'r', 'txt', 'typescript', 'html', 'yaml', 'javascript',
        'groovy', 'go', 'clojure', 'fsharp', 'asciidoc', 'c', 'cpp', 'toml', 'json', 'textile',
        'csv', 'csharp', 'ini', 'jsonc', 'objective-c', 'markdown', 'xml'
    ];
  ```
