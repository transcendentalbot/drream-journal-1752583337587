// /app/dream/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import { Dream } from '@prisma/client';
import { notFound } from 'next/navigation';

type DreamPageProps = {
  params: {
    id: string;
  };
};

export default async function DreamPage({ params }: DreamPageProps) {
  const dream = await prisma.dream.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!dream) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{dream.title}</h1>
      <p>{dream.description}</p>
    </div>
  );
}