# Todo (lista de tarefas)

Aplicação **To-do** desenvolvida com **Angular** como prática de conhecimentos e organização de projeto. O exercício contempla ambiente de desenvolvimento, build otimizado para produção e execução via servidor HTTP simples.
Para consultar a aplicação ao vivo, [clique aqui](https://gabrzb.github.io/todo-angular/)

---

## Tecnologias

- **Angular** (Angular CLI 21.0.5)
- **Node.js / npm**
- **http-server** (para execução em produção)

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão compatível com Angular 21)
- npm
- Angular CLI (`npm install -g @angular/cli`)

---

## 📦 Instalação

Clone o repositório :

```bash
git clone 'https://github.com/gabrzb/todo-angular.git'
```

Instale as dependências do projeto:

```bash
cd todo
npm install
npm install http-server
```

---

## 🚀 Operação

Para iniciar o servidor de desenvolvimento local:

```bash
ng serve --open
```

O aplicativo será aberto automaticamente no navegador, geralmente em  
`http://localhost:4200`.

---

## 🏗️ Build

Para gerar a build do projeto:

```bash
ng build
```

Os artefatos compilados serão armazenados no diretório `dist/`.  
Por padrão, a build de produção aplica otimizações de desempenho e carregamento.

---

## Produção

Para executar o projeto já compilado em modo produção:

```bash
cd dist/todo/browser
npx http-server -p 4200 -c-1
```

A aplicação ficará disponível em `http://localhost:4200`.

## 📚 Recursos Adicionais

- [Angular CLI – Overview and Command Reference](https://angular.dev/tools/cli)
