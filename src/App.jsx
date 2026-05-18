import { useState, useEffect } from "react";
import LeadForm from "./components/LeadForm";
import LeadsDashboard from "./components/LeadsDashboard";
import StatsBar from "./components/StatsBar";

function App() {
  const [refresh, setRefresh] = useState(0);
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:3000/leads");
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLeadAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    fetchLeads();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white py-4 px-6 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">⚡ LeadFlow</h1>
            <p className="text-sm text-blue-200">Lead Management System</p>
          </div>
          <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">
            {leads.length} Total Leads
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Stats Bar */}
        <StatsBar leads={leads} />

        {/* Form + Dashboard layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-80 shrink-0">
            <LeadForm onLeadAdded={handleLeadAdded} />
          </div>
          <div className="w-full">
            <LeadsDashboard refresh={refresh} onStatusChange={() => setRefresh((prev) => prev + 1)} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;