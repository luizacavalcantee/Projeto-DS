# 1. Adoção do Next.js como Framework Frontend

* **Status:** Aceito

* **Contexto:**
  Precisávamos de um framework para construir a interface do usuário (UI) com React. As principais alternativas eram usar o Vite com React (para máxima flexibilidade e velocidade de desenvolvimento) ou o Create React App (CRA, o padrão antigo). O requisito era ter uma solução que facilitasse a otimização para SEO (Search Engine Optimization) e que oferecesse um bom desempenho inicial de carregamento da página.

* **Decisão:**
  Decidimos usar o **Next.js**. Ele é um framework React que oferece renderização no lado do servidor (SSR) e geração de sites estáticos (SSG) de forma nativa. Além disso, possui um sistema de roteamento baseado em arquivos que simplifica a organização do projeto e a criação de novas páginas.

* **Consequências:**
  * **Positivo:** Ganhamos renderização no servidor, melhorando o SEO e o tempo de carregamento inicial. O roteamento baseado em arquivos acelera o desenvolvimento. A estrutura opinativa do Next.js fornece um caminho claro para organizar o código.
  * **Negativo:** O Next.js é mais complexo e opinativo que o Vite. O tempo de build pode ser maior em comparação com soluções mais simples.