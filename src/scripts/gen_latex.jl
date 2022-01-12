if VERSION < v"0.7.0"
  using Base.REPLCompletions: latex_symbols
else
  using REPL.REPLCompletions: latex_symbols
end

open(joinpath(dirname(@__FILE__), "..", "latex.ts"), "w") do f
  println(f, "export interface LatexSymbol { latex: string,  unicode: string };")
  println(f, "export const latexSymbols: LatexSymbol[] = [")
  # sort by name length and name content
  symbols = sort(collect(latex_symbols))
  symbols = sort(symbols, by=x->length(x[1]))
  for (name, sym) in symbols
    println(f, "  { latex: '$(name[begin + 1 : end])', unicode: '$sym' },")
  end
  println(f, "];")
end