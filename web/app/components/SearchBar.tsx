'use client';
import { ChangeEvent } from 'react';

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      className="border p-2 w-full max-w-md mb-4"
      placeholder="Search..."
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}
