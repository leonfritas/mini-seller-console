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
      stage: lead.status || "New",   // agora pega o status que veio do painel
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Título principal */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r text-gray-100 bg-clip-text drop-shadow-lg">
          Mini Seller Console
        </h1>

        {/* Leads */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Leads</h2>
          <LeadsTable onSelectLead={setSelectedLead} />
        </div>

        {/* Detail Panel */}
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onConvert={handleConvert}
        />

        {/* Opportunities */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Opportunities</h2>
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
