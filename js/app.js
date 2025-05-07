const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Inisialisasi database SQLite
const db = new sqlite3.Database('users.db');

// Membuat tabel users jika belum ada
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        email TEXT NOT NULL,
        birthdate TEXT NOT NULL,
        phone TEXT NOT NULL,
        gender TEXT NOT NULL
    )
`);

// Endpoint untuk sign-up
app.post('/signup', async (req, res) => {
    const { username, password, email, birthdate, phone, gender } = req.body;

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan data pengguna ke dalam database
    db.run(
        'INSERT INTO users (username, password, email, birthdate, phone, gender) VALUES (?, ?, ?, ?, ?, ?)',
        [username, hashedPassword, email, birthdate, phone, gender],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            res.json({ message: 'User registered successfully' });
        }
    );
});

// Endpoint untuk sign-in
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    // Ambil data pengguna dari database berdasarkan username
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Periksa apakah pengguna ditemukan dan kata sandi sesuai
        if (!row || !(await bcrypt.compare(password, row.password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful' });
    });
});

// Jalankan server pada port tertentu
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
