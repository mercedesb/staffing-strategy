const express = require("express");
const scenariosController = require("../controllers/scenariosController");
const auth = require("../lib/auth");

const router = express.Router();
const { authenticateJWT } = auth();

router.post("/", authenticateJWT, scenariosController.create);
router.get("/upcoming", authenticateJWT, scenariosController.upcoming);
router.put("/:id", authenticateJWT, scenariosController.update);
router.delete("/:id", authenticateJWT, scenariosController.delete);

module.exports = router;
