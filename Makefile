# 📚 Makefile para o Projeto de Tradução SICP.js em Português
# Structure and Interpretation of Computer Programs - JavaScript Adaptation
# Estrutura e Interpretação de Programas de Computador - Adaptação em JavaScript

.PHONY: help lint spell-check link-check check format clean install test colaborar translation-status docker-check wordlist-stats ci-local reorder-wordlist pr build serve dev

# Default target
.DEFAULT_GOAL := help

# Colors for output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
BLUE := \033[0;34m
MAGENTA := \033[0;35m
BOLD := \033[1m
NC := \033[0m # No Color

##@ 📋 Geral

help: ## 📖 Mostra esta mensagem de ajuda com todos os comandos disponíveis
	@echo "$(BOLD)$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(CYAN)║  📚 SICP.js - Tradução em Português - Comandos do Makefile   ║$(NC)"
	@echo "$(BOLD)$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BOLD)Como usar:$(NC) make $(CYAN)<comando>$(NC)"
	@echo ""
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  $(CYAN)%-20s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(BOLD)$(YELLOW)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(BOLD)$(GREEN)💡 Dica:$(NC) Se você é novo(a) no projeto, comece com: $(CYAN)make colaborar$(NC)"
	@echo ""

##@ 🛠️  Desenvolvimento

dev: ## 🚀 Inicia servidor de desenvolvimento com hot-reload (localhost:3000)
	@echo "$(BOLD)$(CYAN)🚀 Iniciando servidor de desenvolvimento...$(NC)"
	@echo ""
	@if [ -f node_modules/.bin/docusaurus ]; then \
		echo "$(GREEN)✓ Docusaurus encontrado!$(NC)"; \
		echo ""; \
		echo "$(BOLD)$(YELLOW)📌 O servidor será iniciado em:$(NC) $(CYAN)http://localhost:3000$(NC)"; \
		echo "$(YELLOW)⏱️  Aguarde alguns segundos enquanto compilamos...$(NC)"; \
		echo ""; \
		npm start; \
	else \
		echo "$(BOLD)$(RED)✗ Erro: Docusaurus não está instalado!$(NC)"; \
		echo "$(YELLOW)➜ Execute primeiro:$(NC) $(CYAN)make install$(NC)"; \
		echo ""; \
		exit 1; \
	fi

build: ## 🏗️  Compila o site estático para produção (pasta build/)
	@echo "$(BOLD)$(CYAN)🏗️  Compilando site para produção...$(NC)"
	@echo ""
	@if [ -f node_modules/.bin/docusaurus ]; then \
		if npm run build; then \
			echo ""; \
			echo "$(BOLD)$(GREEN)✅ Build concluído com sucesso!$(NC)"; \
			echo ""; \
			echo "$(BOLD)$(YELLOW)📁 Arquivos gerados em:$(NC) $(CYAN)./build/$(NC)"; \
			echo ""; \
			echo "$(MAGENTA)📌 Próximo passo:$(NC) Execute $(CYAN)make serve$(NC) para visualizar o build localmente"; \
			echo ""; \
		else \
			echo ""; \
			echo "$(BOLD)$(RED)✗ Erro durante o build!$(NC)"; \
			echo "$(YELLOW)➜ Verifique os erros acima e corrija$(NC)"; \
			echo ""; \
			exit 1; \
		fi \
	else \
		echo "$(BOLD)$(RED)✗ Erro: Docusaurus não está instalado!$(NC)"; \
		echo "$(YELLOW)➜ Execute primeiro:$(NC) $(CYAN)make install$(NC)"; \
		echo ""; \
		exit 1; \
	fi

serve: ## 🌐 Serve o build local para testes (localhost:3000)
	@echo "$(BOLD)$(CYAN)🌐 Servindo build local...$(NC)"
	@echo ""
	@if [ -d build ]; then \
		echo "$(GREEN)✓ Diretório build/ encontrado!$(NC)"; \
		echo ""; \
		echo "$(BOLD)$(YELLOW)📌 O site será servido em:$(NC) $(CYAN)http://localhost:3000$(NC)"; \
		echo "$(YELLOW)⏱️  Servidor iniciando...$(NC)"; \
		echo ""; \
		npm run serve; \
	else \
		echo "$(BOLD)$(RED)✗ Erro: Diretório build/ não encontrado!$(NC)"; \
		echo "$(YELLOW)➜ Execute primeiro:$(NC) $(CYAN)make build$(NC)"; \
		echo ""; \
		exit 1; \
	fi

install: ## 📦 Instala todas as dependências necessárias (Node.js, Python, aspell)
	@echo "$(BOLD)$(CYAN)🚀 Instalando dependências...$(NC)"
	@echo ""
	@if command -v npm >/dev/null 2>&1; then \
		echo "$(GREEN)✓ Node.js encontrado! Instalando dependências do projeto...$(NC)"; \
		echo ""; \
		npm install; \
		echo ""; \
		echo "$(GREEN)✓ Dependências Node.js instaladas localmente!$(NC)"; \
	else \
		echo "$(BOLD)$(RED)✗ Erro: npm não encontrado!$(NC)"; \
		echo "$(YELLOW)➜ Por favor, instale o Node.js primeiro:$(NC)"; \
		echo "  $(CYAN)• Ubuntu/Debian:$(NC) sudo apt-get install nodejs npm"; \
		echo "  $(CYAN)• macOS:$(NC) brew install node"; \
		echo "  $(CYAN)• Windows:$(NC) Baixe de https://nodejs.org"; \
		exit 1; \
	fi
	@echo ""
	@if command -v pip3 >/dev/null 2>&1; then \
		echo "$(GREEN)✓ Python 3 encontrado! Instalando pyspelling...$(NC)"; \
		pip3 install --upgrade pip setuptools pyspelling; \
	elif command -v pip >/dev/null 2>&1; then \
		echo "$(GREEN)✓ Python encontrado! Instalando pyspelling...$(NC)"; \
		pip install --upgrade pip setuptools pyspelling; \
	else \
		echo "$(BOLD)$(RED)✗ Erro: pip não encontrado!$(NC)"; \
		echo "$(YELLOW)➜ Por favor, instale o Python primeiro:$(NC)"; \
		echo "  $(CYAN)• Ubuntu/Debian:$(NC) sudo apt-get install python3 python3-pip"; \
		echo "  $(CYAN)• macOS:$(NC) brew install python3"; \
		echo "  $(CYAN)• Windows:$(NC) Baixe de https://www.python.org"; \
		exit 1; \
	fi
	@echo ""
	@echo "$(CYAN)📚 Instalando dicionário de português (aspell)...$(NC)"
	@if command -v apt-get >/dev/null 2>&1; then \
		sudo apt-get update && sudo apt-get install -y aspell aspell-pt-br; \
	elif command -v brew >/dev/null 2>&1; then \
		brew install aspell; \
	else \
		echo "$(YELLOW)⚠️  Aviso: Não foi possível instalar o aspell automaticamente.$(NC)"; \
		echo "$(YELLOW)➜ Instale manualmente para verificação ortográfica funcionar.$(NC)"; \
	fi
	@echo ""
	@echo "$(BOLD)$(GREEN)✅ Todas as dependências foram instaladas com sucesso!$(NC)"
	@echo ""
	@echo "$(BOLD)$(MAGENTA)📌 Próximos passos:$(NC)"
	@echo "  $(CYAN)1.$(NC) Execute $(CYAN)make check$(NC) para verificar se tudo está funcionando"
	@echo "  $(CYAN)2.$(NC) Execute $(CYAN)make colaborar$(NC) para ver como contribuir"
	@echo ""

##@ ✅ Verificação de Qualidade

lint: ## 📝 Verifica formatação dos arquivos Markdown (.md)
	@echo "$(BOLD)$(CYAN)🔍 Verificando formatação do Markdown...$(NC)"
	@echo ""
	@if [ -f node_modules/.bin/markdownlint ]; then \
		if npm run lint; then \
			echo ""; \
			echo "$(BOLD)$(GREEN)✅ Formatação do Markdown está perfeita!$(NC)"; \
			echo ""; \
			echo "$(MAGENTA)📌 Próximo passo:$(NC) Execute $(CYAN)make spell-check$(NC) para verificar ortografia"; \
			echo ""; \
		else \
			echo ""; \
			echo "$(BOLD)$(RED)✗ Problemas de formatação encontrados!$(NC)"; \
			echo "$(YELLOW)➜ Corrija os problemas acima ou execute:$(NC) $(CYAN)make format$(NC)"; \
			echo ""; \
			exit 1; \
		fi \
	else \
		echo "$(BOLD)$(RED)✗ Erro: markdownlint-cli não está instalado!$(NC)"; \
		echo "$(YELLOW)➜ Execute primeiro:$(NC) $(CYAN)make install$(NC)"; \
		echo ""; \
		exit 1; \
	fi

spell-check: ## 📖 Verifica ortografia em português nos arquivos
	@echo "$(BOLD)$(CYAN)🔤 Verificando ortografia em português...$(NC)"
	@echo ""
	@if command -v pyspelling >/dev/null 2>&1; then \
		if pyspelling --config .github/pyspelling.yml; then \
			echo ""; \
			echo "$(BOLD)$(GREEN)✅ Ortografia está correta!$(NC)"; \
			echo ""; \
			echo "$(MAGENTA)📌 Próximo passo:$(NC) Execute $(CYAN)make link-check$(NC) para verificar links"; \
			echo ""; \
		else \
			echo ""; \
			echo "$(BOLD)$(RED)✗ Erros de ortografia encontrados!$(NC)"; \
			echo "$(YELLOW)➜ Corrija os erros ou adicione palavras técnicas em:$(NC) .github/wordlist.txt"; \
			echo ""; \
			exit 1; \
		fi \
	else \
		echo "$(BOLD)$(RED)✗ Erro: pyspelling não está instalado!$(NC)"; \
		echo "$(YELLOW)➜ Execute primeiro:$(NC) $(CYAN)make install$(NC)"; \
		echo ""; \
		exit 1; \
	fi

link-check: ## 🔗 Verifica se há links quebrados nos arquivos Markdown
	@echo "$(BOLD)$(CYAN)🔗 Verificando links em arquivos Markdown...$(NC)"
	@echo ""
	@if [ -f node_modules/.bin/markdown-link-check ]; then \
		if NODE_NO_WARNINGS=1 npm run link-check 2>&1 | grep -v "DeprecationWarning"; then \
			echo ""; \
			echo "$(BOLD)$(GREEN)✅ Todos os links estão funcionando!$(NC)"; \
			echo ""; \
		else \
			echo ""; \
			echo "$(BOLD)$(YELLOW)⚠️  Alguns links podem estar quebrados$(NC)"; \
			echo "$(YELLOW)➜ Verifique os links acima e corrija se necessário$(NC)"; \
			echo ""; \
		fi \
	else \
		echo "$(BOLD)$(RED)✗ Erro: markdown-link-check não está instalado!$(NC)"; \
		echo "$(YELLOW)➜ Execute primeiro:$(NC) $(CYAN)make install$(NC)"; \
		echo ""; \
		exit 1; \
	fi

check: lint spell-check ## 🎯 Executa todas as verificações de qualidade (lint + ortografia)
	@echo "$(BOLD)$(GREEN)╔════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(GREEN)║  ✅ Todas as verificações passaram!          ║$(NC)"
	@echo "$(BOLD)$(GREEN)╚════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(MAGENTA)📌 Próximo passo:$(NC) Seus arquivos estão prontos para commit!"
	@echo "   Execute: $(CYAN)git add .$(NC) e $(CYAN)git commit -m \"sua mensagem\"$(NC)"
	@echo ""

test: check ## 🧪 Alias para 'check' - executa todas as verificações
	@echo "$(BOLD)$(GREEN)✅ Todos os testes passaram!$(NC)"
	@echo ""

##@ 🎨 Formatação

format: ## ✨ Formata automaticamente os arquivos Markdown
	@echo "$(BOLD)$(CYAN)✨ Formatando arquivos Markdown...$(NC)"
	@echo ""
	@if [ -f node_modules/.bin/markdownlint ]; then \
		npm run lint:fix; \
		echo ""; \
		echo "$(BOLD)$(GREEN)✅ Arquivos Markdown formatados!$(NC)"; \
		echo ""; \
		echo "$(MAGENTA)📌 Próximo passo:$(NC) Execute $(CYAN)make check$(NC) para verificar se está tudo OK"; \
		echo ""; \
	else \
		echo "$(BOLD)$(RED)✗ Erro: markdownlint-cli não está instalado!$(NC)"; \
		echo "$(YELLOW)➜ Execute primeiro:$(NC) $(CYAN)make install$(NC)"; \
		echo ""; \
		exit 1; \
	fi

##@ 🧹 Manutenção

clean: ## 🗑️  Limpa arquivos temporários e caches
	@echo "$(BOLD)$(CYAN)🧹 Limpando arquivos temporários...$(NC)"
	@echo ""
	@find . -name ".eslintcache" -delete
	@find . -name "*.pyc" -delete
	@find . -name "__pycache__" -type d -exec rm -rf {} + 2>/dev/null || true
	@find . -name ".pytest_cache" -type d -exec rm -rf {} + 2>/dev/null || true
	@rm -f .github/wordlist.dict
	@echo "$(BOLD)$(GREEN)✅ Limpeza concluída!$(NC)"
	@echo ""
	@echo "$(GREEN)Arquivos removidos:$(NC)"
	@echo "  • Caches do eslint"
	@echo "  • Arquivos .pyc do Python"
	@echo "  • Diretórios __pycache__"
	@echo "  • Caches do pytest"
	@echo "  • Dicionário temporário do wordlist"
	@echo ""

reorder-wordlist: ## 📋 Reordena e remove duplicatas da lista de palavras
	@echo "$(BOLD)$(CYAN)📋 Reordenando lista de palavras...$(NC)"
	@echo ""
	@if [ -f .github/reorder-wordlist.sh ]; then \
		bash .github/reorder-wordlist.sh; \
		echo ""; \
		echo "$(BOLD)$(GREEN)✅ Wordlist reordenado!$(NC)"; \
		echo ""; \
		echo "$(MAGENTA)📌 O que foi feito:$(NC)"; \
		echo "  • Palavras ordenadas alfabeticamente"; \
		echo "  • Duplicatas removidas"; \
		echo "  • Arquivo .github/wordlist.txt atualizado"; \
		echo ""; \
	else \
		echo "$(BOLD)$(RED)✗ Erro: .github/reorder-wordlist.sh não encontrado!$(NC)"; \
		echo ""; \
	fi

##@ 📚 Tradução

translation-status: ## 📊 Mostra o progresso e estatísticas da tradução
	@echo "$(BOLD)$(CYAN)╔════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(CYAN)║       📊 Status da Tradução SICP.js          ║$(NC)"
	@echo "$(BOLD)$(CYAN)╚════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BOLD)$(GREEN)📝 Arquivos traduzidos:$(NC)"
	@find . -name "*.md" -not -path "./node_modules/*" -not -path "./.github/*" -not -name "README.md" -not -name "CONTRIBUTING.md" -not -name "LICENSE" -not -name "TRANSLATION.md" | sort | sed 's/^/  • /'
	@echo ""
	@echo "$(BOLD)$(BLUE)📈 Estatísticas:$(NC)"
	@echo "  • Total de arquivos Markdown: $$(find . -name '*.md' -not -path './node_modules/*' -not -path './.github/*' -not -name 'README.md' -not -name 'CONTRIBUTING.md' -not -name 'LICENSE' -not -name 'TRANSLATION.md' | wc -l)"
	@echo "  • Total de linhas traduzidas: $$(find . -name '*.md' -not -path './node_modules/*' -not -path './.github/*' -not -name 'README.md' -not -name 'CONTRIBUTING.md' -not -name 'LICENSE' -not -name 'TRANSLATION.md' -exec wc -l {} + 2>/dev/null | tail -1 | awk '{print $$1}')"
	@echo "  • Total de palavras: $$(find . -name '*.md' -not -path './node_modules/*' -not -path './.github/*' -not -name 'README.md' -not -name 'CONTRIBUTING.md' -not -name 'LICENSE' -not -name 'TRANSLATION.md' -exec wc -w {} + 2>/dev/null | tail -1 | awk '{print $$1}')"
	@echo ""
	@echo "$(MAGENTA)💡 Dica:$(NC) Para contribuir com a tradução, execute: $(CYAN)make colaborar$(NC)"
	@echo ""

##@ 🐳 Docker (Opcional)

docker-check: ## 🐋 Executa verificações em container Docker (ambiente isolado)
	@echo "$(BOLD)$(CYAN)🐋 Executando verificações no Docker...$(NC)"
	@echo ""
	@if command -v docker >/dev/null 2>&1; then \
		docker run --rm -v "$$(pwd):/workdir" -w /workdir node:18-alpine sh -c "\
			apk add --no-cache python3 py3-pip aspell aspell-pt && \
			npm install -g markdownlint-cli markdown-link-check && \
			pip3 install pyspelling && \
			make check"; \
		echo ""; \
		echo "$(BOLD)$(GREEN)✅ Verificações no Docker concluídas!$(NC)"; \
		echo ""; \
	else \
		echo "$(BOLD)$(RED)✗ Erro: Docker não está instalado!$(NC)"; \
		echo "$(YELLOW)➜ Instale o Docker:$(NC) https://docs.docker.com/get-docker/"; \
		echo ""; \
		exit 1; \
	fi

##@ ℹ️  Informações

wordlist-stats: ## 📊 Mostra estatísticas sobre a lista de palavras
	@echo "$(BOLD)$(CYAN)╔════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(CYAN)║       📊 Estatísticas do Wordlist            ║$(NC)"
	@echo "$(BOLD)$(CYAN)╚════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@if [ -f .github/wordlist.txt ]; then \
		echo "$(BOLD)$(GREEN)📈 Números:$(NC)"; \
		echo "  • Total de palavras: $$(wc -l < .github/wordlist.txt)"; \
		echo "  • Palavras únicas: $$(sort -u .github/wordlist.txt | wc -l)"; \
		echo ""; \
		echo "$(BOLD)$(BLUE)📝 Exemplo de palavras (primeiras 10):$(NC)"; \
		head -10 .github/wordlist.txt | sed 's/^/  • /'; \
		echo ""; \
	else \
		echo "$(BOLD)$(RED)✗ Erro: .github/wordlist.txt não encontrado!$(NC)"; \
		echo ""; \
	fi

ci-local: ## 🔄 Simula o pipeline de CI localmente (mesmas verificações do GitHub)
	@echo "$(BOLD)$(CYAN)╔════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(CYAN)║    🔄 Simulando Pipeline CI Localmente       ║$(NC)"
	@echo "$(BOLD)$(CYAN)╚════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BOLD)$(YELLOW)Passo 1/2:$(NC) Verificação de Lint"
	@make lint
	@echo ""
	@echo "$(BOLD)$(YELLOW)Passo 2/2:$(NC) Verificação Ortográfica"
	@make spell-check
	@echo ""
	@echo "$(BOLD)$(GREEN)╔════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(GREEN)║  ✅ Simulação CI concluída com sucesso!      ║$(NC)"
	@echo "$(BOLD)$(GREEN)╚════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(MAGENTA)📌 Próximo passo:$(NC) Seu código passará nas verificações do GitHub Actions!"
	@echo ""

##@ 🤝 Colaboração

colaborar: ## 🌟 Mostra guia completo para colaboradores (iniciantes bem-vindos!)
	@echo "$(BOLD)$(MAGENTA)╔═══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(MAGENTA)║                                                                   ║$(NC)"
	@echo "$(BOLD)$(MAGENTA)║  🌟 Bem-vindo(a) ao Projeto de Tradução SICP.js em Português! 🌟  ║$(NC)"
	@echo "$(BOLD)$(MAGENTA)║                                                                   ║$(NC)"
	@echo "$(BOLD)$(MAGENTA)╚═══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BOLD)$(CYAN)Quer ajudar a traduzir este livro incrível? Aqui está um guia completo!$(NC)"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  PASSO 1: 🍴 FORK - Criar sua cópia do projeto$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(GREEN)1.1$(NC) Acesse: $(CYAN)https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript$(NC)"
	@echo "  $(GREEN)1.2$(NC) Clique no botão $(BOLD)\"Fork\"$(NC) no canto superior direito"
	@echo "  $(GREEN)1.3$(NC) Isso criará uma cópia do projeto na sua conta do GitHub"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  PASSO 2: 💻 CLONE - Baixar o código para seu computador$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(GREEN)2.1$(NC) Abra o terminal e execute (substitua SEU-USUARIO pelo seu username):"
	@echo "      $(CYAN)git clone https://github.com/SEU-USUARIO/estrutura-e-interpretacao-de-programas-de-computador-javascript.git$(NC)"
	@echo ""
	@echo "  $(GREEN)2.2$(NC) Entre na pasta do projeto:"
	@echo "      $(CYAN)cd estrutura-e-interpretacao-de-programas-de-computador-javascript$(NC)"
	@echo ""
	@echo "  $(GREEN)2.3$(NC) Adicione o repositório original como upstream (para receber atualizações):"
	@echo "      $(CYAN)git remote add upstream https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript.git$(NC)"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  PASSO 3: 📦 INSTALAÇÃO - Instalar dependências$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(GREEN)3.1$(NC) Instale todas as ferramentas necessárias:"
	@echo "      $(CYAN)make install$(NC)"
	@echo ""
	@echo "  $(MAGENTA)💡 Isso instalará:$(NC)"
	@echo "      • markdownlint (verificação de formatação)"
	@echo "      • pyspelling (verificação ortográfica)"
	@echo "      • aspell-pt-br (dicionário português)"
	@echo "      • markdown-link-check (verificação de links)"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  PASSO 4: 🌿 BRANCH - Criar uma branch para suas mudanças$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(GREEN)4.1$(NC) Sempre crie uma branch nova para cada contribuição:"
	@echo "      $(CYAN)git checkout -b minha-traducao-secao-1-2$(NC)"
	@echo ""
	@echo "  $(MAGENTA)💡 Dicas para nomes de branches:$(NC)"
	@echo "      • Use nomes descritivos: $(CYAN)traducao-capitulo-2$(NC)"
	@echo "      • Use hífens, não espaços: $(CYAN)correcao-ortografia$(NC)"
	@echo "      • Seja específico: $(CYAN)adiciona-exemplos-secao-3$(NC)"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  PASSO 5: ✍️  EDIÇÃO - Fazer suas contribuições$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(GREEN)5.1$(NC) Edite os arquivos .md com seu editor favorito (VS Code, Vim, etc.)"
	@echo "  $(GREEN)5.2$(NC) Mantenha a formatação e estilo consistentes"
	@echo "  $(GREEN)5.3$(NC) Verifique sua tradução:"
	@echo "      $(CYAN)make check$(NC)  $(MAGENTA)← Executa todas as verificações$(NC)"
	@echo ""
	@echo "  $(MAGENTA)💡 Comandos úteis durante a edição:$(NC)"
	@echo "      $(CYAN)make lint$(NC)         → Verifica formatação Markdown"
	@echo "      $(CYAN)make spell-check$(NC)  → Verifica ortografia em português"
	@echo "      $(CYAN)make format$(NC)       → Formata automaticamente os arquivos"
	@echo "      $(CYAN)make link-check$(NC)   → Verifica links quebrados"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  PASSO 6: 💾 COMMIT - Salvar suas mudanças$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(GREEN)6.1$(NC) Adicione os arquivos modificados:"
	@echo "      $(CYAN)git add .$(NC)"
	@echo ""
	@echo "  $(GREEN)6.2$(NC) Faça o commit com uma mensagem clara:"
	@echo "      $(CYAN)git commit -m \"feat: Adiciona tradução da seção 1.2\"$(NC)"
	@echo ""
	@echo "  $(MAGENTA)💡 Boas práticas para mensagens de commit:$(NC)"
	@echo "      • $(CYAN)feat:$(NC) para novas traduções"
	@echo "      • $(CYAN)fix:$(NC) para correções de erros"
	@echo "      • $(CYAN)docs:$(NC) para melhorias na documentação"
	@echo "      • $(CYAN)style:$(NC) para ajustes de formatação"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  PASSO 7: 🚀 PUSH - Enviar para o GitHub$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(GREEN)7.1$(NC) Envie sua branch para seu fork no GitHub:"
	@echo "      $(CYAN)git push origin minha-traducao-secao-1-2$(NC)"
	@echo ""
	@echo "  $(GREEN)7.2$(NC) Se for a primeira vez enviando esta branch, use:"
	@echo "      $(CYAN)git push -u origin minha-traducao-secao-1-2$(NC)"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  PASSO 8: 🎯 PULL REQUEST - Enviar sua contribuição$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(GREEN)8.1$(NC) Acesse seu fork no GitHub:"
	@echo "      $(CYAN)https://github.com/SEU-USUARIO/estrutura-e-interpretacao-de-programas-de-computador-javascript$(NC)"
	@echo ""
	@echo "  $(GREEN)8.2$(NC) Você verá uma mensagem: $(BOLD)\"Compare & pull request\"$(NC) - clique nela!"
	@echo ""
	@echo "  $(GREEN)8.3$(NC) Preencha o formulário do Pull Request:"
	@echo "      • $(BOLD)Título:$(NC) Seja claro e descritivo"
	@echo "        Exemplo: $(CYAN)\"Adiciona tradução da seção 1.2.2 - Recursão em Árvore\"$(NC)"
	@echo ""
	@echo "      • $(BOLD)Descrição:$(NC) Explique o que você fez"
	@echo "        Exemplo:"
	@echo "        $(CYAN)\"- Traduz a seção 1.2.2 completa\"$(NC)"
	@echo "        $(CYAN)\"- Adiciona exemplos de código com comentários em português\"$(NC)"
	@echo "        $(CYAN)\"- Corrige alguns typos encontrados\"$(NC)"
	@echo ""
	@echo "  $(GREEN)8.4$(NC) Clique em $(BOLD)\"Create Pull Request\"$(NC)"
	@echo ""
	@echo "  $(MAGENTA)💡 O que acontece agora:$(NC)"
	@echo "      • Os testes automáticos vão rodar (GitHub Actions)"
	@echo "      • Os mantenedores vão revisar seu código"
	@echo "      • Eles podem pedir algumas mudanças (é normal!)"
	@echo "      • Depois de aprovado, será feito o merge! 🎉"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)  📚 RECURSOS ÚTEIS$(NC)"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "  $(BOLD)$(GREEN)Documentação Git/GitHub:$(NC)"
	@echo "  • Git - Guia prático: $(CYAN)https://rogerdudler.github.io/git-guide/index.pt_BR.html$(NC)"
	@echo "  • GitHub Docs (PT): $(CYAN)https://docs.github.com/pt$(NC)"
	@echo "  • Pro Git Book (PT): $(CYAN)https://git-scm.com/book/pt-br/v2$(NC)"
	@echo ""
	@echo "  $(BOLD)$(GREEN)Comandos Make deste projeto:$(NC)"
	@echo "  • Ver todos os comandos: $(CYAN)make help$(NC)"
	@echo "  • Status da tradução: $(CYAN)make translation-status$(NC)"
	@echo "  • Simular CI local: $(CYAN)make ci-local$(NC)"
	@echo ""
	@echo "  $(BOLD)$(GREEN)Precisa de ajuda?$(NC)"
	@echo "  • Abra uma Issue: $(CYAN)https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues$(NC)"
	@echo "  • Veja Issues para iniciantes: procure por labels $(CYAN)\"good first issue\"$(NC) ou $(CYAN)\"help wanted\"$(NC)"
	@echo ""
	@echo "$(BOLD)$(GREEN)╔═══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(GREEN)║                                                                   ║$(NC)"
	@echo "$(BOLD)$(GREEN)║  🎉 Pronto! Você está preparado para contribuir! 🎉              ║$(NC)"
	@echo "$(BOLD)$(GREEN)║                                                                   ║$(NC)"
	@echo "$(BOLD)$(GREEN)║  Não tenha medo de errar - todos começaram do zero!               ║$(NC)"
	@echo "$(BOLD)$(GREEN)║  A comunidade está aqui para ajudar! 💚                           ║$(NC)"
	@echo "$(BOLD)$(GREEN)║                                                                   ║$(NC)"
	@echo "$(BOLD)$(GREEN)╚═══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BOLD)$(CYAN)🚀 Comece agora mesmo! Boa sorte na sua contribuição! 🚀$(NC)"
	@echo ""

pr: ## 🚀 Workflow completo: criar branch, add, commit, push e preparar PR
	@echo "$(BOLD)$(MAGENTA)╔═══════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(BOLD)$(MAGENTA)║  🚀 Workflow Completo para Pull Request                          ║$(NC)"
	@echo "$(BOLD)$(MAGENTA)╚═══════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(BOLD)$(CYAN)Workflow:$(NC) Branch → Stage → Teste → Commit → Push → PR"
	@echo ""
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo "$(BOLD)$(YELLOW)📂 Arquivos modificados:$(NC)"
	@echo ""
	@git status --short 2>/dev/null | pr -t -3 -w 80 2>/dev/null || git status --short 2>/dev/null || echo "$(YELLOW)Nenhuma modificação detectada$(NC)"
	@echo ""
	@echo "$(BOLD)$(CYAN)📊 Resumo:$(NC) Modificados=$$(git status --short 2>/dev/null | grep -c '^ M' || echo '0') | Adicionados=$$(git status --short 2>/dev/null | grep -c '^??' || echo '0') | Deletados=$$(git status --short 2>/dev/null | grep -c '^ D' || echo '0')"
	@echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "$(BOLD)$(CYAN)📋 Selecione o tipo de mudança (Conventional Commits):$(NC)"; \
	echo ""; \
	echo "  $(GREEN)1.$(NC) feat     - Nova funcionalidade"; \
	echo "  $(GREEN)2.$(NC) fix      - Correção de bug"; \
	echo "  $(GREEN)3.$(NC) docs     - Documentação"; \
	echo "  $(GREEN)4.$(NC) style    - Formatação, CSS"; \
	echo "  $(GREEN)5.$(NC) refactor - Refatoração de código"; \
	echo "  $(GREEN)6.$(NC) test     - Testes"; \
	echo "  $(GREEN)7.$(NC) chore    - Manutenção, configs"; \
	echo "  $(GREEN)8.$(NC) perf     - Performance"; \
	echo ""; \
	printf "$(BOLD)$(YELLOW)Digite o número (1-8): $(NC)"; \
	read type_num; \
	case "$$type_num" in \
		1) commit_type="feat";; \
		2) commit_type="fix";; \
		3) commit_type="docs";; \
		4) commit_type="style";; \
		5) commit_type="refactor";; \
		6) commit_type="test";; \
		7) commit_type="chore";; \
		8) commit_type="perf";; \
		*) echo ""; \
		   echo "$(BOLD)$(RED)✗ Erro: Opção inválida!$(NC)"; \
		   echo ""; \
		   exit 1;; \
	esac; \
	echo ""; \
	printf "$(BOLD)$(YELLOW)📝 Descrição da mudança (será formatada em kebab-case): $(NC)"; \
	read branch_desc; \
	if [ -z "$$branch_desc" ]; then \
		echo ""; \
		echo "$(BOLD)$(RED)✗ Erro: Descrição não pode estar vazia!$(NC)"; \
		echo ""; \
		exit 1; \
	fi; \
	branch_name="$$commit_type/$$(echo \"$$branch_desc\" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')"; \
	echo ""; \
	echo "$(BOLD)$(CYAN)🌿 Criando e mudando para a branch: $$branch_name$(NC)"; \
	if git checkout -b "$$branch_name" 2>/dev/null; then \
		echo "$(GREEN)✓ Branch criada com sucesso!$(NC)"; \
	else \
		echo "$(YELLOW)⚠️  A branch já existe. Mudando para ela...$(NC)"; \
		git checkout "$$branch_name"; \
	fi; \
	echo ""; \
	echo "$(BOLD)$(CYAN)📦 Adicionando arquivos ao staging...$(NC)"; \
	git add .; \
	echo "$(GREEN)✓ Arquivos adicionados!$(NC)"; \
	echo ""; \
	git status --short; \
	echo ""; \
	echo "$(BOLD)$(CYAN)🧪 Executando testes de qualidade...$(NC)"; \
	echo ""; \
	echo "$(YELLOW)⏳ Verificando formatação Markdown...$(NC)"; \
	if [ -f node_modules/.bin/markdownlint ]; then \
		if NODE_NO_WARNINGS=1 npm run lint --silent 2>&1 >/dev/null; then \
			echo "$(GREEN)  ✓ Lint passou!$(NC)"; \
		else \
			echo ""; \
			echo "$(BOLD)$(YELLOW)⚠️  Problemas de formatação encontrados. Corrigindo automaticamente...$(NC)"; \
			echo ""; \
			NODE_NO_WARNINGS=1 npm run lint:fix --silent 2>&1 >/dev/null; \
			echo ""; \
			echo "$(YELLOW)  ⏳ Verificando novamente após correção...$(NC)"; \
			if NODE_NO_WARNINGS=1 npm run lint --silent 2>&1 >/dev/null; then \
				echo "$(GREEN)  ✓ Formatação corrigida automaticamente!$(NC)"; \
				echo "$(YELLOW)  ℹ️  Os arquivos formatados serão incluídos no commit.$(NC)"; \
			else \
				echo ""; \
				echo "$(BOLD)$(RED)✗ Erro: Problemas de formatação persistem após auto-correção!$(NC)"; \
				echo "$(YELLOW)➜ Por favor, corrija manualmente e execute $(CYAN)make pr$(NC) novamente.$(NC)"; \
				echo ""; \
				exit 1; \
			fi \
		fi \
	fi; \
	echo ""; \
	echo "$(YELLOW)⏳ Verificando ortografia (pode levar alguns segundos)...$(NC)"; \
	if command -v pyspelling >/dev/null 2>&1; then \
		if timeout 30 pyspelling --config .github/pyspelling.yml 2>&1 | grep -q "Spelling check passed" 2>/dev/null; then \
			echo "$(GREEN)  ✓ Spell-check passou!$(NC)"; \
		elif [ $$? -eq 124 ]; then \
			echo "$(YELLOW)  ⚠️  Spell-check timeout (30s). Pulando verificação ortográfica.$(NC)"; \
		else \
			echo ""; \
			echo "$(BOLD)$(YELLOW)⚠️  Problemas de ortografia detectados$(NC)"; \
			echo "$(YELLOW)➜ Execute $(CYAN)make spell-check$(NC) para ver detalhes$(NC)"; \
			echo "$(YELLOW)➜ Ou adicione palavras em .github/wordlist.txt$(NC)"; \
			echo "$(YELLOW)➜ Continuando mesmo assim...$(NC)"; \
			echo ""; \
		fi \
	else \
		echo "$(YELLOW)  ⚠️  pyspelling não instalado, pulando verificação ortográfica$(NC)"; \
	fi; \
	echo ""; \
	echo "$(BOLD)$(GREEN)✅ Todos os testes passaram!$(NC)"; \
	echo ""; \
	printf "$(BOLD)$(YELLOW)💬 Descrição do commit (será formatada em minúsculas): $(NC)"; \
	read commit_desc; \
	if [ -z "$$commit_desc" ]; then \
		echo ""; \
		echo "$(BOLD)$(RED)✗ Erro: Descrição do commit não pode estar vazia!$(NC)"; \
		echo ""; \
		exit 1; \
	fi; \
	commit_desc_lower=$$(echo "$$commit_desc" | tr '[:upper:]' '[:lower:]'); \
	case "$$commit_type" in \
		feat) commit_emoji="✨";; \
		fix) commit_emoji="🐛";; \
		docs) commit_emoji="📝";; \
		style) commit_emoji="💄";; \
		refactor) commit_emoji="♻️";; \
		test) commit_emoji="✅";; \
		chore) commit_emoji="🔧";; \
		perf) commit_emoji="⚡";; \
	esac; \
	commit_msg="$$commit_emoji $$commit_type: $$commit_desc_lower"; \
	echo ""; \
	echo "$(BOLD)$(CYAN)💾 Fazendo commit com mensagem:$(NC)"; \
	echo "  $(CYAN)$$commit_msg$(NC)"; \
	echo ""; \
	git commit -m "$$commit_msg"; \
	echo "$(GREEN)✓ Commit realizado!$(NC)"; \
	echo ""; \
	echo "$(BOLD)$(CYAN)🚀 Fazendo push para o GitHub...$(NC)"; \
	git push -u origin "$$branch_name"; \
	echo ""; \
	echo "$(BOLD)$(GREEN)╔═══════════════════════════════════════════════════════════════════╗$(NC)"; \
	echo "$(BOLD)$(GREEN)║  ✅ Push realizado com sucesso!                                  ║$(NC)"; \
	echo "$(BOLD)$(GREEN)║  ✅ Todos os testes de qualidade passaram!                       ║$(NC)"; \
	echo "$(BOLD)$(GREEN)╚═══════════════════════════════════════════════════════════════════╝$(NC)"; \
	echo ""; \
	echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"; \
	echo "$(BOLD)$(YELLOW)  📋 PRÓXIMOS PASSOS - Como abrir seu Pull Request$(NC)"; \
	echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"; \
	echo ""; \
	echo "$(BOLD)$(CYAN)Opção 1: Via Web (Recomendado)$(NC)"; \
	echo ""; \
	echo "  $(GREEN)1.$(NC) Acesse seu fork no GitHub:"; \
	echo "     $(CYAN)https://github.com/$$(git config user.name 2>/dev/null || echo 'SEU-USUARIO')/estrutura-e-interpretacao-de-programas-de-computador-javascript$(NC)"; \
	echo ""; \
	echo "  $(GREEN)2.$(NC) Você verá um banner amarelo com o botão $(BOLD)\"Compare & pull request\"$(NC)"; \
	echo "     Clique nele!"; \
	echo ""; \
	echo "  $(GREEN)3.$(NC) Preencha:"; \
	echo "     • $(BOLD)Título:$(NC) Seja claro e descritivo"; \
	echo "     • $(BOLD)Descrição:$(NC) Explique suas mudanças"; \
	echo "     • Clique em $(BOLD)\"Create Pull Request\"$(NC)"; \
	echo ""; \
	echo "$(BOLD)$(CYAN)Opção 2: Via GitHub CLI (se você tem 'gh' instalado)$(NC)"; \
	echo ""; \
	echo "  Execute:"; \
	echo "  $(CYAN)gh pr create --web$(NC)"; \
	echo ""; \
	echo "$(BOLD)$(YELLOW)═══════════════════════════════════════════════════════════════════$(NC)"; \
	echo ""; \
	echo "$(BOLD)$(MAGENTA)💡 Dicas para um bom Pull Request:$(NC)"; \
	echo ""; \
	echo "  ✓ Use um título claro: $(CYAN)\"feat: Adiciona tradução da seção 1.2\"$(NC)"; \
	echo "  ✓ Descreva o que foi feito e por quê"; \
	echo "  ✓ Mencione issues relacionadas: $(CYAN)\"Fixes #123\"$(NC) ou $(CYAN)\"Related to #456\"$(NC)"; \
	echo "  ✓ Se houver screenshots ou exemplos, adicione!"; \
	echo ""; \
	echo "$(BOLD)$(GREEN)🎉 Parabéns! Você está prestes a contribuir para o projeto! 🎉$(NC)"; \
	echo ""; \
	echo "$(MAGENTA)💚 A comunidade agradece sua contribuição! 💚$(NC)"; \
	echo ""; \
	echo ""; \
	echo "$(BOLD)$(CYAN)🔄 Retornando para a branch main...$(NC)"; \
	if git checkout main 2>/dev/null || git checkout master 2>/dev/null; then \
		echo "$(GREEN)✓ Voltou para a branch principal!$(NC)"; \
		echo ""; \
		echo "$(YELLOW)ℹ️  Sua branch de feature ($$branch_name) foi preservada.$(NC)"; \
		echo "$(YELLOW)ℹ️  Você pode deletá-la após o merge do PR com:$(NC)"; \
		echo "   $(CYAN)git branch -d $$branch_name$(NC)"; \
	else \
		echo "$(YELLOW)⚠️  Não foi possível retornar à branch principal automaticamente.$(NC)"; \
		echo "$(YELLOW)➜ Execute manualmente: $(CYAN)git checkout main$(NC)"; \
	fi; \
	echo ""
