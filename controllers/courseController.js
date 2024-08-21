const Course = require('../models/courseModel');
const Review = require('../models/reviewModel');
const VideoReview = require('../models/videoReviewModel');
const Author = require('../models/authorModel');
const Roadmap = require('../models/roadmapModel');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('authorId', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('reviews').populate('authorId');
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
// @access  Public
const createCourse = async (req, res) => {
  console.log('Files:', req.files); // Debugging statement

  const { title, description, duration, authorId, authorName, price, category, curriculum, courseRating } = req.body;

  if (!title || !description || !duration || !authorId || !authorName || !price || !category || !curriculum || !courseRating) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  let parsedCurriculum;
  try {
    parsedCurriculum = typeof curriculum === 'string' ? JSON.parse(curriculum) : curriculum;
  } catch (error) {
    return res.status(400).json({ message: 'Curriculum must be a valid JSON object' });
  }

  const authorImage = req.files && req.files['authorImage'] ? req.files['authorImage'][0].path : '';
  const image = req.files && req.files['image'] ? req.files['image'][0].path : '';

  const course = new Course({
    title,
    description,
    duration,
    authorId,
    authorName,
    authorImage,
    image,
    price,
    courseRating,
    category,
    curriculum: parsedCurriculum,
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Public
const updateCourse = async (req, res) => {
  const { title, description, duration, authorId, authorName, price, category, curriculum, courseRating } = req.body;

  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      course.title = title || course.title;
      course.description = description || course.description;
      course.duration = duration || course.duration;
      course.authorId = authorId || course.authorId;
      course.authorName = authorName || course.authorName;
      course.price = price || course.price;
      course.category = category || course.category;
      course.courseRating = courseRating || course.courseRating;

      let parsedCurriculum;
      try {
        // Ensure that curriculum is a valid JSON object
        parsedCurriculum = typeof curriculum === 'string' ? JSON.parse(curriculum) : curriculum;
        if (typeof parsedCurriculum !== 'object' || Array.isArray(parsedCurriculum)) {
          return res.status(400).json({ message: 'Curriculum must be a valid JSON object' });
        }
      } catch (error) {
        return res.status(400).json({ message: 'Curriculum must be a valid JSON object' });
      }

      course.curriculum = parsedCurriculum || course.curriculum;

      // Handle file uploads
      // if (req.files['authorImage'] && req.files['authorImage'][0]) {
      //   if (course.authorImage) {
      //     fs.unlinkSync(course.authorImage);
      //   }
      //   course.authorImage = req.files['authorImage'][0].path;
      // }

      // if (req.files['image'] && req.files['image'][0]) {
      //   if (course.image) {
      //     fs.unlinkSync(course.image);
      //   }
      //   course.image = req.files['image'][0].path;
      // }

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Public
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (course) {
      // if (course.authorImage) {
      //   fs.unlinkSync(course.authorImage);
      // }
      // if (course.image) {
      //   fs.unlinkSync(course.image);
      // }
      await Course.deleteOne({ _id: req.params.id });
      res.json({ message: 'Course removed' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get total count of courses
const getCourseCount = async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course details with reviews, instructor, roadmap, and video reviews
const getCourseDetails = async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findById(courseId).populate('reviews').populate('authorId');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const reviews = await Review.find({ courseId }).populate('userId', 'username');
    const videoReviews = await VideoReview.find({ courseId }).populate('userId', 'username');
    const author = await Author.findOne({ _id: course.authorId });
    const roadmap = await Roadmap.findOne({ courseId });

    res.json({
      course,
      reviews,
      videoReviews,
      author,
      roadmap,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseCount,
  getCourseDetails,
};
