// Attendance Tracker App
const MAX_SUBJECTS = 7;
const THRESHOLD = 75;

let subjects = JSON.parse(localStorage.getItem('attendanceSubjects')) || [];

// DOM Elements
const subjectList = document.getElementById('subjectList');
const addSubjectBtn = document.getElementById('addSubjectBtn');
const modal = document.getElementById('modal');
const subjectNameInput = document.getElementById('subjectName');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const avgAttendanceEl = document.getElementById('avgAttendance');
const subjectCountEl = document.getElementById('subjectCount');

// Initialize
function init() {
    renderSubjects();
    updateStats();
}

// Save to localStorage
function saveData() {
    localStorage.setItem('attendanceSubjects', JSON.stringify(subjects));
}

// Calculate percentage
function calculatePercentage(attended, total) {
    if (total === 0) return 0;
    return Math.round((attended / total) * 100);
}

// Calculate classes needed to reach 75%
function classesNeeded(attended, total) {
    if (total === 0) return 1;
    const currentPercentage = (attended / total) * 100;
    if (currentPercentage >= THRESHOLD) return 0;
    
    // Formula: (0.75 * (total + x) = attended + x)
    // 0.75*total + 0.75*x = attended + x
    // 0.75*total - attended = 0.25*x
    // x = (0.75*total - attended) / 0.25
    const needed = Math.ceil((0.75 * total - attended) / 0.25);
    return needed > 0 ? needed : 0;
}

// Render all subjects
function renderSubjects() {
    subjectList.innerHTML = '';
    
    if (subjects.length === 0) {
        subjectList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <h3>No subjects yet</h3>
                <p>Add up to ${MAX_SUBJECTS} subjects to track your attendance and stay eligible for exams!</p>
            </div>
        `;
        addSubjectBtn.disabled = false;
        return;
    }
    
    subjects.forEach((subject, index) => {
        const percentage = calculatePercentage(subject.attended, subject.total);
        const isEligible = percentage >= THRESHOLD;
        const needed = classesNeeded(subject.attended, subject.total);
        
        const subjectCard = document.createElement('div');
        subjectCard.className = 'subject-card';
        subjectCard.innerHTML = `
            <div class="subject-header">
                <span class="subject-name">${subject.name}</span>
                <button class="delete-btn" onclick="deleteSubject(${index})">Delete</button>
            </div>
            
            <div class="progress-container">
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill ${isEligible ? 'eligible' : 'not-eligible'}" 
                         style="width: ${Math.min(percentage, 100)}%">
                        ${percentage}%
                    </div>
                    <div class="progress-marker"></div>
                </div>
            </div>
            
            <div class="subject-info">
                <span class="attendance-text">Attended: ${subject.attended}/${subject.total} classes</span>
                <span class="status ${isEligible ? 'eligible' : 'not-eligible'}">
                    ${isEligible ? '✓ ELIGIBLE' : `⚠ Need ${needed} more`}
                </span>
            </div>
            
            <div class="buttons">
                <button class="btn-present" onclick="markAttendance(${index}, true)">
                    <span>✓</span> Present
                </button>
                <button class="btn-absent" onclick="markAttendance(${index}, false)">
                    <span>✗</span> Absent
                </button>
            </div>
        `;
        
        subjectList.appendChild(subjectCard);
    });
    
    // Disable add button if max reached
    addSubjectBtn.disabled = subjects.length >= MAX_SUBJECTS;
    if (subjects.length >= MAX_SUBJECTS) {
        addSubjectBtn.textContent = 'Max 7 Subjects';
    } else {
        addSubjectBtn.textContent = '+ Add Subject';
    }
}

// Update statistics
function updateStats() {
    subjectCountEl.textContent = `${subjects.length}/${MAX_SUBJECTS}`;
    
    if (subjects.length === 0) {
        avgAttendanceEl.textContent = '0%';
        return;
    }
    
    let totalPercentage = 0;
    subjects.forEach(subject => {
        totalPercentage += calculatePercentage(subject.attended, subject.total);
    });
    
    const avg = Math.round(totalPercentage / subjects.length);
    avgAttendanceEl.textContent = `${avg}%`;
}

// Mark attendance
function markAttendance(index, isPresent) {
    subjects[index].total++;
    if (isPresent) {
        subjects[index].attended++;
    }
    saveData();
    renderSubjects();
    updateStats();
}

// Delete subject
function deleteSubject(index) {
    if (confirm('Are you sure you want to delete this subject?')) {
        subjects.splice(index, 1);
        saveData();
        renderSubjects();
        updateStats();
    }
}

// Add new subject
function addSubject() {
    const name = subjectNameInput.value.trim();
    
    if (!name) {
        alert('Please enter a subject name');
        return;
    }
    
    if (subjects.length >= MAX_SUBJECTS) {
        alert(`Maximum ${MAX_SUBJECTS} subjects allowed`);
        return;
    }
    
    subjects.push({
        name: name,
        attended: 0,
        total: 0
    });
    
    saveData();
    subjectNameInput.value = '';
    modal.classList.add('hidden');
    renderSubjects();
    updateStats();
}

// Close modal function
function closeModal() {
    modal.classList.add('hidden');
    subjectNameInput.value = '';
}

// Event Listeners
addSubjectBtn.addEventListener('click', () => {
    if (subjects.length < MAX_SUBJECTS) {
        modal.classList.remove('hidden');
        subjectNameInput.focus();
    }
});

saveBtn.addEventListener('click', addSubject);

cancelBtn.addEventListener('click', closeModal);

// Modal close button
document.getElementById('modalClose').addEventListener('click', closeModal);

subjectNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addSubject();
    }
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Start the app
init();