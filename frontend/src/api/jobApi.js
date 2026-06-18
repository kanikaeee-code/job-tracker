import axios from 'axios';
const API = axios.create({
baseURL: import.meta.env.VITE_API_URL || '/api',
});
export const getJobs = () => API.get('/jobs');
export const getJob = (id) => API.get(`/jobs/${id}`);
export const createJob = (data) => API.post('/jobs', data);
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
export const getStats = () => API.get('/jobs/stats');
export const getTransactions = () => API.get('/transactions')