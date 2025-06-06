'use client';
import useSearch from './hooks/useSearch';
import SearchBar from './components/SearchBar';
import ResultsList from './components/ResultsList';

export default function Page() {
  const { query, setQuery, results, loading } = useSearch();
  return (
    <main className="p-4 flex flex-col items-center">
      <SearchBar value={query} onChange={setQuery} />
      <ResultsList results={results} loading={loading} />
    </main>
  );
}
