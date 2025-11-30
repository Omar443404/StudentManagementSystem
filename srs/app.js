// Step 1: Mock Data (English)
const studentsData = [
  { "ID": "221001911", "Name": "Ahmed Helmy", "Year": 4, "Status": "Active - Enrolled", "Courses": 5 },
  { "ID": "221000268", "Name": "Mohamed Emad", "Year": 3, "Status": "Active - Probation", "Courses": 4 },
  { "ID": "211001922", "Name": "Mohamed Khaled", "Year": 4, "Status": "Suspended", "Courses": 2 }
];

// Function 1: Load Students
function loadStudents() {
    const container = document.getElementById('data-container');
    if (!container) return;
    container.innerHTML = ''; 

    studentsData.forEach(student => {
        const statusClass = student.Status.includes('Active') ? 'status-active' : 'status-suspended';
        const item = document.createElement('div');
        item.className = 'data-item';
        
        
        item.innerHTML = `
            <div>
                <strong>ID: ${student.ID}</strong> - ${student.Name}
                <br>Year: ${student.Year} | Courses: ${student.Courses}
            </div>
            <div class="${statusClass}">
                Status: ${student.Status}
            </div>
        `;
        container.appendChild(item);
    });
}


function addStudentAction() {
    const resultElement = document.getElementById('action-result-display');
    resultElement.style.display = 'block'; 
    resultElement.innerHTML = '✅ New student added successfully (Simulation)';
}


document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    document.getElementById('add-btn').addEventListener('click', addStudentAction);
});
