#!/bin/bash

###############################################################################
# Script para gerar PDF e EPUB do SICP.js PT-BR
# Generate PDF and EPUB versions from markdown files
###############################################################################

set -e  # Exit on error

# Colors
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$ROOT_DIR/docs"
OUTPUT_DIR="$ROOT_DIR/ebooks"
TEMP_DIR="$OUTPUT_DIR/temp"

# Output files
PDF_OUTPUT="$OUTPUT_DIR/SICP-JS-PT-BR.pdf"
PDF_PRINT="$OUTPUT_DIR/SICP-JS-PT-BR-Print.pdf"
EPUB_OUTPUT="$OUTPUT_DIR/SICP-JS-PT-BR.epub"

echo -e "${BOLD}${CYAN}╔═══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║  📚 Geração de eBooks - SICP.js PT-BR                            ║${NC}"
echo -e "${BOLD}${CYAN}╚═══════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo -e "${BOLD}${RED}✗ Erro: pandoc não está instalado!${NC}"
    echo -e "${YELLOW}➜ Instale o pandoc:${NC}"
    echo -e "  ${CYAN}• macOS:${NC} brew install pandoc"
    echo -e "  ${CYAN}• Ubuntu/Debian:${NC} sudo apt-get install pandoc"
    echo -e "  ${CYAN}• Windows:${NC} https://pandoc.org/installing.html"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ Pandoc encontrado: $(pandoc --version | head -1)${NC}"
echo ""

# Create output directories
mkdir -p "$OUTPUT_DIR"
mkdir -p "$TEMP_DIR"

echo -e "${BOLD}${CYAN}📝 Coletando arquivos markdown...${NC}"
echo ""

# Create metadata file
cat > "$TEMP_DIR/metadata.yaml" <<EOF
---
title: "Estrutura e Interpretação de Programas de Computador"
subtitle: "Edição JavaScript - Tradução em Português Brasileiro"
author:
  - Harold Abelson
  - Gerald Jay Sussman
translator: Comunidade SICP.js PT-BR
date: $(date +"%B %Y")
lang: pt-BR
documentclass: book
geometry: "margin=1.5in"
fontsize: 11pt
linestretch: 1.15
toc: true
toc-depth: 3
numbersections: true
links-as-notes: true
colorlinks: true
linkcolor: blue
urlcolor: blue
---
EOF

# Collect all markdown files in order
MARKDOWN_FILES=(
    "$DOCS_DIR/intro.md"
    "$DOCS_DIR/prefaces/foreword84.md"
    "$DOCS_DIR/prefaces/prefaces96.md"
    "$DOCS_DIR/prefaces/prefaces03.md"
)

# Add all chapter files in order
for chapter in 1 2 3 4 5; do
    # Add chapter intro
    if [ -f "$DOCS_DIR/chapter-$chapter/${chapter}.0.md" ]; then
        MARKDOWN_FILES+=("$DOCS_DIR/chapter-$chapter/${chapter}.0.md")
    fi

    # Add sections
    find "$DOCS_DIR/chapter-$chapter" -name "${chapter}.*.md" ! -name "${chapter}.0.md" | sort -V | while read -r file; do
        MARKDOWN_FILES+=("$file")
    done
done

# Add appendices
MARKDOWN_FILES+=(
    "$DOCS_DIR/referencias.md"
    "$DOCS_DIR/agradecimentos.md"
    "$DOCS_DIR/sobre-o-projeto.md"
    "$DOCS_DIR/sobre-traducao-brasileira.md"
)

# Filter out files that don't exist
EXISTING_FILES=()
for file in "${MARKDOWN_FILES[@]}"; do
    if [ -f "$file" ]; then
        EXISTING_FILES+=("$file")
        echo -e "  ${GREEN}✓${NC} $(basename "$file")"
    fi
done

echo ""
echo -e "${BOLD}${CYAN}📦 Total de arquivos: ${#EXISTING_FILES[@]}${NC}"
echo ""

###############################################################################
# Generate EPUB (Reading Version)
###############################################################################

echo -e "${BOLD}${CYAN}📖 Gerando EPUB (versão de leitura)...${NC}"
echo ""

pandoc \
    "$TEMP_DIR/metadata.yaml" \
    "${EXISTING_FILES[@]}" \
    -o "$EPUB_OUTPUT" \
    --epub-cover-image="$ROOT_DIR/static/img/sicp-social-card.jpg" \
    --toc \
    --toc-depth=3 \
    --epub-chapter-level=2 \
    --css="$ROOT_DIR/src/css/custom.css" \
    --highlight-style=tango \
    --standalone

if [ -f "$EPUB_OUTPUT" ]; then
    EPUB_SIZE=$(du -h "$EPUB_OUTPUT" | cut -f1)
    echo -e "${BOLD}${GREEN}✅ EPUB gerado com sucesso!${NC}"
    echo -e "   ${CYAN}Arquivo:${NC} $EPUB_OUTPUT"
    echo -e "   ${CYAN}Tamanho:${NC} $EPUB_SIZE"
    echo ""
else
    echo -e "${BOLD}${RED}✗ Erro ao gerar EPUB${NC}"
    echo ""
    exit 1
fi

###############################################################################
# Generate PDF (Reading Version)
###############################################################################

echo -e "${BOLD}${CYAN}📄 Gerando PDF (versão de leitura)...${NC}"
echo ""

pandoc \
    "$TEMP_DIR/metadata.yaml" \
    "${EXISTING_FILES[@]}" \
    -o "$PDF_OUTPUT" \
    --pdf-engine=xelatex \
    --toc \
    --toc-depth=3 \
    --number-sections \
    --highlight-style=tango \
    --listings \
    -V geometry:margin=1.5in \
    -V fontsize=11pt \
    -V linestretch=1.15 \
    -V colorlinks=true \
    -V linkcolor=blue \
    -V urlcolor=blue \
    --standalone

if [ -f "$PDF_OUTPUT" ]; then
    PDF_SIZE=$(du -h "$PDF_OUTPUT" | cut -f1)
    echo -e "${BOLD}${GREEN}✅ PDF (leitura) gerado com sucesso!${NC}"
    echo -e "   ${CYAN}Arquivo:${NC} $PDF_OUTPUT"
    echo -e "   ${CYAN}Tamanho:${NC} $PDF_SIZE"
    echo ""
else
    echo -e "${BOLD}${RED}✗ Erro ao gerar PDF de leitura${NC}"
    echo ""
fi

###############################################################################
# Generate PDF (Print Version)
###############################################################################

echo -e "${BOLD}${CYAN}🖨️  Gerando PDF (versão impressão)...${NC}"
echo ""

# Print version metadata with different margins
cat > "$TEMP_DIR/metadata-print.yaml" <<EOF
---
title: "Estrutura e Interpretação de Programas de Computador"
subtitle: "Edição JavaScript - Tradução em Português Brasileiro"
author:
  - Harold Abelson
  - Gerald Jay Sussman
translator: Comunidade SICP.js PT-BR
date: $(date +"%B %Y")
lang: pt-BR
documentclass: book
classoption: twoside,openright
geometry:
  - paperheight=11in
  - paperwidth=8.5in
  - top=1in
  - bottom=1in
  - inner=1.25in
  - outer=0.75in
fontsize: 10pt
linestretch: 1.1
toc: true
toc-depth: 3
numbersections: true
links-as-notes: true
colorlinks: false
---
EOF

pandoc \
    "$TEMP_DIR/metadata-print.yaml" \
    "${EXISTING_FILES[@]}" \
    -o "$PDF_PRINT" \
    --pdf-engine=xelatex \
    --toc \
    --toc-depth=3 \
    --number-sections \
    --highlight-style=monochrome \
    --listings \
    --standalone

if [ -f "$PDF_PRINT" ]; then
    PDF_PRINT_SIZE=$(du -h "$PDF_PRINT" | cut -f1)
    echo -e "${BOLD}${GREEN}✅ PDF (impressão) gerado com sucesso!${NC}"
    echo -e "   ${CYAN}Arquivo:${NC} $PDF_PRINT"
    echo -e "   ${CYAN}Tamanho:${NC} $PDF_PRINT_SIZE"
    echo ""
else
    echo -e "${BOLD}${RED}✗ Erro ao gerar PDF de impressão${NC}"
    echo ""
fi

###############################################################################
# Cleanup and Summary
###############################################################################

echo -e "${BOLD}${CYAN}🧹 Limpando arquivos temporários...${NC}"
rm -rf "$TEMP_DIR"
echo -e "${GREEN}✓ Limpeza concluída!${NC}"
echo ""

echo -e "${BOLD}${GREEN}╔═══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${GREEN}║  ✅ Geração de eBooks concluída com sucesso!                    ║${NC}"
echo -e "${BOLD}${GREEN}╚═══════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BOLD}${CYAN}📊 Arquivos gerados:${NC}"
echo ""
if [ -f "$EPUB_OUTPUT" ]; then
    echo -e "  ${GREEN}📖 EPUB:${NC} $EPUB_OUTPUT ($(du -h "$EPUB_OUTPUT" | cut -f1))"
fi
if [ -f "$PDF_OUTPUT" ]; then
    echo -e "  ${GREEN}📄 PDF (Leitura):${NC} $PDF_OUTPUT ($(du -h "$PDF_OUTPUT" | cut -f1))"
fi
if [ -f "$PDF_PRINT" ]; then
    echo -e "  ${GREEN}🖨️  PDF (Impressão):${NC} $PDF_PRINT ($(du -h "$PDF_PRINT" | cut -f1))"
fi
echo ""
echo -e "${BOLD}${YELLOW}💡 Dica:${NC} Os arquivos estão em: ${CYAN}$OUTPUT_DIR${NC}"
echo ""
