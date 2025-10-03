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
      {/* TABELA - visível apenas no desktop */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden md:block">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Stage</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Account</th>
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
                <td className="px-6 py-4">{opp.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {opp.name}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={opp.stage}
                    onChange={(e) => onUpdateStage(opp.id, e.target.value)}
                    className="p-2 border rounded-md text-sm bg-white dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-400"
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

      {/* CARDS - visíveis apenas no mobile */}
      <div className="grid gap-4 md:hidden">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <p className="text-sm text-gray-500">ID: {opp.id}</p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {opp.name}
            </h3>
            <div className="mt-2">
              <label className="block text-sm text-gray-500">Stage</label>
              <select
                value={opp.stage}
                onChange={(e) => onUpdateStage(opp.id, e.target.value)}
                className="mt-1 w-full p-2 border rounded-md text-sm bg-white dark:bg-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-400"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <p className="mt-2 font-medium text-gray-700 dark:text-gray-200">
              Amount: ${opp.amount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Account: {opp.accountName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
