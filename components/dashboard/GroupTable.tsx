import { types, item } from "@/types/dashboard"
import { Dispatch, useEffect, useRef, useState } from "react"
import AddItem from "./AddItem"


export default function GroupTable({
  title, types, setTypes
}: {
  title: string, types: types[],
  setTypes: Dispatch<React.SetStateAction<types[]>>;

}) {

  const [item, setItem] = useState<item[]>([]);
  const [groupTypes, setGroupTypes] = useState<types[]>(types);

  const [addIncome, setAddIncome] = useState<boolean>(false)
  const [groupTotal, setGroupTotal] = useState(0);

  useEffect(() => {
    const total = groupTypes.reduce((acc, type) => acc + type.received, 0);
    setGroupTotal(total);
  }, [groupTypes]);

  const nameInputRef = useRef<HTMLInputElement>(null)
  const plannedInputRef = useRef<HTMLInputElement>(null)
  const receivedInputRef = useRef<HTMLInputElement>(null)
  const tableRef = useRef<HTMLTableRowElement>(null)

  const plannedTotal = groupTypes.reduce((acc, groupTypes) => acc + groupTypes.planned, 0)
  const receivedTotal = groupTypes.reduce((acc, groupTypes) => acc + groupTypes.received, 0)
  const formatNumber = (num: number) => num.toLocaleString('en-US')

  const handleClickOutside = (event: MouseEvent) => {
    if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
      const nameValue = nameInputRef.current ? nameInputRef.current.value : "";
      const plannedValue = plannedInputRef.current ? plannedInputRef.current.value : "";
      const receivedValue = receivedInputRef.current ? receivedInputRef.current.value : "";

      setGroupTypes((prevGroupTypes) => [
        ...prevGroupTypes,
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
  })
  useEffect(() => {
    console.log(groupTypes)
  }, [groupTypes])

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-4">
      <div className="mb-4"></div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b-2 py-2">
              <h2 className="text-sm text-left font-semibold text-green-600">{title}</h2>
            </th>
            <th className="border-b-2 py-2">Planned</th>
            <th className="border-b-2 py-2">Received</th>
          </tr>
        </thead>
        <tbody>

          {groupTypes.map((type, key) => (
            <tr key={key}>
              <td className="py-2 border-b">{type.name}</td>
              <td className="py-2 border-b">${formatNumber(type.planned)}</td>
              <td className="py-2 border-b">${formatNumber(type.received)}</td>
            </tr>
          ))}
          {addIncome && (
            <AddItem
              tableRef={tableRef}
              nameInputRef={nameInputRef}
              plannedInputRef={plannedInputRef}
              receivedInputRef={receivedInputRef}
              defaultItem={item}
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
      <p onClick={() => setAddIncome(true)} className="text-blue-500 mt-4 cursor-pointer">Add Item</p>
    </div>
  )
}
