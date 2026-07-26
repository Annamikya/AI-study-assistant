const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updateUserProfile,
  changePassword,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

module.exports = router;