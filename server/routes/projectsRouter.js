const express = require("express");
const projectsController = require("../controllers/projectsController");
const auth = require("../lib/auth");

const router = express.Router();
const { authenticateJWT } = auth();

router.post("/", authenticateJWT, projectsController.create);
router.get("/current", authenticateJWT, projectsController.current);
router.get("/upcoming", authenticateJWT, projectsController.upcoming);
router.put("/:id", authenticateJWT, projectsController.update);
router.delete("/:id", authenticateJWT, projectsController.delete);

module.exports = router;
