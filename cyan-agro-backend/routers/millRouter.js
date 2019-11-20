const express = require('express');
const millController = require('../controllers/millController');
const router = express.Router();

router.post("/", millController.add);
router.get("/:id", millController.get);
router.get("/", millController.getAll);
router.put("/:id", millController.update);
router.delete("/:id", millController.delete);

module.exports = router;
