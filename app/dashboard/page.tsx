"use client"

import ImageWrapper from "@/components/ImageWrapper"
import { CloudDownload, PlusIcon, RotateCw } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react"
import {  groups } from '@/types/dashboard'
import IncomeTable from "@/components/dashboard/IncomeTable"

export default function Page() {

    const [groups, setGroups] = useState<groups[]>([
        {
            title: 'Savings',
            types: [
                {
                    name: 'PC',
                    planned: 1000,
                    received: 0,
                },
                {
                    name: 'IPhone',
                    planned: 1500,
                    received: 0,
                },
                {
                    name: 'PC',
                    planned: 10000,
                    received: 0,
                },
            ],
        },
        {
            title: 'Church',
            types: [
                {
                    name: 'Community',
                    planned: 50,
                    received: 0,
                },
                {
                    name: 'Missions',
                    planned: 200,
                    received: 0,
                },
            ],
        },
    ])

    const [addGroup, setAddGroup] = useState<boolean>(false)
    const [newGroupTitle, setNewGroupTitle] = useState<string>("")


    const buttonRef = useRef<HTMLInputElement>(null)

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && newGroupTitle.trim() !== "") {
            const newGroup = {
                title: newGroupTitle,
                types: [],
            }

            setGroups([...groups, newGroup])
            setNewGroupTitle('')
        }
    }
    const handleClickOutside = (event: MouseEvent) => {
        buttonRef.current && !buttonRef.current.contains(event.target as Node) ? setAddGroup(false) : null
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [])



    return (
        <div>
            <header className="px-5 pb-3 sticky flex items-end top-0 z-50 w-full bg-white shadow-md">
                <div className="w-full">
                    <h1 className="text-left">June 2024</h1>
                    <p className="font-semibold">
                        $1,800.00 <span className="font-light">left to budget</span>
                    </p>
                </div>

                <Link href="/">
                    <ImageWrapper src="/logo.svg" alt="logo" />
                </Link>
            </header>

            <hr />

            <main className="px-5 flex flex-col gap-5">
                <ImageWrapper divClassName="mt-5 w-24 h-24" src="/dashboard/chart.png" alt="chart" />

                <IncomeTable />

                {/* {groups.map((group, key) => (
                    <div key={key}>
                        <Group
                            title={group.title}
                            types={group.types}
                        />
                    </div>
                ))} */}

                {addGroup ? (
                    <div className="p-5 shadow-md">
                        <input
                            ref={buttonRef}
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Group Name"
                            value={newGroupTitle}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewGroupTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full h-12 p-3 font-main border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />

                    </div>
                ) : (
                    <button
                        onClick={() => setAddGroup(true)}
                        className="p-5 text-blue-600 text-lg font-semibold flex flex-start border border-dotted border-blue-400 rounded-lg"
                    >
                        <PlusIcon /> ADD GROUP
                    </button>
                )}

                <div className="mx-auto flex flex-row items-center gap-2 mt-4">
                    <div className="flex flex-row text-blue-600 items-center gap-3">
                        <RotateCw /> <p className="text-base text-blue-600">Reset Budget</p>
                    </div>
                    <div className="flex flex-row text-blue-600 items-center gap-2">
                        <CloudDownload /> <p className="text-base text-blue-600">Download as CSV</p>
                    </div>
                </div>
            </main>
        </div>
    )
}
