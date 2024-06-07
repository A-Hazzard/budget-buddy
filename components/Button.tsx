'use client';
import { useRouter } from 'next/navigation';
export default function Button({ className, text, path }: { className?: string; text: string; path?: string }) {
  const router = useRouter();

  const redirect = () => {
    if (path) router.push(`/${path}`);
  };
  return (
    <button
      onClick={redirect}
      className={`px-4 h-12 bg-blue-primary text-white font-primary rounded-full ${className}`}
    >
      {text}
    </button>
  );
}