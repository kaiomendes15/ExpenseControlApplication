### **Rotas da API**

#### a) **Rotas de Usuário**

- `POST /auth/register`: Cadastro de usuários. ✅
- `POST /auth/login`: Login e retorno do token JWT. ✅
- `GET /user/profile`: Dados do perfil do usuário logado. ✅
- `DELETE /config/delete/`: Deletar usuário (requer autenticação) ✅

#### b) **Rotas de Receitas e Despesas**

- `POST /transactions`: Adicionar uma receita ou despesa. ✅
- `GET /transactions`: Listar todas as transações do usuário. ✅
- `GET /transactions/:id`: Buscar uma transação específica. ✅
- `PUT /transactions/:id`: Editar uma transação. ✅
- `DELETE /transactions/:id`: Remover uma transação. ✅

#### c) **Rotas de Relatórios**

- `GET /reports/summary`: Resumo financeiro (saldo, total receitas/despesas). ✅
- `GET /reports/category`: Resumo por categoria. ✅
- `GET /reports/period`: Resumo em um período específico. 