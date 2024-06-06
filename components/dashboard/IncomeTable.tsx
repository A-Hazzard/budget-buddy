import { groups, item } from "@/types/dashboard"
import { KeyboardEvent, useEffect, useRef, useState } from "react"
import AddItem from "./AddItem"

export default function IncomeTable() {

    const [paycheck, setPayCheck] = useState<item[]>([
        {
            name: 'Paycheck 1',
            planned: 0,
            received: 0,
        }
    ])
    const [addIncome, setAddIncome] = useState<boolean>(false)
    const [newGroupTitle, setNewGroupTitle] = useState<string>("")


    const nameInputRef = useRef<HTMLInputElement>(null)
    const plannedInputRef = useRef<HTMLInputElement>(null)
    const receivedInputRef = useRef<HTMLInputElement>(null)
    const tableRef = useRef<HTMLTableRowElement>(null)

    const plannedTotal = paycheck.reduce((acc, type) => acc + type.planned, 0)
    const receivedTotal = paycheck.reduce((acc, type) => acc + type.received, 0)
    const formatNumber = (num: number) => num.toLocaleString('en-US')

  const handleClickOutside = (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        const nameValue = nameInputRef.current ? nameInputRef.current.value : "";
        const plannedValue = plannedInputRef.current ? plannedInputRef.current.value : "";
        const receivedValue = receivedInputRef.current ? receivedInputRef.current.value : "";

        setPayCheck((prevPayCheck) => [
            ...prevPayCheck,
            {
                name: nameValue,
                planned: parseFloat(plannedValue.replace(/[^0-9.-]+/g, '')) || 0,
                received: parseFloat(receivedValue.replace(/[^0-9.-]+/g, '')) || 0,
            },
        ]);

        setAddIncome(false);
    }
};

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [])

    return (
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
                            <td className="py-2 border-b">${formatNumber(check.received)}</td>
                        </tr>
                    ))}
                    {addIncome && (
                        <AddItem
                            tableRef={tableRef}
                            nameInputRef={nameInputRef}
                            plannedInputRef={plannedInputRef}
                            receivedInputRef={receivedInputRef}
                            defaultItem={paycheck}
                        />
                    )}

                </tbody>


                <tfoot>
                    <tr className="font-semibold">
                        <td className="py-2 border-b">Total</td>
                        <td className="py-2 border-b">${formatNumber(plannedTotal)}</td>
                        <td className="py-2 border-b">${formatNumber(receivedTotal)}</td>
                    </tr>
                </tfoot>
            </table>
            <p onClick={() => setAddIncome(true)} className="text-blue-500 mt-4 cursor-pointer">Add Income</p>
        </div>
  )
}
