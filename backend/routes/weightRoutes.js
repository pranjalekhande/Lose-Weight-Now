const express = require('express');
const router = express.Router();
const weightController = require('../controllers/weightController');
const auth = require('../middleware/auth');

// Route to add a new weight
router.post('/', auth, weightController.addWeight);

// Route to get weights
router.get('/', auth, weightController.getWeights);

module.exports = router;
