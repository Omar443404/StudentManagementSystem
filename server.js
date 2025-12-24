const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. الربط مع الداتابيز الأونلاين (Railway MySQL Connection)
const db = mysql.createConnection({
    host: 'shortline.proxy.rlwy.net', // العنوان الأونلاين الجديد
    user: 'root',
    password: 'rNoilgVpKcCGLskICIWNlzobSBiEHrjH', // الباسورد اللي مبعوتة في الـ URL
    database: 'railway', // اسم الداتابيز الافتراضي في Railway
    port: 51987 // البورت المخصص للربط الخارجي
});

db.connect(err => {
    if (err) {
        console.error('❌ Cloud Database connection failed: ' + err.stack);
        return;
    }
    console.log('✅ Connected to Railway MySQL Cloud! 🚀');
});

// 2. API لجلب كل الطلاب (Read)
app.get('/api/students', (req, res) => {
    const sql = "SELECT * FROM Students ORDER BY id DESC"; 
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 3. API لإضافة طالب جديد (Create)
app.post('/api/students', (req, res) => {
    const { student_id, name, email, academic_year, status } = req.body;
    const sql = "INSERT INTO Students (student_id, name, email, academic_year, status) VALUES (?, ?, ?, ?, ?)";
    
    db.query(sql, [student_id, name, email, academic_year, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Student added successfully!', id: result.insertId });
    });
});

// 4. API لمسح طالب (Delete)
app.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Students WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student deleted successfully!' });
    });
});

// 5. API لتعديل بيانات طالب (Update - Full Edit)
app.put('/api/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, academic_year, status } = req.body;
    
    const sql = "UPDATE Students SET name = ?, email = ?, academic_year = ?, status = ? WHERE id = ?";
    
    db.query(sql, [name, email, academic_year, status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student updated successfully!' });
    });
});

// تشغيل السيرفر على بورت Railway أو بورت 3000 محلياً
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));