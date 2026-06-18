const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema(
{
jobId: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Job',
},
jobTitle: {
type: String, // Store company + position for history even if job deleted
},
action: {
type: String,
enum: ['CREATED', 'UPDATED', 'STATUS_CHANGED', 'DELETED'],
required: true,
},
previousData: {
type: Object, // What the data looked like before the change
default: null,
},
newData: {
type: Object, // What the data looks like after the change
default: null,
},
description: {
type: String, // Human-readable summary e.g. "Status changed from Applied 
},
},
{ timestamps: true }
);
module.exports = mongoose.model('Transaction', transactionSchema);