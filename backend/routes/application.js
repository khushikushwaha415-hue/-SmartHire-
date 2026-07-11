const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { applyJob, getMyApplications, getJobApplications } = require('../controllers/applicationController');

router.post('/apply', auth, applyJob);
router.get('/my', auth, getMyApplications);
router.get('/job/:jobId', auth, getJobApplications);

module.exports = router;