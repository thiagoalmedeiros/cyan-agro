const express = require('express');
const harvestController = require('../controllers/harvestController');
const router = express.Router();

router.post("/", harvestController.add);
router.get("/:id", harvestController.get);
router.get("/", harvestController.getAll);
router.put("/:id", harvestController.update);
router.delete("/:id", harvestController.delete);

module.exports = router;
