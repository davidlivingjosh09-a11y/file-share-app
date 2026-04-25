const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.use(express.static("public"));

app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `/download/${req.file.filename}`;
  res.send(`File uploaded! Download link: ${fileUrl}`);
});

app.get("/download/:name", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.name);
  res.download(filePath);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});