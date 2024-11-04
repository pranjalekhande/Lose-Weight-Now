const Meal = require('../models/Meal');

exports.addMeal = async (req, res) => {
  try {
    const meal = new Meal({ user: req.user._id, ...req.body });
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user._id }).sort({ date: -1 });
    res.json(meals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
