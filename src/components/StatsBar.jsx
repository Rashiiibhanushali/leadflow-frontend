const STATS = [
  { label: "New", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Contacted", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  { label: "Qualified", color: "bg-green-100 text-green-700 border-green-200" },
  { label: "Closed", color: "bg-gray-100 text-gray-600 border-gray-200" },
];

function StatsBar({ leads }) {
  const count = (status) =>
    leads.filter((l) => l.status === status).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map(({ label, color }) => (
        <div
          key={label}
          className={`rounded-xl border px-5 py-4 flex flex-col gap-1 ${color}`}
        >
          <span className="text-2xl font-bold">{count(label)}</span>
          <span className="text-xs font-medium uppercase tracking-wide">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;