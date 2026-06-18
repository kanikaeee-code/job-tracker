import { useState } from 'react';

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Rejected'];
const TYPE_OPTIONS = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];

export default function JobForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    company: '',
    position: '',
    status: 'Applied',
    jobType: 'Full-time',
    location: '',
    salary: '',
    jobUrl: '',
    notes: '',
    ...initialData,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
          <input name="company" value={form.company} onChange={handleChange} required className={inputClass} placeholder="Google" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
          <input name="position" value={form.position} onChange={handleChange} required className={inputClass} placeholder="Software Engineer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
          <select name="jobType" value={form.jobType} onChange={handleChange} className={inputClass}>
            {TYPE_OPTIONS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input name="location" value={form.location} onChange={handleChange} className={inputClass} placeholder="Remote / Chennai" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
          <input name="salary" value={form.salary} onChange={handleChange} className={inputClass} placeholder="₹8 LPA" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job URL</label>
        <input name="jobUrl" value={form.jobUrl} onChange={handleChange} className={inputClass} placeholder="https://careers.google.com/..." />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className={inputClass} placeholder="Referral from John, need to prep DSA..." />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Save Application'}
      </button>
    </form>
  );
}