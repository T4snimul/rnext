#!/usr/bin/env perl
# LaTeX build configuration - generates output in build/ directory
# Usage: latexmk -pdf main.tex (automatically uses this config)

# Set output directory
$out_dir = 'build';

# PDF generation
$pdf_mode = 1;           # Use pdflatex
$postscript_mode = 0;
$dvi_mode = 0;

# Auxiliary files
$aux_dir = 'build';

# Build on file change
$pdflatex = 'pdflatex -interaction=nonstopmode -file-line-error %O %S';

# Ensure build directory exists
system('mkdir -p build') unless -d 'build';

# Cleanup on 'latexmk -c'
$clean_ext = 'aux log bbl blg fdb_latexmk fls out toc lof lot';
