import { useEffect, useState } from "react";
import { Check, X, ArrowRight } from "lucide-react"; // (requires: npm i lucide-react)

export default function LeadDetailPanel({ lead, onClose, onConvert }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (lead) {
      setEmail(lead.email || "");
      setStatus(lead.status || "New");
      setAmount(0);
      setError("");
      setSaving(false);
    }
  }, [lead]);

  if (!lead) return null;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

  // Optimistic SAVE (email + status) with rollback
  const handleSave = () => {
    setError("");
    if (!isEmailValid) {
      setError("Invalid email format.");
      return;
    }
    // backup current values
    const prev = { email: lead.email, status: lead.status };

    // optimistic update (mutate selected lead object)
    lead.email = email;
    lead.status = status;
    setSaving(true);

    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate
      if (!success) {
        // rollback
        lead.email = prev.email;
        lead.status = prev.status;
        setError("Failed to save. Changes were reverted.");
        setSaving(false);
        return;
      }
      setSaving(false);
      onClose(); // close on success
    }, 1000);
  };

  return (
    <div className="fixed inset-0 flex">
      {/* Overlay with click-to-close */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Slide-over panel */}
      <div className="relative ml-auto w-full max-w-md h-full bg-white rounded-l-2xl shadow-xl p-6 flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">{lead.name}</h2>
        <div className="text-sm text-gray-600 mb-2">
          <span className="font-medium">Company:</span> {lead.company}
        </div>
        <div className="text-sm text-gray-600 mb-6">
          <span className="font-medium">Score:</span> {lead.score}
        </div>

        {/* Email */}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          disabled={saving}
          onChange={(e) => setEmail(e.target.value)}
          className={`p-2 border rounded w-full mb-3 ${
            email && !isEmailValid ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={email && !isEmailValid}
        />

        {/* Status */}
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          disabled={saving}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full mb-3"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Lost">Lost</option>
        </select>

        {/* Optional amount to suggest a deal size when converting */}
        <label className="block text-sm font-medium mb-1">Amount (optional)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          disabled={saving}
          value={amount}
          onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
          className="p-2 border border-gray-300 rounded w-full mb-4"
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <div className="mt-auto flex items-center justify-between gap-2">
          {/* Convert uses your existing optimistic flow in App.jsx */}
          <button
            onClick={() =>
              onConvert({ ...lead, suggestedAmount: amount }) // pass amount hint if you want
            }
            disabled={saving}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700 hover:scale-105 transition-transform"
          >
            <ArrowRight size={16} /> Convert
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 hover:scale-105 transition-transform"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 hover:scale-105 transition-transform disabled:opacity-60"
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
