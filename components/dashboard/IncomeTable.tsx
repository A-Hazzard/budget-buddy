'use client'
import { useEffect, useRef, useState } from "react";
import AddItem from "./AddItem";
import { collection, onSnapshot, query, updateDoc, where, doc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase";
import { Income } from "@/types/dashboard";

export default function IncomeTable({ userID }: { userID: string }) {
    const [income, setIncome] = useState<Income[]>([]);
    const [addIncome, setAddIncome] = useState<boolean>(false);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const plannedInputRef = useRef<HTMLInputElement>(null);
    const spentInputRef = useRef<HTMLInputElement>(null);
    const tableRef = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        if (!userID) {
            console.error("userID is undefined");
            return;
        }

        const q = query(collection(db, "income"), where("user_id", "==", userID));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log("Fetched income from Firestore:", docsList);
            setIncome(docsList as Income[]);
        });

        return () => unsubscribe();
    }, [userID]);

    const plannedTotal: number = income.reduce((acc, inc) =>
        acc + (inc.types?.reduce((innerAcc, type) => innerAcc + (type.planned || 0), 0) ?? 0)
        , 0);

    const spentTotal: number = income.reduce((acc, inc) =>
        acc + (inc.types?.reduce((innerAcc, type) => innerAcc + (type.spent || 0), 0) ?? 0)
        , 0);

    const formatNumber = (num: number): string => num.toLocaleString('en-US');

    const addItem = async (event: MouseEvent) => {
        if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
            const nameValue = nameInputRef.current ? nameInputRef.current.value : "";
            const plannedValue = plannedInputRef.current ? plannedInputRef.current.value : "";
            const spentValue = spentInputRef.current ? spentInputRef.current.value : "";

            const newType = {
                name: nameValue,
                planned: parseFloat(plannedValue.replace(/[^0-9.-]+/g, '')) || 0,
                spent: parseFloat(spentValue.replace(/[^0-9.-]+/g, '')) || 0,
            };

            try {
                // Assuming there's only one document per user, get the first document's ID
                if (income.length > 0) {
                    const incomeDocId = income[0].id;
                    //@ts-ignore
                    const incomeDocRef = doc(db, "income", incomeDocId);
                    await updateDoc(incomeDocRef, {
                        types: arrayUnion(newType)
                    });
                    console.log('Income type added');
                } else {
                    console.error("No income document found for the user");
                }
            } catch (e) {
                console.error("Error updating document: ", e);
            }

            setAddIncome(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', addItem, true);
        return () => document.removeEventListener('click', addItem, true);
    });

    console.log("Current income state:", income);

    return (
        <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-4">
            <div className="mb-4"></div>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="border-b-2 py-2">
                            <h2 className="text-sm text-left font-semibold text-green-600">Income</h2>
                        </th>
                        <th className="border-b-2 py-2">Planned</th>
                        <th className="border-b-2 py-2">Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {income.map((inc, incomeIndex) => (
                        inc.types?.map((type, typeIndex) => (
                            <tr key={`${incomeIndex}-${typeIndex}`}>
                                <td className="py-2 border-b">{type.name}</td>
                                <td className="py-2 border-b">${formatNumber(type.planned)}</td>
                                <td className="py-2 border-b">${formatNumber(type.spent)}</td>
                            </tr>
                        ))
                    ))}

                    {addIncome && (
                        <AddItem
                            tableRef={tableRef}
                            nameInputRef={nameInputRef}
                            plannedInputRef={plannedInputRef}
                            spentInputRef={spentInputRef}
                            defaultItem="Paycheck"
                        />
                    )}
                </tbody>
                <tfoot>
                    <tr className="font-semibold">
                        <td className="py-2 border-b">Total</td>
                        <td className="py-2 border-b">${formatNumber(plannedTotal)}</td>
                        <td className="py-2 border-b">${formatNumber(spentTotal)}</td>
                    </tr>
                </tfoot>
            </table>
            <p onClick={() => setAddIncome(true)} className="text-blue-500 mt-4 cursor-pointer">Add Item</p>
        </div>
    );
}
