import { Trash2 } from "lucide-react";
import { RefObject } from "react"
import { Types } from '@/types/dashboard'
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
export default function AddItem({
    tableRef,
    nameInputRef,
    plannedInputRef,
    spentInputRef,
    defaultItem,
    editable,
    types,
    name,
    typeIndex,
    planned,
    spent,
    id
}: {
    tableRef: RefObject<HTMLTableRowElement>;
    nameInputRef: RefObject<HTMLInputElement>;
    plannedInputRef: RefObject<HTMLInputElement>;
    spentInputRef: RefObject<HTMLInputElement>;
    defaultItem: string,
    editable?: boolean
    types?: Types[],
    name?: string,
    planned?: number,
    spent?: number,
    typeIndex?: number,
    id?: string
}) {

    const removeElementFromArray = async () => {
        try {
            if(defaultItem === "Paycheck"){
                //@ts-ignore
                const documentRef = doc(db, 'income', id); // Replace 'your_collection' with the actual collection name
                //@ts-ignore
                const newTypes = types?.splice(typeIndex, 1);
                // Update the document by removing the specified element from the array
                await updateDoc(documentRef, {
                    "types": types
                });
            }else{
                //@ts-ignore
                const documentRef = doc(db, 'budgetItem', id); // Replace 'your_collection' with the actual collection name
                //@ts-ignore
                const newTypes = types?.splice(typeIndex, 1);
                // Update the document by removing the specified element from the array
                await updateDoc(documentRef, {
                    "types": types
                });
            }

            console.log('Element removed from array successfully!');
        } catch (error) {
            console.error('Error removing element from array: ', error);
        }
    };
    console.log(types, 'is types')
    return (
        <tr className="shadow-xl px-2" ref={tableRef}>
            <td className={`p-2 border-b ${editable && 'flex gap-3 items-center'}`}>
                {editable && <Trash2 onClick={removeElementFromArray} className="w-6 h-6 text-red-500 cursor-pointer" />}
                <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={editable ? name : defaultItem}
                    className="w-full p-2 font-main border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500"
                    ref={nameInputRef}
                />
            </td>
            <td className="p-2 border-b">
                <input
                    type="text"
                    name="planned"
                    id="planned"
                    defaultValue={`$${planned || 0}`}
                    className="w-full p-2 border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500"
                    ref={plannedInputRef}
                />
            </td>
            <td className="p-2 border-b">
                <input
                    type="text"
                    name="spent"
                    id="spent"
                    defaultValue={`$${spent || 0}`}
                    className="w-full p-2 border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500"
                    ref={spentInputRef}
                />
            </td>
        </tr>
    );
}
