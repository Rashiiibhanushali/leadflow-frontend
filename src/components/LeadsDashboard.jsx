import { useState, useEffect } from "react";

const STATUSES = ["All", "New", "Contacted", "Qualified", "Closed"];
const UPDATE_STATUSES = ["New", "Contacted", "Qualified", "Closed"];

const STATUS_COLORS = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Qualified: "bg-green-100 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
};

function LeadsDashboard({ refresh }) {
  const [leads, setLeads] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchLeads = async (status) => {
    setLoading(true);
    try {
      const url =
        status && status !== "All"
          ? `http://localhost:3000/leads?status=${status}`
          : `http://localhost:3000/leads`;

      const res = await fetch(url);
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:3000/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update locally without refetching
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === id ? { ...lead, status: newStatus } : lead
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchLeads(activeFilter);
  }, [activeFilter, refresh]);

  return (
    <div className="bg-white rounded-2xl shadow w-full">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-800">All Leads</h2>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                activeFilter === s
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading leads...</p>
        ) : leads.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No leads found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Source</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {lead.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.email}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {lead.phone || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {lead.source || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={lead.status}
                      disabled={updatingId === lead.id}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        STATUS_COLORS[lead.status] || "bg-gray-100 text-gray-600"
                      } ${updatingId === lead.id ? "opacity-50" : ""}`}
                    >
                      {UPDATE_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(lead.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default LeadsDashboard;