<h1 align="center" >
    URL Shortener
</h1>

<h4 align="center">
  A simple URL shortener made with Nextjs and PostgreSQL
</h4>

### Usage

Go [here](https://shortly.cantcode.fyi) to use the app.

## Setting Up Locally

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)(you can use neondb if you want to host it for free)

### Setting up the project

1. Clone the repository

```bash
git clone https://github.com/phantomknight287/url-shortner.git
```

2. Install dependencies

```bash
pnpm install
```

3. Create a .env file in the root directory and add the following

```bash
DATABASE_URL=postgres://username:password@localhost:5432/database
```

4. Push the database schema to your database

```bash
npx prisma db push
```

5. Run the development server

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
