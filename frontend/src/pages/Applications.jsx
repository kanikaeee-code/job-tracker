import { useEffect, useState } from 'react';
import { getJobs, deleteJob } from '../api/jobApi';
import JobCard from '../components/JobCard';
import toast from 'react-hot-toast';

const STATUSES = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

export default function Applications() {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    const res = await getJobs();
    setJobs(res.data.jobs);
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return;
    await deleteJob(id);
    toast.success('Deleted!');
    fetchJobs();
  };

  const filtered = jobs.filter(job => {
    const matchStatus = filter === 'All' || job.status === filter;
    const matchSearch = job.company.toLowerCase().includes(search.toLowerCase()) ||
                        job.position.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Applications</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search company or position..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 py-16">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(job => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} onStatusChange={fetchJobs} />
          ))}
        </div>
      )}
    </div>
  );
}
