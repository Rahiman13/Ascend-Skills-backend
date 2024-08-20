const Service = require('../models/service'); // Adjust the path according to your project structure

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { serviceTitle, image, description } = req.body;
    const newService = new Service({ serviceTitle, image, description });
    await newService.save();
    res.status(201).json({ status: 'success', message: 'Service created successfully', data: newService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ status: 'success', data: services });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found' });
    }
    res.status(200).json({ status: 'success', data: service });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const { serviceTitle, image, description } = req.body;
    const updatedService = await Service.findByIdAndUpdate(req.params.id, { serviceTitle, image, description }, { new: true });
    if (!updatedService) {
      return res.status(404).json({ status: 'error', message: 'Service not found' });
    }
    res.status(200).json({ status: 'success', data: updatedService });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ status: 'error', message: 'Service not found' });
    }
    res.status(200).json({ status: 'success', message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
