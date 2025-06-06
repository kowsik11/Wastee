import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: process.env.ELASTIC_URL || 'http://localhost:9200' });

export interface LinkDoc {
  id: string;
  url: string;
  title?: string;
  createdAt: string;
}

export async function upsertLink(url: string, title?: string): Promise<LinkDoc> {
  const id = Buffer.from(url).toString('base64');
  const now = new Date().toISOString();
  const doc: LinkDoc = { id, url, title, createdAt: now };
  await client.index({ index: 'links', id, document: doc });
  await client.indices.refresh({ index: 'links' });
  const { body } = await client.get({ index: 'links', id });
  return body._source as LinkDoc;
}

export async function searchLinks(query: string, page = 1, size = 20) {
  const { body } = await client.search({
    index: 'links',
    from: (page - 1) * size,
    size,
    query: { multi_match: { query, fields: ['url', 'title'], fuzziness: 'AUTO' } },
    sort: ['_score', { createdAt: 'desc' }]
  });
  const results = body.hits.hits.map((h: any) => h._source as LinkDoc);
  return { results, total: body.hits.total.value };
}
