const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyJob = async(req, res) => {
    try {
        const { jobId } = req.body;
        const existing = await Application.findOne({ job: jobId, applicant: req.user.id });
        if (existing) return res.status(400).json({ message: 'Already applied!' });

        const application = await Application.create({
            job: jobId,
            applicant: req.user.id,
        });
        res.status(201).json(application);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMyApplications = async(req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.id }).populate('job');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJobApplications = async(req, res) => {
    try {
        const applications = await Application.find({ job: req.params.jobId }).populate('applicant', 'name email');
        res.json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};