# ExpenseControlApplication

*portuguese*

### Descrição
Este é um projeto de controle de gastos pessoais desenvolvido com o objetivo de ajudar usuários a monitorar e gerenciar suas finanças. O sistema permite que o usuário registre transações financeiras, classifique os gastos em diferentes categorias e visualize o histórico de transações.

A aplicação foi construída utilizando Node.js com Express.js e conecta-se ao banco de dados PostgreSQL para persistir as informações.

### Tecnologias Utilizadas
**Backend**:

- Node.js
- Express.js
- PostgreSQL / Neon (remoto)

**Segurança**:

- Criptografia de senhas com bcrypt
- Middleware para autenticação e autorização com JWT (JSON Web Token)
**Banco de Dados**:

- PostgreSQL (relacional)
- Tabelas e chaves estrangeiras para integridade referencial
  
### Funcionalidades
- Cadastro de transações: O usuário pode registrar uma transação financeira, incluindo detalhes como valor, categoria, tipo (entrada ou saída), data da transação e observações.
- Listagem de transações: O usuário pode visualizar todas as transações registradas com filtros para categoria, tipo de transação e data.
- Autenticação de usuários: O sistema permite que usuários se registrem e façam login para ter acesso ao seu histórico financeiro.
- Validação de dados: A aplicação valida os dados antes de enviá-los ao banco de dados para garantir a integridade e evitar entradas inválidas.
- Segurança: Senhas dos usuários são armazenadas de forma segura utilizando bcrypt para hash, e a autenticação é realizada através de JWT.

### Estrutura do Banco de Dados
O banco de dados é estruturado com as seguintes tabelas principais:

- users: Tabela que armazena informações do usuário, como nome, email e senha (com hash).
- transactions: Tabela que armazena as transações financeiras, vinculadas a um usuário através de uma chave estrangeira (userId).

---
*english*

### Description
This is a personal expense tracker project designed to help users monitor and manage their finances. The system allows users to record financial transactions, categorize their expenses, and view their transaction history.

The application is built with Node.js using Express.js and connects to a PostgreSQL database to persist information.

### Technologies Used
**Backend**:

- Node.js
- Express.js
- PostgreSQL / / Neon (remote)

**Security**:

- Password hashing with bcrypt
- Authentication and authorization middleware with JWT (JSON Web Token)
**Database**:

- PostgreSQL (relational)
- Tables and foreign keys for referential integrity
### Features
- Transaction recording: Users can record a financial transaction with details such as amount, category, type (income or expense), transaction date, and notes.
- Transaction listing: Users can view all recorded transactions with filters for category, transaction type, and date.
- User authentication: The system allows users to register and log in to access their financial history.
- Data validation: The application validates data before sending it to the database to ensure integrity and avoid invalid entries.
- Security: User passwords are securely stored using bcrypt for hashing, and authentication is handled via JWT.
### Database Structure
The database is structured with the following main tables:

- users: Stores user information, such as name, email, and password (hashed).
- transactions: Stores financial transactions, linked to a user via a foreign key (userId).