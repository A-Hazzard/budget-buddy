import { CloudDownload, PlusIcon, RotateCw } from "lucide-react";

export default function page() {
    return (
        <div>
            <header className="p-5 sticky flex top-0 z-50 w-full bg-white shadow-md">
                <div className="w-full">
                    <h1 className="text-left">June 2024</h1>
                    <p className="font-semibold">$1,800.00 <span className="font-light">left to budget</span></p> 
                </div>
            </header>

                <hr />

                <main className="px-5 flex flex-col gap-5">

                    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="border-b-2 py-2"><h2 className="text-sm text-left font-semibold text-green-600">Income for June</h2></th>
                                    <th className="border-b-2 py-2">Planned</th>
                                    <th className="border-b-2 py-2">Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 border-b">Paycheck 1</td>
                                    <td className="py-2 border-b">$900.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                                <tr>
                                    <td className="py-2 border-b">Paycheck 2</td>
                                    <td className="py-2 border-b">$1,500.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="font-semibold">
                                    <td className="py-2 border-b">Total</td>
                                    <td className="py-2 border-b">$2,400.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="text-blue-500 mt-4 cursor-pointer">Add Income</div>
                    </div>

                    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="border-b-2 py-2"><h2 className="text-sm text-left font-semibold text-green-600">Savings</h2></th>
                                    <th className="border-b-2 py-2">Planned</th>
                                    <th className="border-b-2 py-2">Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 border-b">Paycheck 1</td>
                                    <td className="py-2 border-b">$900.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                                <tr>
                                    <td className="py-2 border-b">Paycheck 2</td>
                                    <td className="py-2 border-b">$1,500.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="font-semibold">
                                    <td className="py-2 border-b">Total</td>
                                    <td className="py-2 border-b">$2,400.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="text-blue-500 mt-4 cursor-pointer">Add Income</div>
                    </div>

                    <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded-lg p-4">
                        <div className="mb-4">
                        </div>
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="border-b-2 py-2"><h2 className="text-sm text-left font-semibold text-green-600">Gaming</h2></th>
                                    <th className="border-b-2 py-2">Planned</th>
                                    <th className="border-b-2 py-2">Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 border-b">Paycheck 1</td>
                                    <td className="py-2 border-b">$900.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                                <tr>
                                    <td className="py-2 border-b">Paycheck 2</td>
                                    <td className="py-2 border-b">$1,500.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr className="font-semibold">
                                    <td className="py-2 border-b">Total</td>
                                    <td className="py-2 border-b">$2,400.00</td>
                                    <td className="py-2 border-b">$0.00</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="text-blue-500 mt-4 cursor-pointer">Add Income</div>
                    </div>

                    <button className="p-5 text-blue-600 text-lg font-semibold flex flex-start border border-dotted border-blue-400 rounded-lg">
                        <PlusIcon /> ADD GROUP
                    </button>

                    <div className="flex flex-row items-center gap-2  mt-4">
                        <div className="flex flex-row text-blue-600 items-center gap-3">
                            <RotateCw /> <p className="text-base text-blue-600">Reset Budget</p>
                        </div>

                        <div className="flex flex-row text-blue-600 items-center gap-2">
                            <CloudDownload /> <p className="text-base text-blue-600">Download as CSV</p>
                        </div>
                    </div>

                </main>
        </div>
    )
}
