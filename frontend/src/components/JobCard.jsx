import { Link } from 'react-router-dom';
import { useState } from 'react';
import StatusBadge from './StatusBadge';
import { updateJob } from '../api/jobApi';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected'];

const ringColors = {
  Applied:   'focus:ring-blue-400 border-blue-200',
  Interview: 'focus:ring-yellow-400 border-yellow-200',
  Offer:     'focus:ring-green-400 border-green-200',
  Rejected:  'focus:ring-red-400 border-red-200',
};

export default function JobCard({ job, onDelete, onStatusChange }) {
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState(job.status);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    const previousStatus = status;
    setStatus(newStatus);
    setUpdating(true);

    try {
      const res = await updateJob(job._id, { status: newStatus });
      toast.success(`Moved to ${newStatus}`);
      onStatusChange?.(res.data.job);
    } catch {
      setStatus(previousStatus);
      toast.error('Could not update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{job.position}</p>
          <p className="text-sm text-gray-500 truncate">{job.company}</p>
          {job.location && (
            <p className="text-xs text-gray-400 mt-1">📍 {job.location}</p>
          )}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-4">
        <label className="block text-xs font-medium text-gray-400 mb-1">
          Update status
        </label>
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={updating}
          className={`w-full border rounded-lg px-2 py-1.5 text-sm font-medium bg-white focus:outline-none focus:ring-2 transition-opacity ${
            ringColors[status]
          } ${updating ? 'opacity-50' : ''}`}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {new Date(job.appliedDate).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <Link
            to={`/edit/${job._id}`}
            className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(job._id)}
            className="text-xs px-3 py-1 bg-red-50 hover:bg-red-100 rounded-md text-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
