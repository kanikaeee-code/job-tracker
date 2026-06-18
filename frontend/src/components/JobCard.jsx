import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

export default function JobCard({ job, onDelete }) {
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
        <StatusBadge status={job.status} />
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