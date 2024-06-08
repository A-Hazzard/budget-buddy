'use client';
import { useRouter } from 'next/navigation';
export default function Button({ className, text, path }: { className?: string; text: string; path?: string }) {
  const router = useRouter();
  return (
    <button
      className={`px-4 h-12 bg-blue-primary text-white font-primary rounded-full ${className}`}
    >
      {text}
    </button>
  );
}