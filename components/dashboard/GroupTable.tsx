import { useEffect, useRef, useState } from "react"
import AddItem from "./AddItem"
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Types } from "@/types/dashboard"

export default function GroupTable(
  {
    groupID,
    key,
    title,
    types
  }: {
    groupID: string,
    key: number,
    title: string,
    types: Types[]
  }) {
  const [addIncome, setAddIncome] = useState<boolean>(false)
  const [editGroup, setEditGroup] = useState<boolean>(false)
  const [currentId, setCurrentId] = useState<number>(0)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const plannedInputRef = useRef<HTMLInputElement>(null)
  const spentInputRef = useRef<HTMLInputElement>(null)
  const tableRef = useRef<HTMLTableRowElement>(null)

  const plannedTotal: number = types?.reduce((acc, type) => acc + type.planned, 0)
  const spentTotal: number = types?.reduce((acc, type) => acc + type.spent, 0)
  const formatNumber = (num: number): string => num.toLocaleString("en-US")

  const addItem = async (event: MouseEvent) => {
    if (!editGroup && tableRef.current && !tableRef.current.contains(event.target as Node)) {
      const nameValue = nameInputRef.current ? nameInputRef.current.value : ""
      const plannedValue = plannedInputRef.current ? plannedInputRef.current.value : ""
      const spentValue = spentInputRef.current ? spentInputRef.current.value : ""

      const newType = {
        name: nameValue,
        planned: parseFloat(plannedValue.replace(/[^0-9.-]+/g, "")) || 0,
        spent: parseFloat(spentValue.replace(/[^0-9.-]+/g, "")) || 0,
      }

      try {
        const groupDocId = groupID
        const groupDocRef = doc(db, "budgetItem", groupDocId)
        await updateDoc(groupDocRef, {
          types: [...(types || []), newType]
        })
        console.log('Budget item updated with new type')
      } catch (e) {
        console.error("Error updating document: ", e)
      }

      setAddIncome(false)
    }
  }

  function replaceElement(array: Array<Types>, index: number, newElement: Types) {
    // Check if the index is within the bounds of the array
    if (index > -1 && index < array.length) {
      array[index] = newElement
    } else {
      console.log('Index out of bounds')
    }
  }
  const closeEditUI = async (event: MouseEvent) => {
    if (editGroup && tableRef.current && !tableRef.current.contains(event.target as Node)) {
      const nameValue = nameInputRef.current ? nameInputRef.current.value : ""
      const plannedValue = plannedInputRef.current ? plannedInputRef.current.value : ""
      const spentValue = spentInputRef.current ? spentInputRef.current.value : ""

      const newType = {
        name: nameValue,
        planned: parseFloat(plannedValue.replace(/[^0-9.-]+/g, "")) || 0,
        spent: parseFloat(spentValue.replace(/[^0-9.-]+/g, "")) || 0,
      }

      try {
        const groupDocId = groupID
        const groupDocRef = doc(db, "budgetItem", groupDocId)
        replaceElement(types, currentId, newType)
        await updateDoc(groupDocRef, {types})
        console.log('Budget item updated with new type')
      } catch (e) {
        console.error("Error updating document: ", e)
      }
      setEditGroup(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', addItem, true)
    document.addEventListener('click', closeEditUI, true)
    return () => {
      document.removeEventListener('click', addItem, true)
      document.removeEventListener('click', closeEditUI, true)
    }
  })

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
            <th className="border-b-2 py-2">Spent</th>
          </tr>
        </thead>
        <tbody>
          {types?.map((type, key) => (
            editGroup && currentId === key ? (
              <>
                <AddItem
                  tableRef={tableRef}
                  nameInputRef={nameInputRef}
                  plannedInputRef={plannedInputRef}
                  spentInputRef={spentInputRef}
                  defaultItem="Item"
                  editable={true}
                  types={types}
                  name={types?.[key].name || 'Item'}
                  planned={types?.[key].planned || 0}
                  spent={types?.[key].spent || 0}
                  typeIndex={key}
                  id={groupID}
                />
              </>
            ) : (
              <tr
                onClick={() => {
                  setEditGroup(true)
                  setCurrentId(key)
                }}
                key={key}>
                <td className="py-2 border-b cursor-pointer">{type.name}</td>
                <td className="py-2 border-b cursor-pointer">${formatNumber(type.planned)}</td>
                <td className="py-2 border-b cursor-pointer">${formatNumber(type.spent)}</td>
              </tr>
            ))
          )
          }
          {addIncome && (
            <AddItem
              tableRef={tableRef}
              nameInputRef={nameInputRef}
              plannedInputRef={plannedInputRef}
              spentInputRef={spentInputRef}
              defaultItem="Item"
            />
          )}
        </tbody>
        <tfoot>
          <tr className="font-semibold">
            <td className="py-2 border-b cursor-pointer">Total</td>
            <td className="py-2 border-b cursor-pointer">${formatNumber(plannedTotal)}</td>
            <td className="py-2 border-b cursor-pointer">${formatNumber(spentTotal)}</td>
          </tr>
        </tfoot>
      </table>
      <p onClick={() => setAddIncome(true)} className="text-blue-500 mt-4 cursor-pointer">
        Add Item
      </p>
    </div>
  )
}
