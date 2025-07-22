# 4. Implementação de Autenticação Stateless com JWT

* **Status:** Aceito

* **Contexto:**
  O sistema precisa de uma forma de proteger rotas e identificar usuários autenticados. A principal alternativa era a autenticação baseada em sessão (stateful), onde o servidor armazena o estado da sessão do usuário. No entanto, queríamos uma arquitetura que fosse mais fácil de escalar horizontalmente.

* **Decisão:**
  Decidimos implementar um sistema de autenticação **stateless (sem estado) usando JSON Web Tokens (JWT)**. Após o login, o servidor gera um token JWT assinado que contém as informações do usuário e o envia para o cliente. O cliente então envia esse token no cabeçalho de cada requisição para acessar rotas protegidas.

* **Consequências:**
  * **Positivo:** A arquitetura é stateless, o que significa que qualquer instância do servidor pode validar o token, facilitando o balanceamento de carga e a escalabilidade. É um padrão bem estabelecido e ideal para SPAs (Single Page Applications).
  * **Negativo:** Uma vez emitido, um token JWT não pode ser invalidado facilmente antes de expirar. O armazenamento seguro do token no cliente (localStorage vs. cookies) requer atenção especial para evitar ataques XSS.