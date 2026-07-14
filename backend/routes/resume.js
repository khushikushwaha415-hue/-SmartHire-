const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const { analyzeResume } = require('../controllers/resumeController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/analyze', auth, upload.single('resume'), analyzeResume);

module.exports = router;