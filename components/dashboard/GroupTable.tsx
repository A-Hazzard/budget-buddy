import { useEffect, useRef, useState } from "react"
import AddItem from "./AddItem"
import { doc, updateDoc, arrayUnion, getDoc, deleteDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Types } from "@/types/dashboard"
import { Trash2 } from "lucide-react"

export default function GroupTable(
  {
    groupId,
    key,
    title,
    types
  }: {
    groupId: string,
    key: number,
    title: string,
    types: Types[]
  }) {
  const [addIncome, setAddIncome] = useState<boolean>(false)
  const [editGroup, setEditGroup] = useState<boolean>(false)
  const [currentId, setCurrentId] = useState<number>(0)
  const [editBudgetItem, setBudgetItem] = useState<boolean>(false)
  const nameInputRef = useRef<HTMLInputElement>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
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
        const groupDocId = groupId
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
        const groupDocId = groupId
        const groupDocRef = doc(db, "budgetItem", groupDocId)
        replaceElement(types, currentId, newType)
        await updateDoc(groupDocRef, { types })
        console.log('Budget item updated with new type')
      } catch (e) {
        console.error("Error updating document: ", e)
      }
      setEditGroup(false)
    }
  }
  const closeEditBudgetItem = async (event: MouseEvent) => {
    if (editBudgetItem && titleInputRef.current && !titleInputRef.current.contains(event.target as Node)) {
      const titleValue = titleInputRef.current ? titleInputRef.current.value : ""
      console.log(titleValue, ' is title')
      try {
        const groupDocRef = doc(db, "budgetItem", groupId)
        await updateDoc(groupDocRef, { title: titleValue })
        console.log('Budget Title updated')
      } catch (e) {
        console.error("Error updating document: ", e)
      }
      setBudgetItem(false)
    }
  }

  const deleteBudgetItem = async () => {
    try {
        //@ts-ignore
        const documentRef = doc(db, 'budgetItem', groupId);
        await deleteDoc(documentRef);

      console.log('Group removed from array successfully!');
    } catch (error) {
      console.error('Error removing element from array: ', error);
    }
  };
  useEffect(() => {
    document.addEventListener('click', addItem, true)
    document.addEventListener('click', closeEditUI, true)
    document.addEventListener('click', closeEditBudgetItem, true)
    return () => {
      document.removeEventListener('click', addItem, true)
      document.removeEventListener('click', closeEditUI, true)
      document.removeEventListener('click', closeEditBudgetItem, true)
    }
  })

  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-4">
      <div className="mb-4"></div>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b-2 py-2">
              {editBudgetItem ? (
                <div className="flex gap-1 items-center">
                  <Trash2 
                    onClick={deleteBudgetItem} 
                    className="w-6 h-6 text-red-500 cursor-pointer" 
                  />

                  <input
                    type="text"
                    name="title"
                    id="name"
                    defaultValue={title}
                    className="w-[50%] p-2 font-main border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500"
                    ref={titleInputRef}
                  />
                </div>
              ) : (
                <>
                    <h2
                      onClick={() => setBudgetItem(true)}
                    className="text-sm text-left cursor-pointer font-semibold text-[#0088FE]">
                      {title}
                    </h2>
                </>
              
            )}
              
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
                  id={groupId}
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
