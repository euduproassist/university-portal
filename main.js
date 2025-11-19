// main.js

// --------------------
// Dashboard Stats
// --------------------
function updateDashboardStats() {
    const applications = JSON.parse(localStorage.getItem('applications')) || [];

    // Check if elements exist on page
    const totalElem = document.getElementById('total-apps');
    const pendingElem = document.getElementById('pending-apps');

    if (totalElem) totalElem.textContent = applications.length;

    if (pendingElem) {
        const pendingCount = applications.filter(app => app.status === 'Pending').length;
        pendingElem.textContent = pendingCount;
    }
}

// --------------------
// Logout function
// --------------------
function logoutApplicant() {
    localStorage.removeItem('currentApplicant'); // clear any session data
    alert('You have been logged out!');
    location.href = 'index.html';
}

// --------------------
// Initialize on page load
// --------------------
document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutApplicant);
    }
});
