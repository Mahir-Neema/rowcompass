// app.js
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const mongodb_url = process.env.MONGODB_URL;
// Connect to MongoDB
mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define company schema and model
const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: [String], required: true },
  costOfAcquisition: { type: Number },
  scalability: { type: String },
  revenueModel: { type: String },
  profit: { type: String },
  loss: { type: String },
  marketingStrategy: { type: String },
  differentiation: { type: String },
  startingYear: { type: Number },
  otherinfo: { type: String },
});

const Company = mongoose.model("Company", companySchema);

const app = express();
app.use(bodyParser.json());

// Get companies with search filters
app.get("/companies", async (req, res) => {
  try {
    const filter = {};
    if (req.query.name) {
      filter.name = { $regex: new RegExp(req.query.name, "i") };
    }
    if (req.query.startingYear) {
      filter.startingYear = parseInt(req.query.startingYear);
    }
    if (req.query.category) {
      filter.category = { $regex: new RegExp(req.query.category, "i") };
    }
    if (req.query.scalability) {
      filter.scalability = { $regex: new RegExp(req.query.scalability, "i") };
    }
    if (req.query.revenueModel) {
      filter.revenueModel = { $regex: new RegExp(req.query.revenueModel, "i") };
    }

    const companies = await Company.find(filter);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific company by ID
app.get("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new company
app.post("/companies", async (req, res) => {
  try {
    const company = new Company(req.body);
    const savedCompany = await company.save();
    res.json(savedCompany);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a company by ID
app.put("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a company by ID
app.delete("/companies/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
