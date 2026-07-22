const User = require('../models/User');

exports.getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateProfile = async(req, res) => {
    try {
        const { name, bio, skills } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id, { name, bio, skills }, { new: true }
        ).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};