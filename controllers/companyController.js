const Company = require('../models/companyModel');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get company by ID
// @route   GET /api/companies/:id
// @access  Public
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new company
// @route   POST /api/companies
// @access  Public
const createCompany = async (req, res) => {
  const { name, logo, location, description, countOfPlacedStudents, industry } = req.body;

  const company = new Company({
    name,
    logo,
    location,
    description,
    countOfPlacedStudents,
    industry,
  });

  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Public
const updateCompany = async (req, res) => {
  const { name, logo, location, description, countOfPlacedStudents, industry } = req.body;

  try {
    const company = await Company.findById(req.params.id);

    if (company) {
      company.name = name || company.name;
      company.logo = logo || company.logo;
      company.location = location || company.location;
      company.description = description || company.description;
      company.countOfPlacedStudents = countOfPlacedStudents || company.countOfPlacedStudents;
      company.industry = industry || company.industry;

      const updatedCompany = await company.save();
      res.json(updatedCompany);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Public
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (company) {
      await Company.deleteOne({ _id: req.params.id });
      res.json({ message: 'Company removed' });
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCompanyCount = async (req, res) => {
  try {
    const count = await Company.countDocuments()
    res.json({ count })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyCount,
};
