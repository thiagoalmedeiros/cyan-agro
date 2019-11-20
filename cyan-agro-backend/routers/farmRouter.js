const express = require('express');
const farmController = require('../controllers/farmController');
const router = express.Router();

router.post("/", farmController.add);
router.get("/:id", farmController.get);
router.get("/", farmController.getAll);
router.put("/:id", farmController.update);
router.delete("/:id", farmController.delete);

module.exports = router;
