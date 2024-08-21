const TeamMember = require('../models/teamMemberModel');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve team members', error: error.message });
  }
};

// @desc    Get team member by ID
// @route   GET /api/team/:id
// @access  Public
const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    if (teamMember) {
      res.json(teamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve team member', error: error.message });
  }
};

// @desc    Create a new team member
// @route   POST /api/team
// @access  Public
const createTeamMember = async (req, res) => {
  const { name, position, experience, bio, degrees } = req.body;
  const image = req.file ? req.file.filename : '';

  if (!name || !position || !experience || !bio) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const teamMember = new TeamMember({
      name,
      position,
      experience,
      bio,
      image,
      degrees: degrees ? JSON.parse(degrees) : [],
    });

    const newTeamMember = await teamMember.save();
    res.status(201).json(newTeamMember);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create team member', error: error.message });
  }
};

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Public
const updateTeamMember = async (req, res) => {
  const { name, position, experience, bio, degrees } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (teamMember) {
      teamMember.name = name || teamMember.name;
      teamMember.position = position || teamMember.position;
      teamMember.experience = experience || teamMember.experience;
      teamMember.bio = bio || teamMember.bio;
      teamMember.image = image || teamMember.image;
      teamMember.degrees = degrees ? JSON.parse(degrees) : teamMember.degrees;

      const updatedTeamMember = await teamMember.save();
      res.json(updatedTeamMember);
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to update team member', error: error.message });
  }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Public
const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);

    if (teamMember) {
      await TeamMember.deleteOne({ _id: req.params.id });
      res.json({ message: 'Team member removed' });
    } else {
      res.status(404).json({ message: 'Team member not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete team member', error: error.message });
  }
};

// @desc    Get total count of team members
// @route   GET /api/team/count
// @access  Public
const getTeamMemberCount = async (req, res) => {
  try {
    const count = await TeamMember.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get team member count', error: error.message });
  }
};

module.exports = {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamMemberCount,
};
