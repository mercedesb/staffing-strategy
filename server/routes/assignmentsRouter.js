const express = require("express");
const assignmentsController = require("../controllers/assignmentsController");
const auth = require("../lib/auth");

const router = express.Router();
const { authenticateJWT } = auth();

router.post("/", authenticateJWT, assignmentsController.create);
router.get("/current", authenticateJWT, assignmentsController.current);
router.get("/upcoming", authenticateJWT, assignmentsController.upcoming);
router.put("/:id", authenticateJWT, assignmentsController.update);
router.delete("/:id", authenticateJWT, assignmentsController.delete);

module.exports = router;
