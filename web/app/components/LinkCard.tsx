'use client';
export default function LinkCard({ link }: { link: any }) {
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className="block border p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
      <p className="font-bold">{link.title || link.url}</p>
      <p className="text-sm text-gray-500">{link.url}</p>
    </a>
  );
}
