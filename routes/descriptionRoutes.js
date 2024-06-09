const express = require('express');
const router = express.Router();
const descriptionController = require('../controllers/descriptionControllers');

router.get('/:id', descriptionController.getDescriptionById);
router.post('/:userId', descriptionController.createDescription);
router.delete('/:userId', descriptionController.deleteDescriptions);

module.exports = router;