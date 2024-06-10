'use client';
import { useRouter } from 'next/navigation';
export default function Button({ className, text, path }: { className?: string; text: string; path?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => path ? router.push(`${path}`) : null}
      className={`px-4 h-12 bg-green-primary text-white font-primary rounded-full ${className}`}
    >
      {text}
    </button>
  );
}