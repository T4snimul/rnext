# Math 1227 Student Worksheet - Refactored LaTeX Project

A clean, modern LaTeX workflow for the Math 1227 (Vector, Matrix & ODE) priority question worksheet.

## 📁 Project Structure

```
math-1227/
├── main.tex                 # Master document - loads all sections
├── .latexmkrc              # Build configuration (output to build/)
├── .gitignore              # Git ignore patterns for build artifacts
├── .vscode/
│   └── settings.json       # VS Code LaTeX Workshop config
├── sections/
│   ├── preamble.tex        # Packages, commands, styling
│   ├── cover.tex           # Title page & instructions
│   ├── part-a.tex          # Vector Analysis (31 questions)
│   ├── part-b.tex          # Matrices (20 questions)
│   └── part-c.tex          # ODEs (30 questions)
├── build/                  # Build output directory (auto-generated)
│   ├── main.pdf            # Final compiled PDF
│   ├── main.aux            # Auxiliary files
│   ├── main.log            # Build log
│   └── ...                 # Other build artifacts
└── source/                 # Original question data (reference)
```

## 🚀 Quick Start

### Build the PDF

```bash
# Single command build - output to build/main.pdf
latexmk -pdf main.tex

# Clean build artifacts
latexmk -c main.tex

# Full clean including PDF
latexmk -C main.tex
```

### VS Code Integration

The project is pre-configured for VS Code LaTeX Workshop:

- Click the "Build LaTeX project" button in the sidebar
- Or press `Ctrl+Alt+B` to compile
- PDF will open automatically in VS Code viewer
- All outputs go to `build/` directory

## 📋 Features

- **Modular Structure**: Each part (Vector Analysis, Matrices, ODEs) in separate files
- **Clean Workflow**: All build outputs (aux, log, pdf) go to `build/` directory
- **Zero Root Clutter**: No generated files in project root
- **Git-Friendly**: `.gitignore` configured for LaTeX artifacts
- **Modern Build System**: Uses `latexmk` with `.latexmkrc` configuration
- **Professional Layout**: Full-width answer boxes, proper spacing, 21 pages

## 📊 Document Contents

| Part                   | Topics                                                                                                      | Questions        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------- |
| **A: Vector Analysis** | Vectors, curves, differential operators, line/surface/volume integrals, Green's/Stokes'/Divergence theorems | 31               |
| **B: Matrices**        | Definitions, operations, inverse, rank, eigenvalues, Cayley-Hamilton                                        | 20               |
| **C: ODEs**            | Formation, exact equations, integrating factors, linear equations, Bernoulli, higher-order                  | 30               |
| **Total**              |                                                                                                             | **81 questions** |

## 🔧 Configuration Files

### `.latexmkrc` - Build Settings

- Outputs to `build/` directory
- Uses `pdflatex` for PDF generation
- Automatically creates `build/` if needed
- Configures clean file extensions

### `.vscode/settings.json` - Editor Integration

- Recipe: `latexmk` with PDF generation
- Auto-compile on save
- SyncTeX for forward/backward search
- Clean specific LaTeX artifact files

### `.gitignore` - Repository Configuration

- Ignores `build/` directory entirely
- Excludes LaTeX artifacts: `*.aux`, `*.log`, `*.pdf`, `*.fls`, etc.
- Excludes editor files: `.DS_Store`, `*.swp`, `.idea/`

## 📝 Editing Workflow

### Add a new question:

1. Edit the appropriate file in `sections/`:
   - Vector Analysis → `sections/part-a.tex`
   - Matrices → `sections/part-b.tex`
   - ODEs → `sections/part-c.tex`

2. Add a `\qitem` with 4 parameters:

   ```latex
   \qitem{Question text here}{Marks}{Source citation}{Box height}
   ```

3. Save and build:
   ```bash
   latexmk -pdf main.tex
   ```

### Modify styling:

- Edit `sections/preamble.tex` for packages, commands, layout
- Edit `sections/cover.tex` for title page and instructions

## 🎨 Customization

### Change margins:

Edit `sections/preamble.tex`:

```latex
\usepackage[a4paper,margin=1in]{geometry}  % Change 1in to desired margin
```

### Change fonts:

Edit `sections/preamble.tex`:

```latex
\usepackage{lmodern}  % or any other font package
```

### Change header/footer:

Edit `sections/preamble.tex`:

```latex
\lhead{Your custom text}
\rhead{Your custom text}
```

## 📚 Build Outputs

After running `latexmk -pdf main.tex`, you'll have:

- **build/main.pdf** - Final compiled worksheet (21 pages, ~210 KB)
- **build/main.log** - Detailed build log with warnings/errors
- **build/main.aux** - Auxiliary file for referencing
- **build/main.fdb_latexmk** - File dependency database
- **build/main.fls** - File list used in build

## 🔍 Troubleshooting

### Build fails with "file not found"

- Ensure you're running from the project root: `cd /workspaces/math-1227`
- Check section files exist: `ls sections/`

### PDF doesn't update

- Clean and rebuild:
  ```bash
  latexmk -c main.tex  # Clean
  latexmk -pdf main.tex  # Rebuild
  ```

### VS Code doesn't compile

- Verify LaTeX Workshop extension is installed
- Check `.vscode/settings.json` is present
- Try command palette: `LaTeX Workshop: Build LaTeX Project`

## 🏗️ Architecture

The project uses a **module-include pattern** (best practice for large LaTeX documents):

1. **main.tex** loads `sections/preamble.tex` (packages + config)
2. Main document structure: `\begin{document}` → load content sections
3. Each content section is independent and can be edited separately
4. `.latexmkrc` controls build process and output directory

This approach enables:

- ✅ Easy collaboration (edit sections in parallel)
- ✅ Fast compilation (modular references)
- ✅ Clean maintenance (no giant monolithic file)
- ✅ Reusability (sections can be used in other documents)

## 📦 Dependencies

Required:

- `pdflatex` (TeXLive or MikTeX)
- `latexmk` (builds with .latexmkrc)

Optional:

- VS Code with LaTeX Workshop extension (for IDE integration)

## 🗑️ Cleanup Old Files

To remove the old single-file worksheet:

```bash
rm worksheet-priority-set-math-1227.*
```

This won't affect the new modular build since it uses `main.tex`.

---

**Last Updated**: April 2026
**Document Version**: Refactored & Modularized
**Project Status**: Production Ready ✅
