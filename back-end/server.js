require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET_KEY; 

// Khởi tạo Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('LỖI KHỞI ĐỘNG: Không thể kết nối DB:', err.stack);
  } else {
    console.log('✅ KẾT NỐI DB THÀNH CÔNG!');
    release();
  }
});


// --- ROUTE KIỂM TRA KẾT NỐI DB ---
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.status(200).json({
            status: "OK",
            message: "Node.js & PostgreSQL connected successfully!",
            dbTime: result.rows[0].now,
        });
    } catch (err) {
        console.error("Lỗi kết nối DB:", err.message);
        res.status(500).json({ status: "Error", message: "Không thể kết nối tới Database." });
    }
});


// --- 🔑 ROUTE ĐĂNG NHẬP (Lấy Token) ---
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`>>> Đã nhận request ĐĂNG NHẬP cho user: ${username}`);

    try {
        const userResult = await pool.query(
            'SELECT user_id, password_hash, role_id FROM users WHERE username = $1',
            [username]
        );
        
        console.log('>>> Đã truy vấn DB xong.'); 

        if (userResult.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });
        }

        const user = userResult.rows[0];
        
        const isPasswordValid = (password === user.password_hash); 
        
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });
        }
        
        // Tạo JWT
        const token = jwt.sign(
            { user_id: user.user_id, role_id: user.role_id },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ success: true, token });
    } catch (err) {
        console.error("LỖI XỬ LÝ ĐĂNG NHẬP (CATCH):", err.message);
        res.status(500).send('Lỗi Server');
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Node.js đang chạy tại http://localhost:${PORT}`);
});