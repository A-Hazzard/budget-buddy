"use client"

import ImageWrapper from "@/components/ImageWrapper"
import Group from "@/components/dashboard/Group"
import { CloudDownload, PlusIcon, RotateCw } from "lucide-react"
import Link from "next/link"
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react"

type paycheck = {
    name: string,
    planned: number,
    received: number
}

type groups = {
    title: string,
    types: {
        name: string
        planned: number
        received: number
    }[]
}

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
    const [paycheck, setPayCheck] = useState<paycheck[]>([
        {
            name: 'Paycheck 1',
            planned: 0,
            received: 0,
        }
    ])
    const [addGroup, setAddGroup] = useState<boolean>(false)
    const [addIncome, setAddIncome] = useState<boolean>(false)
    const [newGroupError, setNewGroupError] = useState<string>("")
    const [newGroupTitle, setNewGroupTitle] = useState<string>("")

    const buttonRef = useRef<HTMLInputElement>(null)
    const tableRef = useRef<HTMLTableRowElement>(null)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setNewGroupTitle(event.target.value)

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
    const handleAddGroup = () => setAddGroup(true)

    const handleClickOutside = (event: MouseEvent) => {
        buttonRef.current && !buttonRef.current.contains(event.target as Node) ? setAddGroup(false) : null
        tableRef.current && !tableRef.current.contains(event.target as Node) ? setAddIncome(false) : null
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)

        return () => document.removeEventListener('click', handleClickOutside, true)

    }, [])

    const total = paycheck.reduce((acc, type) => acc + type.planned, 0)

    const formatNumber = (num: number) => num.toLocaleString('en-US')

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

                <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-4">
                    <div className="mb-4"></div>
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="border-b-2 py-2">
                                    <h2 className="text-sm text-left font-semibold text-green-600">Income for June</h2>
                                </th>
                                <th className="border-b-2 py-2">Planned</th>
                                <th className="border-b-2 py-2">Received</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paycheck.map((check, key) => (
                                <tr key={key}>
                                    <td className="py-2 border-b">{check.name}</td>
                                    <td className="py-2 border-b">${formatNumber(check.planned)}</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                            ))}
                            {addIncome && (
                                <tr className="shadow-xl px-2" ref={tableRef}>
                                    <td className="p-2 border-b">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            defaultValue="Paycheck"
                                            className="w-full p-2 font-main border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500"
                                        />

                                    </td>
                                    <td className="p-2 border-b">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="$0.00"
                                            className="w-full p-2 border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500" />
                                    </td>
                                    <td className="p-2 border-b">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            placeholder="$0.00"
                                            className="w-full p-2 border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500" />
                                    </td>
                                </tr>
                            )}

                        </tbody>


                        <tfoot>
                            <tr className="font">
                                <td className="py-2 border-b">Total</td>
                                <td className="py-2 border-b">${formatNumber(total)}</td>
                                <td className="py-2 border-b">$0.00</td>
                            </tr>
                        </tfoot>
                    </table>
                    <p onClick={() => setAddIncome(true)} className="text-blue-500 mt-4 cursor-pointer">Add Income</p>
                </div>

                {groups.map((group, key) => (
                    <div key={key}>
                        <Group
                            title={group.title}
                            types={group.types}
                        />
                    </div>
                ))}

                {addGroup ? (
                    <div className="p-5 shadow-md">
                        <input
                            ref={buttonRef}
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Group Name"
                            value={newGroupTitle}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="w-full h-12 p-3 font-main border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                ) : (
                    <button
                        onClick={handleAddGroup}
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
