const express = require('express');
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseCount,
  getCourseDetails,
} = require('../controllers/courseController');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set upload directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Define routes with proper middleware for handling file uploads
router.get('/', getCourses);
router.get('/count', getCourseCount); // Endpoint to get the total count of courses
router.get('/:id', getCourseById);
router.get('/details/:id', getCourseDetails); // Endpoint to get detailed course information
router.post('/', upload.fields([{ name: 'authorImage' }, { name: 'image' }]), createCourse);
router.put('/:id', upload.fields([{ name: 'authorImage' }, { name: 'image' }]), updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
