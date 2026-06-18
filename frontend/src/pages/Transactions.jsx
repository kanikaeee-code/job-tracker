import { useEffect, useState } from 'react';
import { getTransactions } from '../api/jobApi';

const actionColors = {
  CREATED:        'bg-green-100 text-green-700',
  UPDATED:        'bg-blue-100 text-blue-700',
  STATUS_CHANGED: 'bg-yellow-100 text-yellow-700',
  DELETED:        'bg-red-100 text-red-700',
};

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(res => setTransactions(res.data.transactions));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Activity Log</h1>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No activity yet.</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((t) => (
            <div key={t._id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-start gap-4">
              <span className={`mt-0.5 px-2 py-0.5 rounded-full text-xs font-semibold shrink-0 ${actionColors[t.action]}`}>
                {t.action.replace('_', ' ')}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">{t.description}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(t.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}