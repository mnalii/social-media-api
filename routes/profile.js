const express = require('express');
const {
  profileValidation,
  experienceValidaton,
  educationValidation
} = require('../validator/validator');
const auth = require('../middleware/auth');
const {
  getAuthProfile,
  createProfile,
  getProfileById,
  getAllProfiles,
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getGithubRepo
} = require('../controllers/profileController');

const router = new express.Router();

router.post('/create', auth, profileValidation, createProfile);
router.get('/user/:user_id', getProfileById);
router.get('/', getAllProfiles);
router.get('/me', auth, getAuthProfile);
router.delete('/user/:user_id', auth, deleteProfile);
router.put('/experience', auth, experienceValidaton, addExperience);
router.delete('/experience/:exp_id', auth, deleteExperience);
router.put('/education', auth, educationValidation, addEducation);
router.delete('/education/:edu_id', auth, deleteEducation);
router.get('/github/:username', getGithubRepo);

module.exports = router;
