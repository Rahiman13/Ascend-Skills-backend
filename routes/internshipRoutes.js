// routes/internshipRoutes.js
const express = require('express');
const {
  getInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship,
  getInternshipCount,
} = require('../controllers/internshipController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(getInternships)
  .post(upload.single('instructorImage'), createInternship);

router.route('/count')
  .get(getInternshipCount);

router.route('/:id')
  .get(getInternshipById)
  .put(upload.single('instructorImage'), updateInternship)
  .delete(deleteInternship);

module.exports = router;
