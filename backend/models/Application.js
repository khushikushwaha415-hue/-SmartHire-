const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resumePath: { type: String },
    matchScore: { type: Number, default: 0 },
    status: { type: String, enum: ['applied', 'reviewed', 'rejected', 'selected'], default: 'applied' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);