# <a href="https://srgeverson.github.io/web-app-pedidos">Sistema de Controle de Pedidos</a>

### Pré-requisitos

💡Para que esta aplicação depende da [api_node](https://github.com/srgeverson/api_node) rodando, então siga os passos contidos no README.

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com) e [Node.js](https://nodejs.org/en/)). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

💡O arquivo ".ENV" que aqui é orientado a ser criado é para ambiente de teste e utilização no docker, caso seja criado um ambiente manualmete crie as variáveis normalmente com os comando <b>export </b>no linux e <b>set </b>para windows com <b>terminal ou cmd</b> respectivamente.

### 🛠️ Comando executado durante a construção da aplicação

```bash
# Instalar o react e o next [React JS](https://reactjs.org/docs/create-a-new-react-app.html#gatsby-focus-wrapper).
$ npx create-react-app web-app-pedidos

# Deploy GitHub Pages
$ npm install --save-dev gh-pages

# Instala o gerenciador de rotas [Router DOM](https://v5.reactrouter.com/web/guides/quick-start).
$ npm install react-router-dom --save

# Instala o gerenciador de histórico de navegação.
$ npm install history --save

# Instalar o Bootstrap utilizando reactstrap: https://reactstrap.github.io/
$ npm install bootstrap --save
$ npm install reactstrap --save

# Realizar chamada para API
$ npm install axios --save

# Carregando variáveis de ambiente de um arquivo .env para process.env.
$ npm install dotenv --save

# Criando o arquivo que armazenará as variáveis necessárias para a aplicação executar.
$ touch .ENV

# Crie as variáveis de ambiente iniciais como mostra a seguir:
$ echo "PUBLIC_URL=URL_DA_APLICACAO_AQUI" >> .ENV
$ echo "SERVER_URL=URL_DA_API_AQUI" >> .ENV
$ echo "SERVER_PORT=PORTA_DA_API_AQUI" >> .ENV

# Rodar o projeto
$ npm start

```

#### 🧭 Executando a aplicação
```bash

# Clone este repositório
$ git clone https://github.com/srgeverson/web-app-pedidos.git

# Acesse a pasta do projeto no terminal/cmd
$ cd web-app-pedidos/

# Instale as dependências
$ npm install

# Execute a aplicação web
$ npm start

# Publicar a plicação
$ npm run deploy

```

## 👨‍💻 Equipe de Desenvolvimento

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## ✒️ Autores

* **Geverson Souza** - [Geverson Souza](https://www.linkedin.com/in/srgeverson/)

## 📌 Versão 1.0.0

É utilizado o [Github](https://github.com/) para controle de versão.
