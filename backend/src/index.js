import express from "express";
import multer from "multer";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "filing_system",
  password: "yourpassword",
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer Storage for File Uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Upload a File
app.post("/upload", upload.single("file"), async (req, res) => {
  const { category } = req.body;
  const filePath = req.file.path;
  const fileName = req.file.filename;

  try {
    const result = await pool.query(
      "INSERT INTO files (filename, filepath, category) VALUES ($1, $2, $3) RETURNING *",
      [fileName, filePath, category]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error uploading file" });
  }
});

// Get All Files (Sorted by Recent)
app.get("/files", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM files ORDER BY uploaded_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching files" });
  }
});

// Delete File
app.delete("/files/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM files WHERE id = $1", [id]);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting file" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
