'use client';
import LinkCard from './LinkCard';

export default function ResultsList({ results, loading }: { results: any[]; loading: boolean }) {
  if (loading) return <p>Loading...</p>;
  if (!results.length) return <p>No results</p>;
  return (
    <div className="space-y-2">
      {results.map((r) => (
        <LinkCard key={r.id} link={r} />
      ))}
    </div>
  );
}
