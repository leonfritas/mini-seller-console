import { useEffect, useState } from "react";

export default function LeadsTable({ onSelectLead }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pageSize = 10;

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, sortDesc]);

  useEffect(() => {
    const saved = localStorage.getItem("filters");
    if (saved) {
      const { searchTerm, statusFilter, sortDesc } = JSON.parse(saved);
      setSearchTerm(searchTerm || "");
      setStatusFilter(statusFilter || "");
      setSortDesc(sortDesc ?? true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "filters",
      JSON.stringify({ searchTerm, statusFilter, sortDesc })
    );
  }, [searchTerm, statusFilter, sortDesc]);

  useEffect(() => {
    fetch("/leads.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load leads. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Loading leads...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (leads.length === 0) return <p>No leads found.</p>;


  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));


  const paginatedLeads = filteredLeads.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>

      <form
        className="mb-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex relative gap-2">

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="shrink-0 z-10 inline-flex items-center justify-between px-4 h-11 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              {statusFilter || "All Status"}
              <svg
                className="w-3 h-3 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-12 left-0 z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  {["", "New", "Contacted", "Lost"].map((status) => (
                    <li key={status}>
                      <button
                        type="button"
                        onClick={() => {
                          setStatusFilter(status);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {status || "All Status"}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative w-full">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="search-dropdown"
              className="block w-full h-11 px-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Search by name or company..."
            />
          </div>

          <button
            type="button"
            onClick={() => setSortDesc(!sortDesc)}
            className="h-11 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          >
            Sort {sortDesc ? "↓" : "↑"}
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden md:block">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Company</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Score</th>
              <th scope="col" className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLeads.map((lead, idx) => (
              <tr
                key={lead.id}
                className={`cursor-pointer border-b dark:border-gray-700 ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                } hover:bg-blue-100 dark:hover:bg-gray-700`}
                onClick={() => onSelectLead(lead)}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {lead.name}
                </th>
                <td className="px-6 py-4">{lead.company}</td>
                <td className="px-6 py-4">{lead.email}</td>
                <td
                  className={`px-6 py-4 font-bold ${
                    lead.score >= 80
                      ? "text-green-600"
                      : lead.score >= 60
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {lead.score}
                </td>
                <td className="px-6 py-4">{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 md:hidden">
        {paginatedLeads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => onSelectLead(lead)}
            className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 
                      border border-gray-700 cursor-pointer hover:scale-[1.02] 
                      hover:shadow-xl transition-transform"
          >
            <p className="text-lg font-semibold text-gray-100">{lead.name}</p>

            <p className="text-sm text-gray-400">{lead.company}</p>

            <p className="text-xs text-gray-500 italic">{lead.email}</p>

            <p
              className={`mt-2 text-sm font-bold ${
                lead.score >= 80
                  ? "text-green-400"
                  : lead.score >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }`}
            >
              Score: {lead.score}
            </p>

            <span
              className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium ${
                lead.status === "New"
                  ? "bg-blue-600/20 text-blue-400"
                  : lead.status === "Contacted"
                  ? "bg-yellow-600/20 text-yellow-400"
                  : lead.status === "Lost"
                  ? "bg-red-600/20 text-red-400"
                  : "bg-gray-600/20 text-gray-300"
              }`}
            >
              {lead.status || "—"}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} / {Math.max(1, Math.ceil(filteredLeads.length / pageSize))}
        </span>
        <button
          disabled={page * pageSize >= filteredLeads.length}
          onClick={() => setPage((p) => p + 1)}
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Next
        </button>

      </div>
    </div>
  );
}
