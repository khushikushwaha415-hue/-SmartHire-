const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createJob, getAllJobs, getJobById, deleteJob } = require('../controllers/jobController');

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', auth, createJob);
router.delete('/:id', auth, deleteJob);

module.exports = router;