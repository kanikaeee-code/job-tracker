const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getJobs, getJob, createJob, updateJob, deleteJob, getStats
} = require('../controllers/jobController');

router.use(protect);

router.get('/stats', getStats);
router.get('/', getJobs);
router.get('/:id', getJob);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

module.exports = router;
