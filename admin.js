// admin.js

// Save updated applications to localStorage
function saveApplications(applications) {
  localStorage.setItem('applications', JSON.stringify(applications));
}

// Load all applications for admin dashboards or requests page
function loadAdminApplications(tableId) {
  const tableBody = document.querySelector(`#${tableId} tbody`);
  tableBody.innerHTML = '';

  const applications = JSON.parse(localStorage.getItem('applications')) || [];

  if (applications.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 8;
    cell.style.textAlign = 'center';
    cell.textContent = "No applications submitted yet.";
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  applications.forEach((app, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${app.fullName}</td>
      <td>${app.email}</td>
      <td>${app.university}</td>
      <td>${app.courses}</td>
      <td>${app.documents.join(', ')}</td>
      <td class="status">${app.status}</td>
      <td><textarea class="note">${app.notes || ''}</textarea></td>
      <td>
        <button class="action-btn approve">Approve</button>
        <button class="action-btn reject">Reject</button>
        <button class="action-btn save-note">Save Note</button>
      </td>
    `;

    tableBody.appendChild(row);

    // Button actions
    row.querySelector('.approve').addEventListener('click', () => {
      applications[index].status = 'Approved';
      saveApplications(applications);
      loadAdminApplications(tableId);
    });

    row.querySelector('.reject').addEventListener('click', () => {
      applications[index].status = 'Rejected';
      saveApplications(applications);
      loadAdminApplications(tableId);
    });

    row.querySelector('.save-note').addEventListener('click', () => {
      applications[index].notes = row.querySelector('.note').value;
      saveApplications(applications);
      alert('Note saved!');
    });
  });
}

// Initialize admin page by passing the table id
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('adminApplicationsTable')) {
    loadAdminApplications('adminApplicationsTable');
  }
  if (document.getElementById('adminRequestsTable')) {
    loadAdminApplications('adminRequestsTable');
  }
});
