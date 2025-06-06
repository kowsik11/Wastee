'use client';
import useSWR from 'swr';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then((r) => r.json());

export default function useSearch() {
  const [query, setQuery] = useState('');
  const { data, isLoading } = useSWR(query ? `/api/links/search?query=${encodeURIComponent(query)}` : null, fetcher, { debounce: 300 });
  return { query, setQuery, results: data?.results || [], loading: isLoading };
}
