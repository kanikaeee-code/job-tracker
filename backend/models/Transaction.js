const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
    jobTitle: { type: String },
    action: {
      type: String,
      enum: ['CREATED', 'UPDATED', 'STATUS_CHANGED', 'DELETED'],
      required: true,
    },
    previousData: { type: Object, default: null },
    newData: { type: Object, default: null },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
