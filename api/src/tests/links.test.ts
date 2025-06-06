import request from 'supertest';
import express from 'express';
import linksRouter from '../routes/links';
import { auth } from '../middleware/auth';
import { limiter } from '../middleware/rateLimit';

jest.mock('../middleware/auth', () => ({ auth: (_: any, __: any, next: any) => next() }));
jest.mock('../middleware/rateLimit', () => ({ limiter: (_: any, __: any, next: any) => next() }));

let store: any[] = [];
jest.mock('../services/elastic', () => ({
  upsertLink: (url: string, title?: string) => {
    const id = Buffer.from(url).toString('base64');
    const existing = store.find((d) => d.id === id);
    if (existing) return existing;
    const doc = { id, url, title, createdAt: new Date().toISOString() };
    store.push(doc);
    return doc;
  },
  searchLinks: (q: string) => ({ results: store.filter((d) => d.url.includes(q)), total: store.length })
}));

const app = express();
app.use(express.json());
app.use('/links', limiter, auth, linksRouter);

describe('links api', () => {
  beforeEach(() => { store = []; });
  it('happy PUT', async () => {
    const res = await request(app).put('/links').send({ url: 'https://github.com' });
    expect(res.status).toBe(201);
  });
  it('invalid URL', async () => {
    const res = await request(app).put('/links').send({ url: 'ftp://evil.com' });
    expect(res.status).toBe(422);
  });
  it('duplicate URL', async () => {
    await request(app).put('/links').send({ url: 'https://github.com' });
    const res = await request(app).put('/links').send({ url: 'https://github.com' });
    expect(res.status).toBe(201);
  });
  it('search found', async () => {
    await request(app).put('/links').send({ url: 'https://github.com' });
    const res = await request(app).get('/links/search').query({ query: 'github' });
    expect(res.body.results.length).toBe(1);
  });
  it('rate limit trigger', async () => {
    jest.resetModules();
    const rl = require('../middleware/rateLimit');
    const limiterFn = rl.limiter;
    let hit = 0;
    rl.limiter = (_: any, res: any) => { hit++; res.status(429).json({}); };
    const response = await request(app).get('/links/search').query({ query: 'a' });
    expect(hit).toBe(1);
    rl.limiter = limiterFn;
  });
});
