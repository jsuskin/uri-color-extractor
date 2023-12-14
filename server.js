const express = require("express");
const cors = require("cors");
const multer = require("multer");
const extractColors = require("./colorExtractor");

const app = express();

const corsOptions = {
  origin: "exp://192.168.1.210:19000",
  methods: "GET,PUT,POST,DELETE",
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Multer setup for handling file uploads
const upload = multer({ dest: "uploads/" });

app.get("/test", () => {
  res.json("hello from the server")
})

app.post("/extractColors", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file.path; // Path to the uploaded image
    const colors = await extractColors(imagePath);
    res.json(colors);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
