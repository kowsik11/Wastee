import { gql } from 'apollo-server-express';
import { upsertLink, searchLinks } from '../services/elastic';

export const typeDefs = gql`
  type Link { id: ID!, url: String!, title: String, createdAt: String! }
  type SearchResult { results: [Link!]!, total: Int!, page: Int! }
  type Query { searchLinks(query: String!, page: Int, size: Int): SearchResult! }
  type Mutation { putLink(url: String!, title: String): Link! }
`;

export const resolvers = {
  Query: {
    searchLinks: (_: any, { query, page, size }: any) => searchLinks(query, page, size)
  },
  Mutation: {
    putLink: (_: any, { url, title }: any) => upsertLink(url, title)
  }
};
