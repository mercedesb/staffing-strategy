const express = require("express");
const peopleController = require("../controllers/peopleController");
const auth = require("../lib/auth");

const router = express.Router();
const { authenticateJWT } = auth();

router.post("/", authenticateJWT, peopleController.create);
router.get("/current", authenticateJWT, peopleController.current);
router.get("/upcoming", authenticateJWT, peopleController.upcoming);
router.put("/:id", authenticateJWT, peopleController.update);
router.delete("/:id", authenticateJWT, peopleController.delete);

module.exports = router;
