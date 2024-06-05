"use client"

import { useRouter } from 'next/navigation'

export default function Button({ className, text }: { className?: string, text: string }) {
  const router = useRouter()

  return <button 
            onClick={() => router.push('/signup')} 
            className={`px-4 h-12 bg-blue-primary text-white font-primary rounded-full ${className}`}>
          {text}
        </button>;
}
