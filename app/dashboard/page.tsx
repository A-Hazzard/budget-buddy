"use client"

import ImageWrapper from "@/components/ImageWrapper";
import Group from "@/components/dashboard/Group";
import { CloudDownload, PlusIcon, RotateCw } from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Page() {

    const [addGroup, setAddGroup] = useState<boolean>(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleAddGroup = () => {
        setAddGroup(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setAddGroup(false);
        }
    };

    useEffect(() => {
        const handleClickOutsideWindow = (event: MouseEvent) => {
            handleClickOutside(event);
        };

        window.addEventListener("click", handleClickOutsideWindow, true);

        return () => {
            window.removeEventListener("click", handleClickOutsideWindow, true);
        };
    }, []);



    const groups = [
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
    ];

    const paycheck =  [
        {
            name: 'Pay 1',
            planned: 900,
            received: 0,
        }
    ]
    const total = paycheck.reduce((acc, type) => acc + type.planned, 0);

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
                            
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold">
                                <td className="py-2 border-b">Total</td>
                                <td className="py-2 border-b">${formatNumber(total)}</td>
                                <td className="py-2 border-b">$0.00</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className="text-blue-500 mt-4 cursor-pointer">Add Income</div>
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
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Group Name"
                            className="w-full h-12 p-3 font-main border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                ) : (
                        <button 
                            ref={buttonRef}
                            onClick={handleAddGroup}
                            className="p-5 text-blue-600 text-lg font-semibold flex flex-start border border-dotted border-blue-400 rounded-lg">
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
    );
}
