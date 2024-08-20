const Author = require('../models/authorModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for image upload
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

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find().populate('courseId', 'title description duration price image courseRating category authorName authorImage').populate('authorReviews.userId', 'username');
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get author by ID
// @route   GET /api/authors/:id
// @access  Public
const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('courseId', 'title description duration price image courseRating category authorName authorImage').populate('authorReviews.userId', 'username');
        if (author) {
            res.json(author);
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new author
// @route   POST /api/authors
// @access  Public
const createAuthor = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { name, courseId, bio, authorReviews, degrees, experience, previousCompany } = req.body;
        const image = req.file ? req.file.path : '';

        let parsedAuthorReviews;
        let parsedDegrees;

        try {
            parsedAuthorReviews = typeof authorReviews === 'string' ? JSON.parse(authorReviews) : authorReviews;
            parsedDegrees = typeof degrees === 'string' ? JSON.parse(degrees) : degrees;
        } catch (error) {
            return res.status(400).json({ message: 'Invalid JSON format in authorReviews or degrees' });
        }

        const author = new Author({
            name,
            courseId,
            bio,
            image,
            authorReviews: parsedAuthorReviews,
            degrees: parsedDegrees,
            experience,
            previousCompany,
        });

        try {
            const newAuthor = await author.save();
            res.status(201).json(newAuthor);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

// @desc    Update an author
// @route   PUT /api/authors/:id
// @access  Public
const updateAuthor = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }

        const { name, courseId, bio, authorReviews, degrees, experience, previousCompany } = req.body;
        const image = req.file ? req.file.path : '';

        let parsedAuthorReviews;
        let parsedDegrees;

        try {
            parsedAuthorReviews = typeof authorReviews === 'string' ? JSON.parse(authorReviews) : authorReviews;
            parsedDegrees = typeof degrees === 'string' ? JSON.parse(degrees) : degrees;
        } catch (error) {
            return res.status(400).json({ message: 'Invalid JSON format in authorReviews or degrees' });
        }

        try {
            const author = await Author.findById(req.params.id);

            if (author) {
                author.name = name || author.name;
                author.courseId = courseId || author.courseId;
                author.bio = bio || author.bio;
                author.authorReviews = parsedAuthorReviews || author.authorReviews;
                author.degrees = parsedDegrees || author.degrees;
                author.experience = experience || author.experience;
                author.previousCompany = previousCompany || author.previousCompany;
                if (image) {
                    if (author.image) {
                        fs.unlinkSync(path.join(__dirname, '..', author.image));
                    }
                    author.image = image;
                }

                const updatedAuthor = await author.save();
                res.json(updatedAuthor);
            } else {
                res.status(404).json({ message: 'Author not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });
};

// @desc    Delete an author
// @route   DELETE /api/authors/:id
// @access  Public
const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);

        if (author) {
            if (author.image) {
                fs.unlinkSync(path.join(__dirname, '..', author.image));
            }
            await Author.deleteOne({ _id: req.params.id });
            res.json({ message: 'Author removed' });
        } else {
            res.status(404).json({ message: 'Author not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get total count of authors
// @route   GET /api/authors/count
// @access  Public
const getAuthorCount = async (req, res) => {
    try {
        const count = await Author.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthorCount,
};
