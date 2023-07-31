# Deployment

> Notes on how I deployed the application.

## Next.js

The Next.js app is deployed on Vercel. You can connect your GitHub account with Vercel.  
Don't forget to add your environment variables.

## Postgres/Prisma

The Postgres database is running on [fly.io](https://fly.io).

After signing up for an account and installing the command line application:

```bash
fly auth login
```

Create postgres:

```bash
fly postgres create
```

The terminal will show you the credentials, make sure to save them somewhere.

To run Prisma migrations, we need to open a proxy tunnel

```bash
fly proxy 15432:5432 -a <name of your postgres app>
```

Adjust `.env` temporarily:

```
DATABASE_URL="postgres://postgres:<your fly.io password>@localhost:15432/crowdr?schema=public"
```

Run prisma migrations:

```bash
pnpm exec prisma migrate deploy
```
