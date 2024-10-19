const express = require('express');
const router = express.Router();
const musicController = require("../controllers/musicController.js");
const musicValidator = require("../middleware/musicValidation.js");

router.get('/', musicController.getAll);
router.get('/:id', musicController.getSingle)

router.post('/', 
    musicValidator.validationRules,
    musicValidator.checkValidation,
    musicController.addMusic);

router.put('/:id', 
    musicValidator.validationRules,
    musicValidator.checkValidation,
    musicController.updateMusic);

    router.delete('/:id', musicController.deleteMusic);

module.exports = router;