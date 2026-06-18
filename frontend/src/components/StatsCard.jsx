export default function StatsCard({ label, value, color }) {
  const colors = {
    blue:   'border-blue-400 text-blue-600',
    yellow: 'border-yellow-400 text-yellow-600',
    green:  'border-green-400 text-green-600',
    red:    'border-red-400 text-red-600',
    gray:   'border-gray-400 text-gray-600',
  };

  return (
    <div className={`bg-white rounded-xl border-l-4 p-5 shadow-sm ${colors[color]}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}