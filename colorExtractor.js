const Vibrant = require("node-vibrant");

async function extractColors(imagePath) {
  try {
    const palette = await Vibrant.from(imagePath).getPalette();
    return palette;
  } catch (error) {
    console.error("Error extracting colors:", error);
    return null;
  }
}

module.exports = extractColors;