import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJob, updateJob } from '../api/jobApi';
import JobForm from '../components/JobForm';
import toast from 'react-hot-toast';

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getJob(id).then(res => setJob(res.data.job));
  }, [id]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await updateJob(id, data);
      toast.success('Updated!');
      navigate('/applications');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <div className="text-center py-16 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Application</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <JobForm initialData={job} onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}