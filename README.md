# webdev-server

Express.js HTTP server for the Kambaz application (CS5610, Chapter 5).

- Lab 5 routes under `/lab5/...`
- Kambaz REST API under `/api/...` (users, courses, modules, assignments, enrollments), with data kept in memory

## Run locally

```bash
npm install
npm run dev
```

The server listens on http://localhost:4000. Create a `.env` file first:

```
SERVER_ENV=development
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:4000
SESSION_SECRET=any local phrase
```
