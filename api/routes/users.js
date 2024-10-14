import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Search users API
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the request
    // Create a base query object for name and email
    const searchCriteria = {
      $or: [
        { name: { $regex: query, $options: "i" } }, // Match name (case-insensitive)
        { email: { $regex: query, $options: "i" } }, // Match email (case-insensitive)
      ],
    };
    // If the query is a valid number, add it to search by age as well
    if (!isNaN(query)) {
      searchCriteria.$or.push({ age: Number(query) }); // Match age exactly
    }
    // Perform the search with the constructed criteria
    const users = await User.find(searchCriteria);
    res.status(200).json(users); // Respond with the found users
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error searching for users." });
  }
});


// Create new user
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body); // req.body should contain name, email, age
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("User not found!");
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json("User not found!");
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json("User not found!");
    }
    res.status(200).json("User has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
