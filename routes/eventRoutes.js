const express = require("express");
const router = express.Router();
const { getAllEvents, createEvent, getMyEvents } = require("../controllers/eventController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/events", getAllEvents);
router.post("/events", authenticateToken, createEvent);
router.get("/my-events", authenticateToken, getMyEvents);

module.exports = router;
