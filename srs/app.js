// app.js - Full CRUD Integration Version (Add & Edit via Modal)

// متغيرات عشان نعرف إحنا بنعدل ولا بنضيف
let isEditMode = false;
let currentEditId = null;

// 1. جلب البيانات وعرضها من السيرفر
async function loadStudents() {
    const container = document.getElementById('data-container');
    if (!container) return;

    try {
        const response = await fetch('http://localhost:3000/api/students');
        const studentsData = await response.json();
        renderList(studentsData);
    } catch (error) {
        console.error('Error fetching students:', error);
        container.innerHTML = '<p style="color:red">⚠️ Error: Could not connect to the server.</p>';
    }
}

// 2. رسم القائمة مع زراير التحكم
function renderList(data) {
    const container = document.getElementById('data-container');
    container.innerHTML = ''; 

    data.forEach(student => {
        const statusClass = student.status.includes('Active') ? 'status-active' : 'status-suspended';
        const item = document.createElement('div');
        item.className = 'data-item';
        
        // تحويل بيانات الطالب لـ String عشان نعرف نبعتها لوظيفة التعديل
        const studentJson = JSON.stringify(student).replace(/"/g, '&quot;');

        item.innerHTML = `
            <div style="flex: 2;">
                <strong>ID: ${student.student_id}</strong> - ${student.name}
                <br><small>Year: ${student.academic_year} | Email: ${student.email}</small>
            </div>
            <div class="${statusClass}" style="margin-right: 10px;">
                ${student.status}
            </div>
            <div class="actions">
                <button onclick="openEditModal(${studentJson})" class="edit-btn">Edit</button>
                <button onclick="deleteStudent(${student.id})" class="delete-btn">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
}

// 3. فتح الـ Modal للإضافة
document.getElementById('open-modal-btn').onclick = () => {
    isEditMode = false;
    currentEditId = null;
    document.getElementById('modal-title').innerText = "Add New Student";
    document.getElementById('student-form').reset();
    document.getElementById('stu-id').disabled = false; // تفعيل الـ ID في الإضافة
    document.getElementById('student-modal').style.display = 'block';
};

// 4. فتح الـ Modal للتعديل ببيانات الطالب كاملة
function openEditModal(student) {
    isEditMode = true;
    currentEditId = student.id;
    
    document.getElementById('modal-title').innerText = "Edit Student Details";
    
    // نملأ الفورم بالبيانات الحالية
    document.getElementById('stu-id').value = student.student_id;
    document.getElementById('stu-id').disabled = true; // ممنوع تعديل الـ ID
    document.getElementById('stu-name').value = student.name;
    document.getElementById('stu-email').value = student.email;
    document.getElementById('stu-year').value = student.academic_year;
    document.getElementById('stu-status').value = student.status;

    document.getElementById('student-modal').style.display = 'block';
}

// 5. حفظ البيانات (إضافة أو تعديل)
document.getElementById('student-form').onsubmit = async (e) => {
    e.preventDefault();
    
    const studentData = {
        student_id: document.getElementById('stu-id').value,
        name: document.getElementById('stu-name').value,
        email: document.getElementById('stu-email').value,
        academic_year: document.getElementById('stu-year').value,
        status: document.getElementById('stu-status').value
    };

    const url = isEditMode 
        ? `http://localhost:3000/api/students/${currentEditId}` 
        : 'http://localhost:3000/api/students';
    
    const method = isEditMode ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });

        const result = await response.json();
        alert(result.message);
        
        document.getElementById('student-modal').style.display = 'none';
        loadStudents(); 
    } catch (error) {
        alert('❌ Error saving data. Check server.');
    }
};

// 6. مسح طالب
async function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/students/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            alert(result.message);
            loadStudents();
        } catch (error) {
            alert('❌ Failed to delete student.');
        }
    }
}

// 7. البحث
document.getElementById('search-input').addEventListener('input', async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const response = await fetch('http://localhost:3000/api/students');
    const allStudents = await response.json();

    const filtered = allStudents.filter(s => 
        s.name.toLowerCase().includes(searchTerm) || 
        s.student_id.includes(searchTerm)
    );
    renderList(filtered);
});

// قفل الـ Modal
document.getElementById('close-modal').onclick = () => {
    document.getElementById('student-modal').style.display = 'none';
};

// تشغيل عند التحميل
document.addEventListener('DOMContentLoaded', loadStudents);