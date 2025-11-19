// applicant.js

// --------------------
// Utility: Get stored applications
// --------------------
function getApplications() {
    return JSON.parse(localStorage.getItem('applications')) || [];
}

// --------------------
// Utility: Save applications to localStorage
// --------------------
function saveApplications(applications) {
    localStorage.setItem('applications', JSON.stringify(applications));
}

// --------------------
// Handle Applicant Form Submission
// --------------------
function handleApplicantFormSubmission() {
    const form = document.getElementById('applicantForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const university = document.getElementById('university').value.trim();
        const courses = Array.from(document.querySelectorAll('input[name="courses"]:checked'))
                            .map(cb => cb.value);
        const documents = Array.from(document.querySelectorAll('input[name="documents"]'))
                              .map(doc => doc.value.trim())
                              .filter(doc => doc !== "");

        if (!fullName || !email || !university || courses.length < 1) {
            alert('Please fill all required fields and select at least one course.');
            return;
        }

        const newApp = {
            fullName,
            email,
            university,
            courses: courses.join(', '),
            documents,
            paymentProof: [], // For now empty, user can add later if needed
            status: 'Pending',
            notes: ''
        };

        const applications = getApplications();
        applications.push(newApp);
        saveApplications(applications);

        alert('Application submitted successfully!');
        form.reset();
        window.location.href = 'applicant_status.html'; // go to status page
    });
}

// --------------------
// Load Applications for Status Table (if exists)
// --------------------
function loadApplicantStatus() {
    const tableBody = document.querySelector('#applicationsTable tbody');
    if (!tableBody) return;

    const applications = getApplications();
    tableBody.innerHTML = '';

    if (applications.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 6;
        cell.style.textAlign = 'center';
        cell.textContent = "No applications submitted yet.";
        row.appendChild(cell);
        tableBody.appendChild(row);
        return;
    }

    applications.forEach(app => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${app.university}</td>
            <td>${app.courses}</td>
            <td>${app.documents.join(', ')}</td>
            <td>${app.paymentProof.join(', ')}</td>
            <td>${app.status}</td>
            <td>${app.notes || ''}</td>
        `;

        tableBody.appendChild(row);
    });
}

// --------------------
// Initialize on page load
// --------------------
document.addEventListener('DOMContentLoaded', () => {
    handleApplicantFormSubmission();
    loadApplicantStatus();
});
