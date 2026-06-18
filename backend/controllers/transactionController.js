const Transaction = require('../models/Transaction');
const getTransactions = async (req, res) => {
try {
const transactions = await Transaction.find().sort({ createdAt:-1 }).limit
    res.json({ success: true, transactions });
} catch (error) {
    res.status(500).json({ success: false, message: error.message });
}
};
module.exports = { getTransactions };
