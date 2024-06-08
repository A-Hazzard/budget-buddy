import { Types, Income } from "@/types/dashboard"
import { Dispatch, useEffect, useRef, useState } from "react"
import AddItem from "./AddItem"


export default function IncomeTable({ income }: { income: Income[] }) {
    const [addIncome, setAddIncome] = useState<boolean>(false)

    const nameInputRef = useRef<HTMLInputElement>(null)
    const plannedInputRef = useRef<HTMLInputElement>(null)
    const spentInputRef = useRef<HTMLInputElement>(null)
    const tableRef = useRef<HTMLTableRowElement>(null)

    const plannedTotal: number = income.length > 0 ? income[0].types?.reduce((acc, types) => acc + (types.planned || 0), 0) || 0 : 0;
    const spentTotal: number = income.length > 0 ? income[0].types?.reduce((acc, types) => acc + (types.spent || 0), 0) || 0 : 0;
    const formatNumber = (num: number): string => num.toLocaleString('en-US');

    // const handleClickOutside = (event: MouseEvent) => {
    //   if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
    //     const nameValue = nameInputRef.current ? nameInputRef.current.value : "";
    //     const plannedValue = plannedInputRef.current ? plannedInputRef.current.value : "";
    //     const receivedValue = receivedInputRef.current ? receivedInputRef.current.value : "";

    //     setGroupTypes((prevGroupTypes) => [
    //       ...prevGroupTypes,
    //       {
    //         name: nameValue,
    //         planned: parseFloat(plannedValue.replace(/[^0-9.-]+/g, '')) || 0,
    //         received: parseFloat(receivedValue.replace(/[^0-9.-]+/g, '')) || 0,
    //       },
    //     ]);

    //     setAddIncome(false);
    //   }
    // };

    // useEffect(() => {
    //   document.addEventListener('click', handleClickOutside, true)
    //   return () => document.removeEventListener('click', handleClickOutside, true)
    // })
    console.log(income)
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

                    {income.length > 0 && income[0].types?.map((type, key) => (
                        <tr key={key}>
                            <td className="py-2 border-b">{type.name}</td>
                            <td className="py-2 border-b">${formatNumber(type.planned)}</td>
                            <td className="py-2 border-b">${formatNumber(type.spent)}</td>
                        </tr>
                    ))}
                    {/* {addIncome && (
                        <AddItem
                        tableRef={tableRef}
                        nameInputRef={nameInputRef}
                        plannedInputRef={plannedInputRef}
                        receivedInputRef={receivedInputRef}
                        defaultItem={item}
                        />
                    )}  */}

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
    )
}
