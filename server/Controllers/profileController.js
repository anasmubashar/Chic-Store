const Profile = require('../Models/profileModel');
const { validatePhoneNumber } = require('../utils/validators');

// Get profile information
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ isActive: true });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new profile
exports.createProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne({ isActive: true });
    if (existingProfile) {
      return res.status(400).json({ 
        success: false, 
        message: 'Active profile already exists' 
      });
    }

    if (!validatePhoneNumber(req.body.contactDetails.phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Pakistani phone number format'
      });
    }

    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    if (req.body.contactDetails?.phoneNumber && 
        !validatePhoneNumber(req.body.contactDetails.phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Pakistani phone number format'
      });
    }

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};