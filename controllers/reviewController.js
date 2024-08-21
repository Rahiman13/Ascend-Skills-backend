const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const Review = require('../models/reviewModel');

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
}).single('image');

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate('courseId', 'title').populate('userId', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get review by ID
// @route   GET /api/reviews/:id
// @access  Public
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate('courseId', 'title').populate('userId', 'username');
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { courseId, userId, rating, comment } = req.body;
        const image = req.file ? req.file.filename : '';

        const review = new Review({
            courseId,
            userId,
            rating,
            comment,
            image,
        });

        try {
            const newReview = await review.save();
            res.status(201).json(newReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Public
const updateReview = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { rating, comment } = req.body;
        const image = req.file ? req.file.filename : '';

        try {
            const review = await Review.findById(req.params.id);

            if (review) {
                review.rating = rating || review.rating;
                review.comment = comment || review.comment;
                if (image) {
                    review.image = image;
                }

                const updatedReview = await review.save();
                res.json(updatedReview);
            } else {
                res.status(404).json({ message: 'Review not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Public
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (review) {
            await Review.deleteOne({ _id: req.params.id });
            res.json({ message: 'Review removed' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get total count of reviews
// @route   GET /api/reviews/count
// @access  Public
const getReviewCount = async (req, res) => {
    try {
        const count = await Review.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    upload,
    getReviewCount,
};
