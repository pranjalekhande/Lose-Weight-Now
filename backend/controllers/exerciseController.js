const Exercise = require('../models/Exercise');

exports.addExercise = async (req, res) => {
  try {
    const exercise = new Exercise({ user: req.user._id, ...req.body });
    await exercise.save();
    res.status(201).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user._id }).sort({ date: -1 });
    res.json(exercises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }localStorage
};