type types = {
    name: string,
    planned: number,
    received: number
}

export default function Group({ title, types }: { title: string; types: types[] }) {
    const total = types.reduce((acc, type) => acc + type.planned, 0);

    const formatNumber = (num: number) => {
        return num.toLocaleString('en-US');
    }

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
            
            {types.map((type, key) => (
                <tr key={key}>
                    <td className="py-2 border-b">{type.name}</td>
                    <td className="py-2 border-b">${type.planned}</td>
                    <td className="py-2 border-b">${type.received}</td>
                </tr>
            ))}
        </tbody>
        <tfoot>
            <tr className="font-semibold">
                <td className="py-2 border-b">Total</td>
                <td className="py-2 border-b">${formatNumber(total)}</td>
                <td className="py-2 border-b">$0.00</td>
            </tr>
        </tfoot>
      </table>
      <div className="text-blue-500 mt-4 cursor-pointer">Add Item</div>
    </div>
  );
}
