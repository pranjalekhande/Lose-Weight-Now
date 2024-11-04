const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const auth = require('../middleware/auth');

router.post('/', auth, exerciseController.addExercise);
router.get('/', auth, exerciseController.getExercises);

module.exports = router;
