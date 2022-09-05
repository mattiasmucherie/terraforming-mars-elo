A [Next.js](https://nextjs.org/docs/getting-started) project.


`yarn` to install dependencies

`yarn dev` to start server 

`yarn prisma studio` to have a look at the database

`yarn prisma migrate reset` to reset the database

### API:s
- `/api/create-user` expects a body with 
```js
 {name: "Mattias"}
 ```
- `/api/new-match` expects a body with an array of names in winning order, outputs list of users with updated ranking
```js
['Rikard', 'Mattias','Cornelius']
```
- `/api/match` to get all the matches played
- `/api/match/[id]` to get a specific match id and a bit more info
- `/api/all-users` to get a list of all users and their current elo


Try them out to see all the info you can get. Right now it doesn't matter if `GET` or `POST` or anything else and basically no error handling


And I haven't touched anything on the frontend yet