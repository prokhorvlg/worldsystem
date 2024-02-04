# Updating database

- use sql to modify databse
- pull database to prisma schema using command
- done!

## Overview

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/14)
- Language - [TypeScript](https://www.typescriptlang.org)
- Auth - [NextAuth.js](https://next-auth.js.org)
- Database - [Vercel Postgres](https://vercel.com/postgres)
- Deployment - [Vercel](https://vercel.com/docs/concepts/next.js/overview)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Analytics - [Vercel Analytics](https://vercel.com/analytics)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

This template uses the new Next.js App Router. This includes support for enhanced layouts, colocation of components, tests, and styles, component-level data fetching, and more.

## Getting Started

During the deployment, Vercel will prompt you to create a new Postgres database. This will add the necessary environment variables to your project.

Inside the Vercel Postgres dashboard, create a table based on the schema defined in this repository.

```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  username VARCHAR(255)
);
```

Insert a row for testing:

```
INSERT INTO users (id, email, name, username) VALUES (1, 'me@site.com', 'Me', 'username');
```

Finally, run the following commands to start the development server:

```
pnpm install
pnpm dev
```

You should now be able to access the application at http://localhost:3000.
