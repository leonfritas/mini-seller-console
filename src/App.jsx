import { useState } from "react";
import LeadsTable from "./components/LeadsTable";
import LeadDetailPanel from "./components/LeadDetailPanel";
import OpportunitiesTable from "./components/OpportunitiesTable";

function App() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [opportunities, setOpportunities] = useState([]);

  const handleUpdateStage = (id, newStage) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, stage: newStage } : opp))
    );
  };

  const handleConvert = (lead) => {
    const newOpportunity = {
      id: Date.now(),
      name: lead.name,
      stage: "New",
      amount: lead.suggestedAmount || 0,
      accountName: lead.company,
    };

    setOpportunities((prev) => [...prev, newOpportunity]);
    setSelectedLead(null);

    setTimeout(() => {
      const success = Math.random() > 0.2;
      if (!success) {
        setOpportunities((prev) =>
          prev.filter((opp) => opp.id !== newOpportunity.id)
        );
        alert("❌ Failed to save opportunity. Rolled back.");
      } else {
        console.log("✅ Opportunity saved successfully!");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
          Mini Seller Console
        </h1>

        {/* Leads */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Leads</h2>
          <LeadsTable onSelectLead={setSelectedLead} />
        </div>

        {/* Detail Panel */}
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onConvert={handleConvert}
        />

        {/* Opportunities */}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-purple-100 p-6">

          <OpportunitiesTable
            opportunities={opportunities}
            onUpdateStage={handleUpdateStage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
