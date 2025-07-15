// /app/dream/page.tsx
import { prisma } from '@/lib/prisma';
import { Dream } from '@prisma/client';
import Link from 'next/link';

export default async function DreamPage() {
  const dreams = await prisma.dream.findMany();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Dream Journal</h1>
      <Link href="/dream/new" className="btn btn-primary mb-4">
        Add New Dream
      </Link>
      <ul>
        {dreams.map((dream: Dream) => (
          <li key={dream.id} className="mb-2">
            <Link href={`/dream/${dream.id}`}>{dream.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}