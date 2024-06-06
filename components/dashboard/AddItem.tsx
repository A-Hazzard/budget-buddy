import { RefObject } from "react"
import { item } from '@/types/dashboard'
export default function AddItem({
    tableRef,
    nameInputRef,
    plannedInputRef,
    receivedInputRef,
    defaultItem = [],
}: {
    tableRef: RefObject<HTMLTableRowElement>;
    nameInputRef: RefObject<HTMLInputElement>;
    plannedInputRef: RefObject<HTMLInputElement>;
    receivedInputRef: RefObject<HTMLInputElement>;
    defaultItem: item[];
}) {
  const defaultName = () => {
    if (defaultItem.length === 0) {
      return 'Item';
    } else {
      const prefix = defaultItem[0].name.includes('Item') ? 'Item' : 'Paycheck';
      return `${prefix} ${defaultItem.length + 1}`;
    }
  };
  console.log(defaultItem)
    return (
        <tr className="shadow-xl px-2" ref={tableRef}>
            <td className="p-2 border-b">
                <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={defaultName()}
                    className="w-full p-2 font-main border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500"
                    ref={nameInputRef}
                />
            </td>
            <td className="p-2 border-b">
                <input
                    type="text"
                    name="planned"
                    id="planned"
                    defaultValue="$0.00"
                    className="w-full p-2 border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500"
                    ref={plannedInputRef}
                />
            </td>
            <td className="p-2 border-b">
                <input
                    type="text"
                    name="received"
                    id="received"
                    defaultValue="$0.00"
                    className="w-full p-2 border-2 font-semibold rounded-md focus:bg-blue-200 text-blue-500"
                    ref={receivedInputRef}
                />
            </td>
        </tr>
    );
}
