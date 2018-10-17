const express = require("express");
const router = express.Router();
router.get("/:id", inventory_controller.inventory_details);

module.exports = router;
