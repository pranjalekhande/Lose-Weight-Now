const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const auth = require('../middleware/auth');

router.post('/', auth, mealController.addMeal);
router.get('/', auth, mealController.getMeals);

module.exports = router;
