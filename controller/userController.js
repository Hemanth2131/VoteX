import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// ==========================
// Signup Controller
// ==========================
export const signup = async (req, res) => {
  try {
    const { name, email, password, role, age, mobile, aadharNo } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const existingAadhar = await User.findOne({ aadharNo });
    if (existingAadhar) {
      return res.status(400).json({ message: "User already exists with this Aadhar number" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, // default "voter" if not passed
      age,
      mobile,
      aadharNo
    });

    await newUser.save();

    return res.status(201).json({ message: "Signup successful", userId: newUser._id });
  } catch (error) {
    return res.status(500).json({ message: "Error during signup", error: error.message });
  }
};

// ==========================
// Login Controller
// ==========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "mysecretkey", // 🔑 later move this to .env
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Error during login", error: error.message });
  }
};

// ==========================
// Get User Profile
// ==========================
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // comes from JWT middleware
    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

// ==========================
// Change Password
// ==========================
export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error changing password", error: error.message });
  }
};

