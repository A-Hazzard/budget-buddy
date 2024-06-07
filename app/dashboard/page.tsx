"use client"

import Link from "next/link"
import ImageWrapper from "@/components/ImageWrapper"
import { CloudDownload, PlusIcon, RotateCw } from "lucide-react"
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react"
import { groups, types } from '@/types/dashboard'
import GroupTable from "@/components/dashboard/GroupTable"
import IncomeTable from "@/components/dashboard/IncomeTable"
import { auth } from '@/firebase'
//@ts-ignore
import { onAuthStateChanged, User } from 'firebase/auth'
import { useRouter } from 'next/navigation'
// import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'

export default function Page() {
    /*
        Group Title
        Group Type [
            {   
                name: string,
                planned: number,
                received: number
            }
        ]
    */
    const [groups, setGroups] = useState<groups[]>([]);
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter()
    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
    ];
    const data02 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const [addGroup, setAddGroup] = useState<boolean>(false);
    const [groupTypes, setGroupTypes] = useState<types[]>([]);

    const [newGroupTitle, setNewGroupTitle] = useState<string>('');

    const buttonRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && newGroupTitle.trim() !== '') {
            const newGroup = {
                title: newGroupTitle,
                types: [],
            };

            setGroups([...groups, newGroup]);
            setNewGroupTitle('');
        }
    };
    const handleClickOutside = (event: MouseEvent) => {
        buttonRef.current && !buttonRef.current.contains(event.target as Node) ? setAddGroup(false) : null;
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => document.removeEventListener('click', handleClickOutside, true);
    }, []);

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user: User) => {
            if(user){
                setUser(user)
            }else{
                setUser(null)
                router.push('/login')
            }
        })

        //Clean up subscription on unmount
        return ()=> unsubscribe()
    }, [router])

    //If user is logged in, display dashboard
    if(user){
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
                        <ImageWrapper src="/logo.svg" alt="logo" priority />
                    </Link>
                </header>

                <hr />

                <main className="px-5 flex flex-col gap-5">
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={data01}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                            >
                                {data01.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Pie
                                data={data02}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={100}
                                outerRadius={120}
                                fill="#82ca9d"
                                label
                            >
                                {data02.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>

                        </PieChart>
                    </ResponsiveContainer>

                    <IncomeTable />

                    {groups.map((group, key) => (
                        <div key={key}>
                            <GroupTable title={group.title} types={groupTypes} setTypes={setGroupTypes} />
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
        );
    }
}
