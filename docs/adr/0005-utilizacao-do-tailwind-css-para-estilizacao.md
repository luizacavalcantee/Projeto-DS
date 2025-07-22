# 5. Utilização do Tailwind CSS para Estilização

* **Status:** Aceito

* **Contexto:**
  Precisávamos de uma estratégia para estilizar nossos componentes React. As alternativas eram: escrever CSS puro ou SASS com metodologias como BEM, usar CSS-in-JS (como Styled Components), ou adotar uma biblioteca de componentes pré-estilizados (como Material-UI). O objetivo era ter velocidade de desenvolvimento e manter a consistência visual sem sair do HTML.

* **Decisão:**
  Decidimos usar o framework **Tailwind CSS**. Ele é uma abordagem "utility-first", que nos permite construir designs complexos aplicando classes utilitárias diretamente no JSX dos componentes. Isso é combinado com a biblioteca Radix UI para componentes acessíveis e sem estilo.

* **Consequências:**
  * **Positivo:** Prototipagem e desenvolvimento extremamente rápidos. O design system fica contido no arquivo de configuração (`tailwind.config.js`), garantindo consistência. Evita a necessidade de criar nomes de classes e alternar entre arquivos JS e CSS.
  * **Negativo:** O HTML/JSX pode se tornar visualmente "poluído" com muitas classes. Há uma curva de aprendizado para memorizar as classes utilitárias.