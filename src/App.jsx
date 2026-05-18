import { useState } from "react";
import LeadForm from "./components/LeadForm";
import LeadsDashboard from "./components/LeadsDashboard";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleLeadAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-800 text-white py-4 px-6 shadow">
        <h1 className="text-2xl font-bold">LeadFlow</h1>
        <p className="text-sm text-blue-200">Lead Management System</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8">
        <LeadForm onLeadAdded={handleLeadAdded} />
        <LeadsDashboard refresh={refresh} />
      </main>
    </div>
  );
}

export default App;