# 3. Adoção do TypeScript em Todo o Projeto

* **Status:** Aceito

* **Contexto:**
  Precisávamos escolher a linguagem de programação para o projeto. A alternativa principal era usar JavaScript puro. O objetivo era aumentar a robustez do código, facilitar a manutenção a longo prazo e reduzir a quantidade de bugs em tempo de execução, especialmente com uma equipe trabalhando em conjunto.

* **Decisão:**
  Decidimos usar **TypeScript** tanto no frontend (Next.js) quanto no backend (Node.js/Express). O TypeScript adiciona um sistema de tipagem estática ao JavaScript, permitindo que erros sejam detectados durante o desenvolvimento, e não apenas quando o código é executado.

* **Consequências:**
  * **Positivo:** Redução drástica de erros comuns (ex: `undefined is not a function`). O autocompletar e a navegação no código são muito mais poderosos. Facilita o onboarding de novos desenvolvedores, pois os tipos servem como documentação.
  * **Negativo:** Requer um passo de compilação (transpilação), o que pode deixar o setup inicial um pouco mais lento. Existe uma curva de aprendizado para desenvolvedores que vêm do JavaScript puro.