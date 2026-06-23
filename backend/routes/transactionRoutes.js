const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getTransactions } = require('../controllers/transactionController');

router.use(protect);

router.get('/', getTransactions);

module.exports = router;
