"use client"

import Image from "next/image"
import { ChevronDown } from 'lucide-react';
import Button from "../Button";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";

export default function Header() {
    const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <header className="pb-4 pl-3 pr-3 border-b flex items-end justify-between">
        <div className="flex items-end gap-3">
            <div className="w-24">
                <Image 
                    src="/logo.svg"
                    alt="logo"
                    width={150} height={150}
                    priority
                />
            </div>

            {isMobile ? (
            <ChevronDown className="h-7 w-7 ml-1 " />
            ) : (
              <nav>
                <ul className="flex gap-3">
                    <li><Link href="#" className="font-primary cursor-pointer hover:underline hover:text-xl  transition-all">Learn to Budget</Link></li>
                    <li><Link href="#" className="font-primary cursor-pointer hover:underline hover:text-xl  transition-all">Features</Link></li>
                    <li><Link href="#" className="font-primary cursor-pointer hover:underline hover:text-xl  transition-all">About</Link></li>
                </ul>
              </nav>
            )}
        </div>
        <Button text="Sign Up"/>
    </header>
  )
}
