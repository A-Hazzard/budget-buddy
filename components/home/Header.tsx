"use client"

import Image from "next/image"
import { ChevronDown } from 'lucide-react';
import Button from "../Button";
import { useMediaQuery } from "react-responsive";

export default function Header() {
    const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <header className="pb-4 pl-3 pr-3 border-b flex items-end justify-between">
        <div className="flex items-baseline">
            <div className="w-24">
                <Image 
                    src="/logo.svg"
                    alt="logo"
                    width={150} height={150}
                    priority
                />
            </div>

        {isMobile ? (<ChevronDown className="h-7 w-7 ml-1 " />) : ''}
        </div>
        <Button text="Sign Up"/>
    </header>
  )
}
