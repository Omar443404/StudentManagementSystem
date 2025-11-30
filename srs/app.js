// Start of Student Management System (SMS) Logic for Phase 1 Demo
// This file is used for the Running Demo to show Student Data.

// Step 1: Define the Mock Data for Students (بيانات الطلاب الوهمية)
const studentsData = [
  {
    "ID": "221001911",
    "Name": "Ahmed Helmy",
    "Year": 4,
    "Status": "Active - Enrolled",
    "Courses": 5
  },
  {
    "ID": "221000268",
    "Name": "Mohamed Emad",
    "Year": 3,
    "Status": "Active - Probation",
    "Courses": 4
  },
  {
    "ID": "211001922",
    "Name": "Mohamed Khaled",
    "Year": 4,
    "Status": "Suspended",
    "Courses": 2
  }
];

// FUNCTION 1: Display the Student Data on the UI (عرض البيانات في الصفحة)
function loadStudents() {
    // لاحظ إننا هنا بننادي على الـ ID الجديد اللي في ملف HTML
    const container = document.getElementById('data-container');
    
    // Check if the container exists
    if (!container) return;

    studentsData.forEach(student => {
        // نحدد لون الحالة (أخضر للنشط، برتقالي للموقوف)
        const statusClass = student.Status.includes('Active') ? 'status-active' : 'status-suspended';
        
        const item = document.createElement('div');
        item.className = 'data-item';
        item.innerHTML = `
            <div>
                <strong>ID: ${student.ID}</strong> - ${student.Name}
                <br>السنة: ${student.Year} | المقررات: ${student.Courses}
            </div>
            <div class="${statusClass}">
                الحالة: ${student.Status}
            </div>
        `;
        container.appendChild(item);
    });
}

// FUNCTION 2: Simulate adding a new student (محاكاة زر الإضافة)
function addStudentAction() {
    const resultElement = document.getElementById('action-result-display');
    // رسالة وهمية عشان نثبت إن الزرار شغال
    resultElement.innerHTML = '✅ تم إضافة طالب جديد بنجاح (Mock Action)';
    resultElement.style.color = '#065f46'; /* لون أخضر غامق */
}

// تشغيل الدالة أول ما الصفحة تفتح
loadStudents();

// End of Student Management System Logic