const express = require("express");
const cors = require("cors");
const multer = require("multer");
const extractColors = require("./colorExtractor");

const app = express();

const corsOptions = {
  origin: "*",
  methods: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Multer setup for handling file uploads without saving to disk
const upload = multer({ storage: multer.memoryStorage() });

app.get("/test", (_, res) => {
  res.json("hello from the server");
});

app.post("/extractColors", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const buffer = req.file.buffer; // Access the file buffer directly
    const colors = await extractColors(buffer); // Pass buffer to color extraction function
    res.json(colors);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
