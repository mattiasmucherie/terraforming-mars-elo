A [Next.js](https://nextjs.org/docs/getting-started) project.

`yarn` to install dependencies

`yarn dev` to start server

`yarn prisma studio` to have a look at the database

`yarn prisma migrate reset` to reset the database

### Rebuild Prisma

`yarn prisma generate`

### Running locally

You need Docker installed, then run:

```shell
docker compose up -d
```

We need the `DATABASE_URL` env variable in a new file called `.env`. You can find it [here](.env.example).
After that we need to seed that db, we will do that by resetting it:

```shell
yarn prisma migrate reset
```

**MAKE SURE THAT THE DATASOURCE OF THE DATABASE IS LOCALHOST!**
