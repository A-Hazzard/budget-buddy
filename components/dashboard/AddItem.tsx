"use client"

import { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, RefObject } from "react"
import { paycheck } from '@/types/dashboard'
export default function AddItem(
    {
        tableRef, 
        nameInputRef, 
        plannedInputRef, 
        receivedInputRef, 
        paycheck
    }:
    {
        tableRef: RefObject<HTMLTableRowElement>, 
        nameInputRef: RefObject<HTMLInputElement>, 
        plannedInputRef: RefObject<HTMLInputElement>, 
        receivedInputRef: RefObject<HTMLInputElement>,
        paycheck: paycheck[]
    }){
    return (
        <tr className="shadow-xl px-2" ref={tableRef}>
            <td className="p-2 border-b">
                <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={`Paycheck ${paycheck.length + 1}`}
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
    )
}