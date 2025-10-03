import { useEffect, useState } from "react";
import { Check, X, ArrowRight } from "lucide-react";

export default function LeadDetailPanel({ lead, onClose, onConvert }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    if (lead) {
      setEmail(lead.email || "");
      setStatus(lead.status || "New");
      setAmount(0);
      setError("");
      setSaving(false);
      setStatusOpen(false);
    }
  }, [lead]);

  if (!lead) return null;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

  const handleSave = () => {
    setError("");
    if (!isEmailValid) {
      setError("Invalid email format.");
      return;
    }
    const prev = { email: lead.email, status: lead.status };

    lead.email = email;
    lead.status = status;
    setSaving(true);

    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (!success) {
        lead.email = prev.email;
        lead.status = prev.status;
        setError("Failed to save. Changes were reverted.");
        setSaving(false);
        return;
      }
      setSaving(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex z-50">

      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative ml-auto w-full max-w-md h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-l-2xl shadow-2xl p-6 flex flex-col border-l border-gray-700">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-gray-100">{lead.name}</h2>
        <div className="text-sm text-gray-400 mb-2">
          <span className="font-medium text-gray-300">Company:</span> {lead.company}
        </div>
        <div className="text-sm text-gray-400 mb-6">
          <span className="font-medium text-gray-300">Score:</span> {lead.score}
        </div>

        <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          disabled={saving}
          onChange={(e) => setEmail(e.target.value)}
          className={`p-2 bg-gray-700 border rounded-lg w-full mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition text-gray-100 ${
            email && !isEmailValid ? "border-red-500" : "border-gray-600"
          }`}
          aria-invalid={email && !isEmailValid}
        />

        <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
        <div className="relative mb-3">
          <button
            type="button"
            onClick={() => setStatusOpen(!statusOpen)}
            disabled={saving}
            className="p-2 w-full bg-gray-700 border border-gray-600 rounded-lg text-gray-100 text-left hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
          >
            <span>{status}</span>

            <svg
              className={`w-4 h-4 ml-2 transition-transform ${
                statusOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {statusOpen && (
            <ul className="absolute mt-1 w-full bg-gray-800 border border-gray-600 rounded-md shadow-lg z-50">
              {["New", "Contacted", "Lost"].map((s) => (
                <li
                  key={s}
                  onClick={() => {
                    setStatus(s);
                    setStatusOpen(false);
                  }}
                  className={`px-4 py-2 hover:bg-gray-700 cursor-pointer ${
                    status === s ? "bg-gray-700 font-semibold" : ""
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <label className="block text-sm font-medium mb-1 text-gray-300">Amount (optional)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          disabled={saving}
          value={amount}
          onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
          className="p-2 bg-gray-700 border border-gray-600 rounded-lg w-full mb-4 text-gray-100 focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="mt-auto flex items-center justify-between gap-2">
          <button
            onClick={() =>
              onConvert({
                ...lead,
                email,                   
                status,                  
                suggestedAmount: amount, 
              })
            }
            disabled={saving}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 hover:scale-105 transition-transform"
          >
            <ArrowRight size={16} /> Convert
          </button>


          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 hover:scale-105 transition-transform disabled:opacity-60"
            >
              <Check size={16} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
