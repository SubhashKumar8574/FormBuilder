import multer from "multer";
import path from "path";

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp
  },
});

// Initialize multer with storage
export const upload = multer({ storage: storage });

// Handle file upload
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }
  res.status(200).json({ message: "File uploaded successfully.", file: req.file });
};
