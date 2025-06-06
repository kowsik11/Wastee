import { Router } from 'express';
import { upsertLink, searchLinks } from '../services/elastic';

const router = Router();
const domainRegex = /(notion\.so|figma\.com|github\.com)/i;
const urlRegex = /^https?:\/\//i;

router.put('/', async (req, res) => {
  const { url, title } = req.body;
  if (!urlRegex.test(url) || !domainRegex.test(url)) return res.status(422).json({ code: 'invalid_url' });
  try {
    const doc = await upsertLink(url, title);
    res.status(201).json(doc);
  } catch {
    res.status(503).json({ code: 'elastic_down' });
  }
});

router.get('/search', async (req, res) => {
  const { query, page = '1', size = '20' } = req.query as any;
  if (!query || !query.trim()) return res.status(400).json({ code: 'empty_query' });
  try {
    const { results, total } = await searchLinks(query, parseInt(page), parseInt(size));
    res.json({ results, total, page: parseInt(page) });
  } catch {
    res.status(503).json({ code: 'elastic_down' });
  }
});

export default router;
