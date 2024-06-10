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
import { addDoc, collection, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore"
import { useRouter } from 'next/navigation'
import * as XLSX from 'xlsx'
import randomColor from 'randomcolor';
import ChatButton from "@/components/dashboard/ChatButton"

export default function Page() {
    const [groups, setGroups] = useState<Groups[]>([])
    const [income, setIncome] = useState<Income[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [totalIncomePlanned, setTotalIncomePlanned] = useState<number>(0);
    const [totalGroupsPlanned, setTotalGroupsPlanned] = useState<number>(0);
    const [availableBudget, setAvailableBudget] = useState<number>(0);
    const router = useRouter()

    const getRandomColor = () => {
        return randomColor({
            luminosity: 'bright',
            format: 'rgba',
            alpha: 0.8,
        });
    }; const incomeData = income.flatMap((incomeItem) =>
        incomeItem.types?.map((type) => ({ name: type.name, value: type.planned })) || []
    );

    const groupData = groups.map((group) => ({
        name: group.title,
        value: group.types?.reduce((sum, type) => sum + type.planned, 0) || 0,
    }));

    const data01 = [...incomeData, ...groupData];

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

    const generateExcelData = () => {
        const wb = XLSX.utils.book_new();
        const ws_data = [['Income', 'Planned', 'Spent']];

        income.forEach((incomeItem) => {
            incomeItem.types?.forEach((type) => {
                ws_data.push([type.name, formatNumber(type.planned), formatNumber(type.spent)]);
            });
        });

        const incomePlannedTotal = income.reduce((acc, incomeItem) => {
            const plannedAmount = incomeItem.types?.reduce((a, b) => a + b.planned, 0) || 0;
            return acc + plannedAmount;
        }, 0);
        const incomeSpentTotal = income.reduce((acc, incomeItem) => {
            const spentAmount = incomeItem.types?.reduce((a, b) => a + b.spent, 0) || 0;
            return acc + spentAmount;
        }, 0);
        ws_data.push(['Total', formatNumber(incomePlannedTotal), formatNumber(incomeSpentTotal)]);

        ws_data.push(['', '', '']);
        ws_data.push(['Groups', 'Planned', 'Spent']);

        groups.forEach((group) => {
            ws_data.push([`${group.title}`, '', '']);
            group.types?.forEach((type) => {
                ws_data.push([type.name, formatNumber(type.planned), formatNumber(type.spent)]);
            });
            const groupPlannedTotal = group.types?.reduce((acc, type) => acc + type.planned, 0) || 0;
            const groupSpentTotal = group.types?.reduce((acc, type) => acc + type.spent, 0) || 0;
            ws_data.push(['Total', formatNumber(groupPlannedTotal), formatNumber(groupSpentTotal)]);
            ws_data.push(['', '', '']);
        });

        const leftToBudget = totalIncomePlanned - totalGroupsPlanned;
        ws_data.push(['', '', '']);
        ws_data.push(['Left to Budget', formatNumber(leftToBudget), '']);

        const ws = XLSX.utils.aoa_to_sheet(ws_data);

        const boldStyle = { font: { bold: true } };

        // Apply bold style to specific cells
        const applyBoldStyle = (cell: string) => {
            if (!ws[cell]) {
                ws[cell] = { v: '' };  // Ensure the cell exists before setting its style
            }
            if (!ws[cell].s) {
                ws[cell].s = {};
            }
            ws[cell].s.font = boldStyle.font;
        }

        applyBoldStyle('A1');
        applyBoldStyle('B1');
        applyBoldStyle('C1');

        let rowIndex = 2;
        income.forEach((incomeItem) => {
            incomeItem.types?.forEach(() => {
                rowIndex++;
            });
        });

        applyBoldStyle(`A${rowIndex + 1}`);
        applyBoldStyle(`B${rowIndex + 1}`);
        applyBoldStyle(`C${rowIndex + 1}`);

        rowIndex += 3;

        applyBoldStyle(`A${rowIndex}`);
        applyBoldStyle(`B${rowIndex}`);
        applyBoldStyle(`C${rowIndex}`);

        rowIndex += 1;

        groups.forEach((group) => {
            applyBoldStyle(`A${rowIndex}`);
            rowIndex++;
            group.types?.forEach(() => {
                rowIndex++;
            });
            applyBoldStyle(`A${rowIndex}`);
            applyBoldStyle(`B${rowIndex}`);
            applyBoldStyle(`C${rowIndex}`);
            rowIndex += 2;
        });

        rowIndex += 2;

        applyBoldStyle(`A${rowIndex}`);
        applyBoldStyle(`B${rowIndex}`);

        XLSX.utils.book_append_sheet(wb, ws, 'Budget Data');
        XLSX.writeFile(wb, 'budget-data.xlsx');
    }

    const resetBudget = async () => {
        if (user) {
            try {
                // Query all budget items and income documents for the current user
                const budgetItemQuery = query(
                    collection(db, "budgetItem"),
                    where("user_id", "==", user.uid)
                );
                const incomeQuery = query(
                    collection(db, "income"),
                    where("user_id", "==", user.uid)
                );

                // Get all the documents from the queries
                const budgetItemDocs = await getDocs(budgetItemQuery);
                const incomeDocs = await getDocs(incomeQuery);

                // Update each document to reset the planned and spent fields
                const updatePromises: any = [];

                budgetItemDocs.forEach((doc) => {
                    const docRef = doc.ref;
                    const types = doc.data().types || [];
                    const updatedTypes = types.map((type: any) => ({ ...type, planned: 0, spent: 0 }));
                    const updatePromise = updateDoc(docRef, { types: updatedTypes });
                    updatePromises.push(updatePromise);
                });

                incomeDocs.forEach((doc) => {
                    const docRef = doc.ref;
                    const types = doc.data().types || [];
                    const updatedTypes = types.map((type: any) => ({ ...type, planned: 0, spent: 0 }));
                    const updatePromise = updateDoc(docRef, { types: updatedTypes });
                    updatePromises.push(updatePromise);
                });

                // Wait for all updates to complete
                await Promise.all(updatePromises);
                console.log("Budget reset successfully");
            } catch (error) {
                console.error("Error resetting budget:", error);
            }
        }
    };



    const formatNumber = (num: number): string => num.toLocaleString("en-US")

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

    useEffect(() => {
        // Calculate total income planned
        const incomePlanned = income.reduce((acc, curr) => {
            const plannedAmount = curr.types?.reduce((a, b) => a + b.planned, 0) || 0;
            return acc + plannedAmount;
        }, 0);
        setTotalIncomePlanned(incomePlanned);
        console.log(totalIncomePlanned, ' is total income planned')

        // Calculate total groups planned
        const groupsPlanned = groups.reduce((acc, curr) => {
            const plannedAmount = curr.types?.reduce((a, b) => a + b.planned, 0) || 0;
            return acc + plannedAmount;
        }, 0);
        setTotalGroupsPlanned(groupsPlanned);
        console.log(totalGroupsPlanned, ' is total group planned')


        // Calculate available budget
        const budget = incomePlanned - groupsPlanned;
        setAvailableBudget(budget);
    }, [groups, income, totalGroupsPlanned, totalIncomePlanned]);


    if (user) {
        return (
            <div>
                <header className="px-5 pb-3 sticky flex items-end top-0 z-50 w-full bg-white shadow-md">
                    <div className="w-full">
                        <button onClick={logOut}>Logout</button>
                        <h1 className="text-left">
                            {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h1>
                        <div className="flex gap-1">

                            <p className={`font-main font-semibold ${availableBudget < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                ${formatNumber(availableBudget)}
                            </p>
                            <p className="font-light">
                                left to budget
                            </p>
                        </div>
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
                                label
                            >
                                {data01.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getRandomColor()} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>



                    <IncomeTable userID={user.uid} />

                    {groups.map((group, key) => (
                        <div key={key}>
                            <GroupTable
                                groupId={group.id || ''}
                                key={key}
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
                        <div onClick={resetBudget} className="flex flex-row text-blue-600 items-center cursor-pointer gap-3">
                            <RotateCw /> <p className="text-base text-blue-600">Reset Budget</p>
                        </div>
                        <div onClick={generateExcelData} className="flex flex-row text-blue-600 items-center cursor-pointer gap-2">

                            <CloudDownload /> <p className="text-base text-blue-600">Download as CSV</p>
                        </div>
                    </div>

                    <ChatButton />
                </main>
            </div>
        )
    }
}
