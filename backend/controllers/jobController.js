const Job = require('../models/Job');
const Transaction = require('../models/Transaction');

// Log a transaction helper
const logTransaction = async (jobId, jobTitle, action, previousData, newData, description) => {
  await Transaction.create({ jobId, jobTitle, action, previousData, newData, description });
};

// GET all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ success: true, count: jobs.length, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET single job
const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create job
const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    await logTransaction(
      job._id,
      `${job.position} at ${job.company}`,
      'CREATED',
      null,
      job.toObject(),
      `Applied for ${job.position} at ${job.company}`
    );
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT update job
const updateJob = async (req, res) => {
  try {
    const oldJob = await Job.findById(req.params.id);
    if (!oldJob) return res.status(404).json({ success: false, message: 'Job not found' });

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    let action = 'UPDATED';
    let description = `Updated ${updatedJob.position} at ${updatedJob.company}`;

    if (oldJob.status !== updatedJob.status) {
      action = 'STATUS_CHANGED';
      description = `Status changed from ${oldJob.status} to ${updatedJob.status}`;
    }

    await logTransaction(
      updatedJob._id,
      `${updatedJob.position} at ${updatedJob.company}`,
      action,
      oldJob.toObject(),
      updatedJob.toObject(),
      description
    );

    res.json({ success: true, job: updatedJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

    await logTransaction(
      job._id,
      `${job.position} at ${job.company}`,
      'DELETED',
      job.toObject(),
      null,
      `Deleted application for ${job.position} at ${job.company}`
    );

    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET stats
const getStats = async (req, res) => {
  try {
    const total = await Job.countDocuments();
    const applied = await Job.countDocuments({ status: 'Applied' });
    const interview = await Job.countDocuments({ status: 'Interview' });
    const offer = await Job.countDocuments({ status: 'Offer' });
    const rejected = await Job.countDocuments({ status: 'Rejected' });
    res.json({ success: true, stats: { total, applied, interview, offer, rejected } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob, getStats };