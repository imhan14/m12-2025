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

/**
 * 
 * @param {Array<number>} allowedRoles 
 */
const authorize = (allowedRoles) => (req, res, next) => {
 
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Yêu cầu token xác thực.' });
    }
    const token = authHeader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded; 

        if (!allowedRoles.includes(req.user.role_id)) {
            console.log(`>>> LOG: User ID ${req.user.user_id} bị từ chối truy cập (Role ${req.user.role_id}).`);
            return res.status(403).json({ success: false, message: 'Bạn không có quyền truy cập chức năng này.' });
        }

        next(); 
    } catch (err) {
        console.error("Lỗi xác thực Token:", err.message);
        return res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
};
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

app.get('/api/tasks', authorize([0, 1, 2, 3]), async (req, res) => {
    const { role_id, user_id } = req.user;
    let queryText = 'SELECT * FROM tasks ';
    const params = [];
    console.log(role_id)
    if (role_id === 2) { // Manager (Level 2)
        queryText += 'WHERE created_by = $1 ';
        params.push(user_id);
        console.log(`>>> LOG: Manager (ID ${user_id}) truy vấn tasks họ tạo.`);
    } else if (role_id === 3) { // Employee (Level 3)
        queryText += 'WHERE assigned_to = $1 ';
        params.push(user_id);
        console.log(`>>> LOG: Employee (ID ${user_id}) truy vấn tasks được giao.`);
    } 


    queryText += 'ORDER BY created_at DESC';

    try {
        const result = await pool.query(queryText, params);
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        console.error("Lỗi khi lấy Tasks:", err.message);
        res.status(500).send('Lỗi Server');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Node.js đang chạy tại http://localhost:${PORT}`);
});