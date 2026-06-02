const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql2/promise');

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// =====================
// DB Connection
// =====================
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'RUTIkav1820',
  database: 'matchmaking'
});

// =====================
// Check server
// =====================
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// =====================
// Multer setup
// =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// =====================
// 📌 BOYS - GET
// =====================
app.get('/api/boys', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM boys');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// 📌 GIRLS - GET
// =====================
app.get('/api/girls', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM girls');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// 📌 CONTACT - POST
// =====================
app.post('/api/contact', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), async (req, res) => {

  const { name, email, message, gender, age, city, tribe } = req.body;

  const imageUrl = req.files?.image?.[0]?.path || null;
  const pdfUrl = req.files?.pdf?.[0]?.path || null;

  try {

    // 👇 זכר → boys
    if (gender === 'male') {
      await db.query(
        `INSERT INTO boys (name, age, image_url, resume_url)
         VALUES (?, ?, ?, ?)`,
        [name, age || null, imageUrl, pdfUrl]
      );
    }

    // 👇 נקבה → girls
    else if (gender === 'female') {
      await db.query(
        `INSERT INTO girls (name, age, city, tribe, image_url, resume_url)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, age || null, city || null, tribe || null, imageUrl, pdfUrl]
      );
    }

    else {
      return res.status(400).json({ error: 'gender is required' });
    }

    res.json({ message: 'נשמר בהצלחה 🚀' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================
// START SERVER
// =====================
app.listen(3000, () => {
  console.log('Server running on port 3000');
});