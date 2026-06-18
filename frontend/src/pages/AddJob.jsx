import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../api/jobApi';
import JobForm from '../components/JobForm';
import toast from 'react-hot-toast';

export default function AddJob() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await createJob(data);
      toast.success('Application added!');
      navigate('/applications');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Application</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <JobForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}