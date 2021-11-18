// Libraries
const express = require("express");
const router = express.Router();

// Authentication controller functions
const {
  register,
  verify,
  login,
  forgotPassword,
  resetPassword,
  getDetails,
  updatePassword,
  updateProfile,
  convertClient,
} = require("../controllers/user");

// Admin controller functions
const { getUsers, getUserById, addUser, editUser, deleteUser } = require("../controllers/user");

// Access control middleware
const { protect, roles } = require("../middleware/auth");

// Multer middleware
const upload = require("../middleware/multer");

// Update Profile configuration
const updateProfileUpload = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "directoryImages", maxCount: 5 },
]);

// Authentication routes
router.route("/register").post(register);
router.route("/verify/:verificationToken").get(verify);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetPassword);

// Private routes
router.route("/me").get(protect, getDetails);
router.route("/updatepassword").put(protect, updatePassword);
router.route("/updateprofile").put(protect, updateProfileUpload, updateProfile);
router.route("/convertclient").put(protect, convertClient);

// Admin routes
router.route("/").get(protect, roles("Admin"), getUsers);
router.route("/add").post(protect, roles("Admin"), addUser);
router.route("/edit/:id").put(protect, roles("Admin"), editUser);
router.route("/delete/:id").delete(protect, roles("Admin"), deleteUser);
router.route("/:id").get(protect, roles("Admin"), getUserById);

module.exports = router;
