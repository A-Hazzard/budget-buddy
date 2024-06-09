"use client"

import Link from "next/link"
import { CloudDownload, PlusIcon, RotateCw } from "lucide-react"
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'
import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react"
import { Groups, Income } from '@/types/dashboard'
import ImageWrapper from "@/components/ImageWrapper"
import GroupTable from "@/components/dashboard/GroupTable"
import IncomeTable from "@/components/dashboard/IncomeTable"
//@ts-ignore
import { auth, db } from '@/firebase'
import { FirebaseError } from "firebase/app"
import { onAuthStateChanged, User } from 'firebase/auth'
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useRouter } from 'next/navigation'

export default function Page() {
    const [groups, setGroups] = useState<Groups[]>([])
    const [income, setIncome] = useState<Income[]>([])
    const [user, setUser] = useState<User | null>(null)

    const router = useRouter()
    const data01 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
    ]
    const data02 = [
        { name: 'A1', value: 100 },
        { name: 'A2', value: 300 },
    ]
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

    const [addGroup, setAddGroup] = useState<boolean>(false)

    const [newGroupTitle, setNewGroupTitle] = useState<string>('')

    const buttonRef = useRef<HTMLInputElement>(null)

    //Create new empty group with inputted title when user presses the enter key
    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && newGroupTitle.trim() !== '') {


            const groupData: Groups = {
                title: newGroupTitle,
                types: [],
                user_id: auth.currentUser?.uid,
            }


            // Add the document to a collection
            try {
                const addBudgetItem = await addDoc(collection(db, 'budgetItem'), groupData)
                console.log('Document written')
            } catch (e) {
                console.error('Error adding document: ', e)
            } finally {
                setAddGroup(false)
                setNewGroupTitle('')
            }

        }
    }

    //Remove the add groups input field when user clicks anywhere besides the input field
    const handleClickOutside = (event: MouseEvent) => buttonRef.current && !buttonRef.current.contains(event.target as Node) ? setAddGroup(false) : null

    const logOut = async () => {
        await auth.signOut()
        router.push('/login')
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {

            const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
                if (user) {
                    setUser(user)
                } else {
                    setUser(null)
                    router.push('/login')
                }
            })

            // Subscribe to Firebase Auth state changes
            const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log(`${user.email}'s user ID is '${user.uid}'`)
                    // Query Firestore for budget items where user_id matches the current user's UID
                    const budgetQuery = query(collection(db, 'budgetItem'), where('user_id', '==', user.uid))
                    const incomeQuery = query(collection(db, 'income'), where('user_id', '==', user.uid))
                    // Subscribe to Firestore query snapshot changes
                    const unsubscribeBudget = onSnapshot(budgetQuery, (querySnapshot) => {
                        // Map query snapshot documents to an array of objects
                        const docsList = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                        // Update the budgetItems state with the fetched documents
                        setGroups(docsList as Groups[])
                    },
                        (error: FirebaseError) => console.error(`Error fetching documents: ${error.code}`)
                    )

                    const unsubscribeIncome = onSnapshot(incomeQuery, (querySnapshot) => {
                        // Map query snapshot documents to an array of objects
                        const docsList = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                        // Update the Income state with the fetched documents
                        setIncome(docsList as Income[])
                    },
                        (error: FirebaseError) => console.error(`Error fetching documents: ${error.code}`)
                    )

                    // Cleanup Firestore subscription when the component unmounts
                    return () => unsubscribeIncome()
                } else {
                    // Handle case when user is not authenticated
                }
            })

            //Clean up sub & unsubscribe on unmount
            return () => {
                unsubscribeAuth()
                unsubscribe()
            }
        }
    }, [router])


    if (user) {
        return (
            <div>
                <header className="px-5 pb-3 sticky flex items-end top-0 z-50 w-full bg-white shadow-md">
                    <div className="w-full">
                        <button onClick={logOut}>Logout</button>
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

                    <IncomeTable userID={user.uid} />

                    {groups.map((group, key) => (
                        <div key={key}>
                            <GroupTable
                                groupID={group.id || ''}
                                title={group.title}
                                types={group.types ?? []}
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
}
