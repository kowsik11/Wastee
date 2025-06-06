# LinkHub Turbo Search

Monorepo providing a simple link search service backed by Elasticsearch.

## Quick Start
```bash
pnpm install
docker-compose up
```
API will be on `http://localhost:4000` and web on `http://localhost:3000`.

## Environment Variables
- `ELASTIC_URL` - Elasticsearch URL
- `JWT_SECRET` - secret for HS256 tokens
- `PORT` - API port

## Scripts
- `pnpm dev` – run all apps in dev mode
- `pnpm test` – run Jest
- `pnpm lint` – eslint
- `pnpm build` – tsc and next build

## Swagger & GraphQL
Swagger available at `/api-docs` (not implemented) and GraphQL Playground at `http://localhost:4000/graphql`.

![demo](demo.gif)
