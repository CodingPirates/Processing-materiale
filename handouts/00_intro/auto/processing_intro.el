(TeX-add-style-hook
 "processing_intro"
 (lambda ()
   (TeX-add-to-alist 'LaTeX-provided-class-options
                     '(("memoir" "oneside" "a4paper" "10pts" "article")))
   (TeX-add-to-alist 'LaTeX-provided-package-options
                     '(("inputenc" "utf8") ("hyperref" "hidelinks" "hyperindex")))
   (TeX-run-style-hooks
    "latex2e"
    "memoir"
    "memoir10"
    "inputenc"
    "palatino"
    "graphicx"
    "todonotes"
    "url"
    "hyperref"
    "tikz"
    "listings")))

