import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStats, getJobs } from '../api/jobApi';
import StatsCard from '../components/StatsCard';
import JobCard from '../components/JobCard';
import { deleteJob } from '../api/jobApi';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  const fetchData = async () => {
    const [statsRes, jobsRes] = await Promise.all([getStats(), getJobs()]);
    setStats(statsRes.data.stats);
    setRecent(jobsRes.data.jobs.slice(0, 4));
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return;
    await deleteJob(id);
    toast.success('Deleted!');
    fetchData();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <Link to="/add" className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
          + Add Job
        </Link>
      </div>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatsCard label="Total" value={stats.total} color="gray" />
          <StatsCard label="Applied" value={stats.applied} color="blue" />
          <StatsCard label="Interview" value={stats.interview} color="yellow" />
          <StatsCard label="Offer" value={stats.offer} color="green" />
          <StatsCard label="Rejected" value={stats.rejected} color="red" />
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Applications</h2>
        <Link to="/applications" className="text-sm text-gray-500 hover:text-gray-900">View all →</Link>
      </div>

      {recent.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📋</p>
          <p>No applications yet.</p>
          <Link to="/add" className="text-gray-900 underline text-sm mt-2 inline-block">Add your first one</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recent.map(job => <JobCard key={job._id} job={job} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  );
}