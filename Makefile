# Makefile for SICP.js Portuguese Translation Project
# Structure and Interpretation of Computer Programs - JavaScript Adaptation
# Estrutura e Interpretação de Programas de Computador - Adaptação em JavaScript

.PHONY: help lint spell-check link-check check format clean install test

# Default target
.DEFAULT_GOAL := help

# Colors for output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

##@ General

help: ## Display this help message
	@echo "$(CYAN)SICP.js Portuguese Translation - Makefile Commands$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make $(CYAN)<target>$(NC)\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(CYAN)%-15s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Development

install: ## Install all dependencies
	@echo "$(GREEN)Installing dependencies...$(NC)"
	@if command -v npm >/dev/null 2>&1; then \
		npm install -g markdownlint-cli markdown-link-check; \
	else \
		echo "$(RED)Error: npm not found. Please install Node.js first.$(NC)"; \
		exit 1; \
	fi
	@if command -v pip3 >/dev/null 2>&1; then \
		pip3 install --upgrade pip setuptools pyspelling; \
	elif command -v pip >/dev/null 2>&1; then \
		pip install --upgrade pip setuptools pyspelling; \
	else \
		echo "$(RED)Error: pip not found. Please install Python first.$(NC)"; \
		exit 1; \
	fi
	@echo "$(GREEN)Installing aspell Portuguese dictionary...$(NC)"
	@if command -v apt-get >/dev/null 2>&1; then \
		sudo apt-get update && sudo apt-get install -y aspell aspell-pt-br; \
	elif command -v brew >/dev/null 2>&1; then \
		brew install aspell; \
	else \
		echo "$(YELLOW)Warning: Could not install aspell. Please install manually.$(NC)"; \
	fi
	@echo "$(GREEN)All dependencies installed successfully!$(NC)"

##@ Quality Checks

lint: ## Run markdown linter on all .md files
	@echo "$(GREEN)Running markdown linter...$(NC)"
	@if command -v markdownlint >/dev/null 2>&1; then \
		markdownlint **/*.md --ignore node_modules --config .github/markdownlint.yml; \
		echo "$(GREEN)✓ Markdown linting passed!$(NC)"; \
	else \
		echo "$(RED)Error: markdownlint-cli not installed. Run 'make install' first.$(NC)"; \
		exit 1; \
	fi

spell-check: ## Run Portuguese spell checker
	@echo "$(GREEN)Running spell checker...$(NC)"
	@if command -v pyspelling >/dev/null 2>&1; then \
		pyspelling --config .github/pyspelling.yml; \
		echo "$(GREEN)✓ Spell check passed!$(NC)"; \
	else \
		echo "$(RED)Error: pyspelling not installed. Run 'make install' first.$(NC)"; \
		exit 1; \
	fi

link-check: ## Check for broken links in markdown files
	@echo "$(GREEN)Checking links in markdown files...$(NC)"
	@if command -v markdown-link-check >/dev/null 2>&1; then \
		find . -name "*.md" -not -path "./node_modules/*" -exec markdown-link-check --quiet --config .github/markdown-link-check.json {} \; ; \
		echo "$(GREEN)✓ Link check completed!$(NC)"; \
	else \
		echo "$(RED)Error: markdown-link-check not installed. Run 'make install' first.$(NC)"; \
		exit 1; \
	fi

check: lint spell-check ## Run all quality checks (lint + spell-check)
	@echo "$(GREEN)✓ All quality checks passed!$(NC)"

test: check ## Alias for 'check' - run all quality checks
	@echo "$(GREEN)✓ All tests passed!$(NC)"

##@ Formatting

format: ## Format markdown files (shows what would change)
	@echo "$(GREEN)Checking markdown formatting...$(NC)"
	@if command -v markdownlint >/dev/null 2>&1; then \
		markdownlint **/*.md --ignore node_modules --config .github/markdownlint.yml --fix; \
		echo "$(GREEN)✓ Markdown files formatted!$(NC)"; \
	else \
		echo "$(RED)Error: markdownlint-cli not installed. Run 'make install' first.$(NC)"; \
		exit 1; \
	fi

##@ Maintenance

clean: ## Clean temporary files and caches
	@echo "$(GREEN)Cleaning temporary files...$(NC)"
	@find . -name ".eslintcache" -delete
	@find . -name "*.pyc" -delete
	@find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
	@find . -name ".pytest_cache" -type d -exec rm -rf {} + 2>/dev/null || true
	@rm -f .github/wordlist.dict
	@echo "$(GREEN)✓ Cleanup completed!$(NC)"

reorder-wordlist: ## Reorder and deduplicate the spell-check wordlist
	@echo "$(GREEN)Reordering wordlist...$(NC)"
	@if [ -f .github/reorder-wordlist.sh ]; then \
		bash .github/reorder-wordlist.sh; \
		echo "$(GREEN)✓ Wordlist reordered!$(NC)"; \
	else \
		echo "$(YELLOW)Warning: .github/reorder-wordlist.sh not found.$(NC)"; \
	fi

##@ Translation

translation-status: ## Show translation progress and statistics
	@echo "$(CYAN)Translation Status$(NC)"
	@echo ""
	@echo "$(GREEN)Translated files:$(NC)"
	@find . -name "*.md" -not -path "./node_modules/*" -not -path "./.github/*" -not -name "README.md" -not -name "CONTRIBUTING.md" -not -name "LICENSE" -not -name "TRANSLATION.md" | sort
	@echo ""
	@echo "$(GREEN)Statistics:$(NC)"
	@echo "Total markdown files: $$(find . -name '*.md' -not -path './node_modules/*' -not -path './.github/*' -not -name 'README.md' -not -name 'CONTRIBUTING.md' -not -name 'LICENSE' -not -name 'TRANSLATION.md' | wc -l)"
	@echo "Total lines translated: $$(find . -name '*.md' -not -path './node_modules/*' -not -path './.github/*' -not -name 'README.md' -not -name 'CONTRIBUTING.md' -not -name 'LICENSE' -not -name 'TRANSLATION.md' -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $$1}')"
	@echo "Total words: $$(find . -name '*.md' -not -path './node_modules/*' -not -path './.github/*' -not -name 'README.md' -not -name 'CONTRIBUTING.md' -not -name 'LICENSE' -not -name 'TRANSLATION.md' -exec wc -w {} + 2>/dev/null | tail -1 | awk '{print $$1}')"

##@ Docker (Optional)

docker-check: ## Run all checks in Docker container (isolated environment)
	@echo "$(GREEN)Running checks in Docker...$(NC)"
	@docker run --rm -v "$$(pwd):/workdir" -w /workdir node:18-alpine sh -c "\
		apk add --no-cache python3 py3-pip aspell aspell-pt && \
		npm install -g markdownlint-cli markdown-link-check && \
		pip3 install pyspelling && \
		make check"

##@ Information

wordlist-stats: ## Show statistics about the spell-check wordlist
	@echo "$(CYAN)Wordlist Statistics$(NC)"
	@echo ""
	@if [ -f .github/wordlist.txt ]; then \
		echo "Total words: $$(wc -l < .github/wordlist.txt)"; \
		echo "Unique words: $$(sort -u .github/wordlist.txt | wc -l)"; \
		echo ""; \
		echo "$(GREEN)Sample words:$(NC)"; \
		head -10 .github/wordlist.txt; \
	else \
		echo "$(RED)Error: .github/wordlist.txt not found.$(NC)"; \
	fi

ci-local: ## Simulate CI pipeline locally
	@echo "$(CYAN)Simulating CI Pipeline Locally$(NC)"
	@echo ""
	@echo "$(GREEN)Step 1: Linting$(NC)"
	@make lint
	@echo ""
	@echo "$(GREEN)Step 2: Spell Checking$(NC)"
	@make spell-check
	@echo ""
	@echo "$(GREEN)✓ CI simulation completed successfully!$(NC)"
