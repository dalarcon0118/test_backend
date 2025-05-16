# Teste Técnico - Desenvolvedor Backend Pleno

## Descrição do Projeto

Este projeto é um teste técnico para a vaga de Desenvolvedor Backend Pleno. O objetivo é gerenciar alunos, utilizando Node.js e MySQL.

## Tecnologias Utilizadas

- Node.js
- MySQL

## Como Executar o Projeto

Este projeto é configurado para ser executado com Docker e Docker Compose.

### Pré-requisitos

- Docker instalado ([https://www.docker.com/get-started](https://www.docker.com/get-started))
- Docker Compose instalado (geralmente vem com o Docker Desktop)

### Passos para Executar

1.  **Clonar o Repositório (se ainda não o fez):**
    ```bash
    git clone <url-do-seu-repositorio>
    cd test_backend
    ```

2.  **Criar Projetos Iniciais (se ainda não existem):**
    *   Navegue até `packages/backend` e crie seu projeto AdonisJS.
    *   Navegue até `packages/frontend` e crie seu projeto ReactJS (por exemplo, com `npx create-react-app .`).

3.  **Configurar Variáveis de Ambiente (se necessário):**
    *   Verifique o arquivo `docker-compose.yml` e os respectivos `Dockerfile`s para quaisquer variáveis de ambiente que precisem ser ajustadas (por exemplo, credenciais de banco de dados).
    *   Para o backend AdonisJS, certifique-se de que o arquivo `.env` (ou a configuração via `docker-compose.yml`) esteja correto para a conexão com o banco de dados `mysql_db`.

4.  **Construir e Iniciar os Contêineres:**
    Na raiz do projeto (`/Users/davidmartinez/develop/vagas/test_backend/`), execute:
    ```bash
    docker-compose up --build
    ```
    Para executar em segundo plano (detached mode):
    ```bash
    docker-compose up --build -d
    ```

5.  **Acessar as Aplicações:**
    *   **Backend (AdonisJS):** [http://localhost:3333](http://localhost:3333)
    *   **Frontend (ReactJS):** [http://localhost:3000](http://localhost:3000)
    *   **MySQL:** Pode ser acessado no host `db` (nome do serviço no `docker-compose.yml`) na porta `3306` por outros contêineres na mesma rede Docker, ou em `localhost:3306` do seu sistema host.

### Parar os Contêineres

Para parar os contêineres em execução:
```bash
docker-compose down
```