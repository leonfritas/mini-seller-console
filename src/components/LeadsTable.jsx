import { useEffect, useState } from "react";

export default function LeadsTable({ onSelectLead }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // reset page whenever filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, sortDesc]);

  // restore filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("filters");
    if (saved) {
      const { searchTerm, statusFilter, sortDesc } = JSON.parse(saved);
      setSearchTerm(searchTerm || "");
      setStatusFilter(statusFilter || "");
      setSortDesc(sortDesc ?? true);
    }
  }, []);

  // save filters on change
  useEffect(() => {
    localStorage.setItem(
      "filters",
      JSON.stringify({ searchTerm, statusFilter, sortDesc })
    );
  }, [searchTerm, statusFilter, sortDesc]);

  // fetch leads
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

  // filter + sort
  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  // apply pagination AFTER filtering/sorting
  const paginatedLeads = filteredLeads.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/3 md:w-1/6"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Lost">Lost</option>
        </select>

        <button
          onClick={() => setSortDesc(!sortDesc)}
          className="p-2 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100"
        >
          Sort Score {sortDesc ? "↓" : "↑"}
        </button>
      </div>

      {/* Desktop: table */}
      <table className="hidden md:table w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Score</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLeads.map((lead) => (
            <tr
              key={lead.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectLead(lead)}
            >
              <td className="p-2 border">{lead.name}</td>
              <td className="p-2 border">{lead.company}</td>
              <td className="p-2 border">{lead.email}</td>
              <td className="p-2 border">{lead.score}</td>
              <td className="p-2 border">{lead.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile: cards */}
      <div className="space-y-2 md:hidden">
        {paginatedLeads.map((lead) => (
          <div
            key={lead.id}
            onClick={() => onSelectLead(lead)}
            className="p-4 border rounded shadow-sm bg-white cursor-pointer hover:bg-gray-50"
          >
            <p className="font-semibold">{lead.name}</p>
            <p className="text-sm text-gray-600">{lead.company}</p>
            <p className="text-xs">{lead.email}</p>
            <p className="text-xs font-bold">Score: {lead.score}</p>
            <p className="text-xs">Status: {lead.status}</p>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 hover:scale-105 transition-transform"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {page} / {Math.max(1, Math.ceil(filteredLeads.length / pageSize))}
        </span>
        <button
          disabled={page * pageSize >= filteredLeads.length}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-50 hover:scale-105 transition-transform"
        >
          Next
        </button>
      </div>

      {filteredLeads.length === 0 && (
        <p className="text-gray-500 mt-2">No results found.</p>
      )}
    </div>
  );
}
