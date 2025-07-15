// /app/dream/new/page.tsx
import { prisma } from '@/lib/prisma';
import { Dream } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewDreamPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const dream: Dream = await prisma.dream.create({
        data: {
          title,
          description,
        },
      });

      // Redirect to the new dream page
      router.push(`/dream/${dream.id}`);
    } catch (error) {
      console.error('Error creating dream:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Add New Dream</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Save Dream
        </button>
      </form>
    </div>
  );
}