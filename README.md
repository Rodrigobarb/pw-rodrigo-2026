# pw-rodrigo-2026

Projeto da disciplina de Programação Web — API REST com **Express + PostgreSQL** seguindo
**Clean Architecture (Arquitetura Limpa)** e frontend em **React** consumindo essa API.

O sistema é formado por três partes:

| Parte | Pasta | Descrição |
|---|---|---|
| Banco de dados | `api/src/database/script.sql` | Tabelas `categorias`, `produtos`, `avaliacoes` e `usuarios` |
| API | `api/` | Operações CRUD sobre as tabelas |
| Frontend | `src/` | Telas para acessar e manipular os dados |

## Arquitetura Limpa

A dependência sempre aponta de fora para dentro: as camadas externas conhecem as internas,
nunca o contrário.

```
Entities  ->  Use Cases  ->  Controllers / Gateways  ->  Routes / Express / PostgreSQL
(regras de   (regras de     (adaptadores de           (frameworks & drivers)
 negócio da   negócio da     interface)
 empresa)     aplicação)
```

```
api/
├── index.js                       Express, middlewares e registro das rotas
└── src/
    ├── entities/                  Entidades: Categoria, Produto, Avaliacao, Usuario
    ├── usecases/                  Regras de negócio e validações
    ├── gateways/                  Acesso ao banco (SQL) e conversão para entidades
    ├── controllers/               Tradução HTTP <-> casos de uso
    ├── routes/                    Rotas do Express
    └── database/
        ├── db.js                  Pool de conexão com o PostgreSQL
        └── script.sql             Criação das tabelas e carga inicial
```

Regra prática: só `database/db.js` conhece o PostgreSQL e só `controllers/` e `routes/`
conhecem o Express. As entidades e os casos de uso são JavaScript puro.

## Banco de dados

```bash
createdb pw_rodrigo_2026
psql -U postgres -d pw_rodrigo_2026 -f api/src/database/script.sql
```

## Executando a API

```bash
cd api
npm install
cp .env.example .env      # ajuste usuário, senha e banco
npm start                 # API em http://localhost:3002
```

Variáveis do arquivo `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=pw_rodrigo_2026
PORT=3002
```

## Executando o frontend

```bash
npm install
cp .env.example .env      # REACT_APP_API_URL=http://localhost:3002
npm start                 # aplicação em http://localhost:3000
```

Faça login com um dos usuários cadastrados pelo script (por exemplo
`jorgebavaresco@ifsul.edu.br` / `123456`) para acessar as telas de Categorias e Produtos.

## Rotas da API

### Categoria

| Método | Rota | Descrição |
|---|---|---|
| GET | `/categoria` | Lista todas as categorias |
| GET | `/categoria/:codigo` | Busca uma categoria pelo código |
| POST | `/categoria` | Inclui uma categoria |
| PUT | `/categoria` | Altera uma categoria |
| DELETE | `/categoria/:codigo` | Exclui uma categoria |

### Produto

| Método | Rota | Descrição |
|---|---|---|
| GET | `/produto` | Lista todos os produtos (com o nome da categoria) |
| GET | `/produto/:codigo` | Busca um produto pelo código |
| GET | `/produto/categoria/:categoria` | Lista os produtos de uma categoria |
| POST | `/produto` | Inclui um produto |
| PUT | `/produto` | Altera um produto |
| DELETE | `/produto/:codigo` | Exclui um produto |

### Avaliação

| Método | Rota | Descrição |
|---|---|---|
| GET | `/avaliacao` | Lista todas as avaliações |
| GET | `/avaliacao/:codigo` | Busca uma avaliação pelo código |
| GET | `/avaliacao/produto/:produto` | Lista as avaliações de um produto |
| POST | `/avaliacao` | Inclui uma avaliação |
| PUT | `/avaliacao` | Altera uma avaliação |
| DELETE | `/avaliacao/:codigo` | Exclui uma avaliação |

### Usuário

| Método | Rota | Descrição |
|---|---|---|
| POST | `/usuario/login` | Autentica com e-mail e senha |
| GET | `/usuario` | Lista todos os usuários |
| GET | `/usuario/:email` | Busca um usuário pelo e-mail |
| POST | `/usuario` | Inclui um usuário |
| PUT | `/usuario` | Altera um usuário |
| DELETE | `/usuario/:email` | Exclui um usuário |

A senha nunca é devolvida pela API.

## Validações (casos de uso)

- **Categoria**: nome obrigatório com até 40 caracteres; não exclui categoria com produtos vinculados.
- **Produto**: nome obrigatório com até 50 caracteres, `quantidade_estoque >= 0`, `valor >= 0`,
  categoria existente; não exclui produto com avaliações vinculadas.
- **Avaliação**: autor, e-mail, texto (até 200 caracteres) e nota entre 0 e 5; produto existente.
- **Usuário**: e-mail válido e único, senha com até 20 caracteres, tipo `T`, `A` ou `U`,
  telefone e nome obrigatórios.

Erros de validação retornam `400` com `{ "msg": "..." }`; registros inexistentes retornam `404`.

## Testes com curl

```bash
# GET categorias
curl -X GET localhost:3002/categoria

# GET categoria por código
curl -X GET http://localhost:3002/categoria/2

# POST categoria
curl -X POST -H "Content-Type: application/json" -d "{\"nome\":\"Baterias\"}" http://localhost:3002/categoria

# PUT categoria
curl -X PUT -H "Content-Type: application/json" -d "{\"codigo\":\"5\",\"nome\":\"Baterias recarregáveis\"}" http://localhost:3002/categoria

# DELETE categoria
curl -X DELETE http://localhost:3002/categoria/5

# POST produto
curl -X POST -H "Content-Type: application/json" \
  -d "{\"nome\":\"Monitor 24\",\"descricao\":\"Monitor LED\",\"quantidade_estoque\":5,\"ativo\":true,\"valor\":899.90,\"data_cadastro\":\"2026-01-01\",\"categoria\":3}" \
  http://localhost:3002/produto

# POST avaliação
curl -X POST -H "Content-Type: application/json" \
  -d "{\"autor\":\"Rodrigo\",\"email\":\"rodrigo@ifsul.edu.br\",\"texto\":\"Muito bom\",\"nota\":5,\"produto\":1}" \
  http://localhost:3002/avaliacao

# Login
curl -X POST -H "Content-Type: application/json" \
  -d "{\"email\":\"joao@ifsul.edu.br\",\"senha\":\"123456\"}" \
  http://localhost:3002/usuario/login
```
