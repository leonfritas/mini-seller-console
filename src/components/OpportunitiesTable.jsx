export default function OpportunitiesTable({ opportunities, onUpdateStage }) {
  if (opportunities.length === 0) {
    return <p className="mt-6 text-gray-500 text-center italic">No opportunities yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-700 mb-4">Opportunities</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border border-gray-200 text-sm rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Stage</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Account</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp) => (
              <tr
                key={opp.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 border text-gray-600">{opp.id}</td>
                <td className="p-3 border font-medium">{opp.name}</td>
                <td className="p-3 border">
                  <select
                    value={opp.stage}
                    onChange={(e) => onUpdateStage(opp.id, e.target.value)}
                    className="p-2 border rounded-md text-sm bg-white focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>
                <td className="p-3 border text-gray-700">${opp.amount}</td>
                <td className="p-3 border">{opp.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
