const Weight = require('../models/Weight');

// Function to add a new weight entry
exports.addWeight = async (req, res) => {
  try {
    const weight = new Weight({ user: req.user._id, ...req.body });
    await weight.save();
    console.log("Weight saved in database:", weight);
    res.status(201).json(weight);
  } catch (error) {
    console.error('Error in addWeight controller:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Function to retrieve all weights
exports.getWeights = async (req, res) => {
  try {
    const weights = await Weight.find({ user: req.user._id }).sort({ date: -1 });
    res.json(weights);
  } catch (error) {
    console.error('Error in getWeights controller:', error.message);
    res.status(400).json({ error: error.message });
  }
};
