# Refatoração IHC — GitHub Issues sem filtro punitivo

Este projeto é um protótipo acadêmico para a tarefa de Interação Humano-Computador. O sistema real escolhido foi o **GitHub**, mais especificamente a busca/filtro de Issues e Pull Requests.

## Problema escolhido

O GitHub permite filtrar Issues e Pull Requests por meio de uma linguagem de busca com qualificadores como `is:issue`, `state:open`, `label:bug`, `assignee:@me` e ordenações como `sort:updated-desc`. Esse recurso é poderoso, mas pode ser punitivo para usuários iniciantes ou intermediários, porque exige que a pessoa lembre a sintaxe correta antes de conseguir executar uma tarefa simples.

Fontes consultadas:

- Documentação do GitHub sobre filtragem de Issues e Pull Requests: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/filtering-and-searching-issues-and-pull-requests
- Documentação do GitHub sobre Command Palette: https://docs.github.com/en/get-started/accessibility/github-command-palette
- Documentação do GitHub sobre sintaxe de busca: https://github.com/github/docs/blob/main/content/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax.md
- Documentação do GitHub sobre busca de código e qualificadores: https://github.com/github/docs/blob/main/content/search-github/github-code-search/understanding-github-code-search-syntax.md

## Diagnóstico técnico

A interface original exige alta memória de trabalho porque o usuário precisa lembrar qualificadores, valores aceitos, operadores, regras de combinação e erros de digitação. A tarefa mental não é apenas escolher o que deseja buscar, mas traduzir essa intenção para uma mini-linguagem textual. Isso aumenta a distância cognitiva, pois o usuário tem que pensar como a máquina espera receber o comando.

## Refatoração proposta

A refatoração transforma a mesma funcionalidade em uma tela com:

- Menus visuais para tipo, estado, rótulo e responsável.
- Cartões de filtros escolhidos.
- Manipulação direta por drag and drop para reorganizar a prioridade visual dos filtros.
- Pré-visualização automática da consulta gerada.
- Resultado simulado para mostrar que a ação do usuário tem resposta imediata.

## Justificativa técnica

A solução original do GitHub depende de uma linguagem de comando com qualificadores e operadores que exigem recordação ativa, como lembrar nomes, dois-pontos, valores aceitos e combinações possíveis. Na refatoração, a mesma tarefa foi convertida em menus visuais, cartões de filtros e pré-visualização automática da consulta, reduzindo a distância físico-cognitiva porque o usuário deixa de transformar mentalmente sua intenção em sintaxe textual e passa a reconhecer opções já disponíveis na interface. Antes, a carga de memória ficava no usuário; depois, ela passa para a própria interface, que apresenta as escolhas, impede combinações mais confusas e mostra o resultado gerado em tempo real.

## Como rodar

Abra o arquivo `index.html` no navegador.

## Como colocar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie os arquivos `index.html`, `style.css`, `script.js` e `README.md`.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, escolha a branch `main` e a pasta `/root`.
5. Salve e aguarde o link do GitHub Pages aparecer.
