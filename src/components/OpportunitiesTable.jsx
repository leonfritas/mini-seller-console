export default function OpportunitiesTable({ opportunities, onUpdateStage }) {
  if (opportunities.length === 0) {
    return (
      <p className="mt-6 text-gray-500 text-center italic">
        No opportunities yet.
      </p>
    );
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Stage</th>
              <th scope="col" className="px-6 py-3">Amount</th>
              <th scope="col" className="px-6 py-3">Account</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opp, idx) => (
              <tr
                key={opp.id}
                className={`border-b dark:border-gray-700 ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                } hover:bg-blue-50 dark:hover:bg-gray-700 transition`}
              >
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{opp.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {opp.name}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={opp.stage}
                    onChange={(e) => onUpdateStage(opp.id, e.target.value)}
                    className="p-2 border border-gray-300 rounded-md text-sm bg-white dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>

                </td>
                <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200">
                  ${opp.amount}
                </td>
                <td className="px-6 py-4">{opp.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
