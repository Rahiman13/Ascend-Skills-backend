const express = require('express');
const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorCount,
} = require('../controllers/authorController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get('/', getAuthors);
router.get('/count', getAuthorCount); // Add this line
router.get('/:id', getAuthorById);
router.post('/', upload.single('image'), createAuthor);
router.put('/:id', upload.single('image'), updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;
