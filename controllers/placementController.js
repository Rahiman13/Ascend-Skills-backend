const Placement = require('../models/placementModel');

// @desc    Get all placements
// @route   GET /api/placements
// @access  Public
const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find();
    res.json(placements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get placement by ID
// @route   GET /api/placements/:id
// @access  Public
const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (placement) {
      res.json(placement);
    } else {
      res.status(404).json({ message: 'Placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new placement
// @route   POST /api/placements
// @access  Public
const createPlacement = async (req, res) => {
  const { studentName, position, companyName, description, studentCollege, placedYear } = req.body;
  const studentImage = req.file ? req.file.path : '';

  const placement = new Placement({
    studentName,
    position,
    companyName,
    studentImage,
    description,
    studentCollege,
    placedYear,
  });

  try {
    const newPlacement = await placement.save();
    res.status(201).json(newPlacement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a placement
// @route   PUT /api/placements/:id
// @access  Public
const updatePlacement = async (req, res) => {
  const { studentName, position, companyName, description, studentCollege, placedYear } = req.body;
  const studentImage = req.file ? req.file.path : '';

  try {
    const placement = await Placement.findById(req.params.id);

    if (placement) {
      placement.studentName = studentName || placement.studentName;
      placement.position = position || placement.position;
      placement.companyName = companyName || placement.companyName;
      placement.studentImage = studentImage || placement.studentImage;
      placement.description = description || placement.description;
      placement.studentCollege = studentCollege || placement.studentCollege;
      placement.placedYear = placedYear || placement.placedYear;

      const updatedPlacement = await placement.save();
      res.json(updatedPlacement);
    } else {
      res.status(404).json({ message: 'Placement not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a placement
// @route   DELETE /api/placements/:id
// @access  Public
const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (placement) {
      await Placement.deleteOne({ _id: req.params.id });
      res.json({ message: 'Placement removed' });
    } else {
      res.status(404).json({ message: 'Placement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPlacementsCount = async (req, res) => {
  try {
    const count = await Placement.countDocuments()
    res.json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getPlacements,
  getPlacementById,
  createPlacement,
  updatePlacement,
  deletePlacement,
  getPlacementsCount,
};
