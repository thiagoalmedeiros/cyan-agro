const express = require('express');
const fieldController = require('../controllers/fieldController');
const router = express.Router();

router.post("/", fieldController.add);
router.get("/:id", fieldController.get);
router.get("/", fieldController.getAll);
router.put("/:id", fieldController.update);
router.delete("/:id", fieldController.delete);

module.exports = router;
