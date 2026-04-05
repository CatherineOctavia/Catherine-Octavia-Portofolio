import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import multer from 'multer';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('portfolio.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT,
    description TEXT,
    image_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    percentage INTEGER DEFAULT 0,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    organization TEXT,
    period TEXT,
    description TEXT,
    type TEXT
  );
`);

// Seed initial data if empty
const projectCount = db.prepare('SELECT count(*) as count FROM projects').get() as { count: number };
if (projectCount.count === 0) {
  db.prepare('INSERT INTO projects (title, category, description, image_url) VALUES (?, ?, ?, ?)').run(
    'Chinese Culinary Showcase', 'SCHOOL PROJECT', 'A comprehensive exploration and presentation of traditional Chinese dishes and their regional origins.', 'https://picsum.photos/seed/culinary/800/600'
  );
  db.prepare('INSERT INTO projects (title, category, description, image_url) VALUES (?, ?, ?, ?)').run(
    'Calligraphy Portfolio', 'ART', 'A collection of calligraphy works practiced during extracurricular sessions, focusing on traditional script styles.', 'https://picsum.photos/seed/calligraphy/800/600'
  );
  db.prepare('INSERT INTO projects (title, category, description, image_url) VALUES (?, ?, ?, ?)').run(
    'Mandarin Learning Journey', 'EDUCATION', 'Documenting my progress from HSK 1 to HSK 3 at 泗水中华语学习中心.', 'https://picsum.photos/seed/mandarin/800/600'
  );

  db.prepare('INSERT INTO skills (name, percentage) VALUES (?, ?)').run('Mandarin (HSK 3)', 85);
  db.prepare('INSERT INTO skills (name, percentage) VALUES (?, ?)').run('Public Speaking', 75);
  db.prepare('INSERT INTO skills (name, percentage) VALUES (?, ?)').run('Chinese Calligraphy', 25);
  db.prepare('INSERT INTO skills (name, percentage) VALUES (?, ?)').run('Cultural Research', 55);
  db.prepare('INSERT INTO skills (name, percentage) VALUES (?, ?)').run('Culinary Presentation', 60);
  db.prepare('INSERT INTO skills (name, percentage) VALUES (?, ?)').run('Language Translation', 45);

  db.prepare('INSERT INTO experience (title, organization, period, description, type) VALUES (?, ?, ?, ?, ?)').run(
    'Chinese Language Course', '泗水中华语学习中心', 'Present', 'Actively pursuing advanced Mandarin proficiency, currently HSK 3 certified.', 'Present'
  );
  db.prepare('INSERT INTO experience (title, organization, period, description, type) VALUES (?, ?, ?, ?, ?)').run(
    'Chinese Culinary Exploration', 'High School Assignment', 'School Project', 'Conducted in-depth research and presentations on traditional Chinese culinary specialties.', 'School Project'
  );
  db.prepare('INSERT INTO experience (title, organization, period, description, type) VALUES (?, ?, ?, ?, ?)').run(
    'Chinese Calligraphy', 'School Club', 'Extracurricular', 'Practiced the ancient art of calligraphy, learning various script styles.', 'Extracurricular'
  );
}

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for image uploads
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// API Routes
app.get('/api/projects', (req, res) => {
  const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
  res.json(projects);
});

app.post('/api/projects', upload.single('image'), (req, res) => {
  const { title, category, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;
  
  const result = db.prepare('INSERT INTO projects (title, category, description, image_url) VALUES (?, ?, ?, ?)').run(
    title, category, description, imageUrl
  );
  res.json({ id: result.lastInsertRowid });
});

app.get('/api/skills', (req, res) => {
  const skills = db.prepare('SELECT * FROM skills').all();
  res.json(skills);
});

app.get('/api/experience', (req, res) => {
  const experience = db.prepare('SELECT * FROM experience').all();
  res.json(experience);
});

// Serve static files
app.use('/uploads', express.static(uploadDir));

async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
