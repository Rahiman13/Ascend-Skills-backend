const College = require('../models/collegeModel');

// @desc    Get all colleges
// @route   GET /api/colleges
// @access  Public
const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get college by ID
// @route   GET /api/colleges/:id
// @access  Public
const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (college) {
      res.json(college);
    } else {
      res.status(404).json({ message: 'College not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new college
// @route   POST /api/colleges
// @access  Public
const createCollege = async (req, res) => {
  const { name, location, description } = req.body;
  const logo = req.file ? req.file.filename : null;

  const college = new College({
    name,
    logo,
    location,
    description,
  });

  try {
    const newCollege = await college.save();
    res.status(201).json(newCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a college
// @route   PUT /api/colleges/:id
// @access  Public
const updateCollege = async (req, res) => {
  const { name, location, description } = req.body;
  const logo = req.file ? req.file.filename : null;

  try {
    const college = await College.findById(req.params.id);

    if (college) {
      college.name = name || college.name;
      college.logo = logo || college.logo;
      college.location = location || college.location;
      college.description = description || college.description;

      const updatedCollege = await college.save();
      res.json(updatedCollege);
    } else {
      res.status(404).json({ message: 'College not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a college
// @route   DELETE /api/colleges/:id
// @access  Public
const deleteCollege = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);

    if (college) {
      await College.deleteOne({ _id: req.params.id });
      res.json({ message: 'College removed' });
    } else {
      res.status(404).json({ message: 'College not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCollegeCount = async (req, res) => {
  try {
    const count = await College.countDocuments()
    res.json({ count })
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
  getCollegeCount,
};
