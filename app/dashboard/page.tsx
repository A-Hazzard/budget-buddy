import ImageWrapper from "@/components/ImageWrapper";
import Group from "@/components/dashboard/Group";
import { CloudDownload, PlusIcon, RotateCw } from "lucide-react";
import Link from "next/link";

export default function page() {
    const groups = [
        {
            title: 'Savings',
            types: [
                {
                    name: 'PC',
                    planned: 1000,
                    received: 0,
                },
                {
                    name: 'IPhone',
                    planned: 1500,
                    received: 0,
                },
                {
                    name: 'PC',
                    planned: 10000,
                    received: 0,
                },
            ],
        },
        {
            title: 'Church',
            types: [
                {
                    name: 'Community',
                    planned: 50,
                    received: 0,
                },
                {
                    name: 'Missions',
                    planned: 200,
                    received: 0,
                },
            ],
        },
    ];

    return (
        <div>
            <header className="px-5 pb-3 sticky flex items-end top-0 z-50 w-full bg-white shadow-md">
                <div className="w-full">
                    <h1 className="text-left">June 2024</h1>
                    <p className="font-semibold">
                        $1,800.00 <span className="font-light">left to budget</span>
                    </p>
                </div>

                <Link href="/">
                    <ImageWrapper src="/logo.svg" alt="logo" />
                </Link>
            </header>

            <hr />

            <main className="px-5 flex flex-col gap-5">
                <ImageWrapper divClassName="mt-5 w-24 h-24" src="/dashboard/chart.png" alt="chart" />

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

                {groups.map((group, key) => (
                    <div key={key}>
                        <Group
                            title={group.title}
                            types={group.types}
                        />
                    </div>
                ))}
            </main>
        </div>
    );
}
