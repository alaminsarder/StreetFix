const express = require("express");
const router = express.Router();

// আপনার ডাটাবেজ মডেলটি ইম্পোর্ট করা হলো
const Problem = require("../models/Problem");

// 1. GET ALL: সব সমস্যা দেখার জন্য
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 }); // নতুনগুলো আগে আসবে
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================================================================
// সমাধান: শুধুমাত্র সমাধান হওয়া (resolved) সমস্যাগুলো পাওয়ার জন্য নতুন রুট
// ফ্রন্টএন্ড থেকে GET /api/problems/status/resolved -এ কল করতে হবে
// =================================================================
router.get("/status/resolved", async (req, res) => {
  try {
    // ডাটাবেস থেকে শুধু সেই সমস্যাগুলো খোঁজা হবে যেগুলোর স্ট্যাটাস 'resolved'
    const solvedProblems = await Problem.find({ status: "resolved" }).sort({ createdAt: -1 });
    res.json(solvedProblems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 2. GET SINGLE: নির্দিষ্ট একটি সমস্যা দেখার জন্য
// গুরুত্বপূর্ণ: এই রুটটি অবশ্যই ডাইনামিক প্যারামিটার (:id) এর কারণে নির্দিষ্ট পাথের ("/status/resolved") নিচে রাখতে হবে।
// না হলে Express "/status/resolved" কে একটি আইডি হিসেবে ধরে নেবে।
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST: নতুন সমস্যা তৈরি করার জন্য
router.post("/", async (req, res) => {
  try {
    const newProblem = new Problem(req.body);
    const savedProblem = await newProblem.save();
    res.status(201).json(savedProblem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 4. PATCH: স্ট্যাটাস এবং অ্যাডমিন রিভিউ আপডেট করার জন্য
router.patch("/:id", async (req, res) => {
  try {
    const updatedProblem = await Problem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } // আপডেট হওয়া ডাটা রিটার্ন করবে
    );
    if (!updatedProblem) return res.status(404).json({ message: "Problem not found" });
    res.json(updatedProblem);
  } catch (err)
 {
    res.status(400).json({ error: err.message });
  }
});

// 5. DELETE: ড্যাশবোর্ড থেকে ডিলিট করার জন্য
router.delete("/:id", async (req, res) => {
  try {
    const deletedProblem = await Problem.findByIdAndDelete(req.params.id);
    
    if (!deletedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;