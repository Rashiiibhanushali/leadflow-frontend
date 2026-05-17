import { useState } from "react";

const SOURCES = ["Website", "LinkedIn", "Referral", "Landing Page", "Manual"];
const STATUSES = ["New", "Contacted", "Qualified", "Closed"];

function LeadForm({ onLeadAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "Website",
    status: "New",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:3000/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Lead added successfully!" });
        setForm({ name: "", email: "", phone: "", source: "Website", status: "New" });
        if (onLeadAdded) onLeadAdded(data.lead);
      } else {
        setMessage({ type: "error", text: data.error || "Something went wrong" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Could not connect to server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Lead</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name *"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email *"
          type="email"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="source"
          value={form.source}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {SOURCES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>

        {message && (
          <p className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-500"}`}>
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 disabled:opacity-50 transition"
        >
          {loading ? "Adding..." : "Add Lead"}
        </button>
      </form>
    </div>
  );
}

export default LeadForm;