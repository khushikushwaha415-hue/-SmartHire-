const Job = require('../models/Job');

exports.createJob = async(req, res) => {
    try {
        const { title, company, description, skillsRequired, location, salary } = req.body;
        const job = await Job.create({
            title,
            company,
            description,
            skillsRequired,
            location,
            salary,
            postedBy: req.user.id
        });
        res.status(201).json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllJobs = async(req, res) => {
    try {
        const jobs = await Job.find().populate('postedBy', 'name email');
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJobById = async(req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteJob = async(req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};