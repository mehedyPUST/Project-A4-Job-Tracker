let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById('total-count');
let pageLandTotal = document.getElementById('page-land-total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const allJobsCard = document.getElementById('all-available-jobs');
const allJobsEmptyMessage = document.getElementById('all-jobs-empty-message');
const filteredJobList = document.getElementById('filtered-job-list');

function calculateCount() {
    totalCount.innerText = allJobsCard.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
    pageLandTotal.innerText = allJobsCard.children.length;
    checkAllJobsEmptyState();
}
calculateCount();

function checkAllJobsEmptyState() {
    if (allJobsCard.children.length === 0) {
        allJobsEmptyMessage.classList.remove('hidden');
    } else {
        allJobsEmptyMessage.classList.add('hidden');
    }
}


// ... previous code ...

const btnAllFilter = document.getElementById('btn-all-filter');
const btnInterviewFilter = document.getElementById('btn-interview-filter');
const btnRejectedFilter = document.getElementById('btn-rejected-filter');

function toggleBtnStyle(id) {
    btnAllFilter.classList.remove('bg-blue-500', 'text-white', 'active-tab');
    btnInterviewFilter.classList.remove('bg-blue-500', 'text-white', 'active-tab');
    btnRejectedFilter.classList.remove('bg-blue-500', 'text-white', 'active-tab');

    btnAllFilter.classList.add('bg-gray-200', 'text-gray-800');
    btnInterviewFilter.classList.add('bg-gray-200', 'text-gray-800');
    btnRejectedFilter.classList.add('bg-gray-200', 'text-gray-800');

    const clicked = document.getElementById(id);
    if (clicked) {
        clicked.classList.remove('bg-gray-200', 'text-gray-800');
        clicked.classList.add('bg-blue-500', 'text-white', 'active-tab');
    }

    if (id == 'btn-interview-filter') {
        allJobsCard.classList.add('hidden');
        allJobsEmptyMessage.classList.add('hidden');
        filteredJobList.classList.remove('hidden');
        renderInterview();
    } else if (id == 'btn-rejected-filter') {
        allJobsCard.classList.add('hidden');
        allJobsEmptyMessage.classList.add('hidden');
        filteredJobList.classList.remove('hidden');
        renderRejected();
    } else if (id == 'btn-all-filter') {
        allJobsCard.classList.remove('hidden');
        filteredJobList.classList.add('hidden');
        checkAllJobsEmptyState();
    }
}

// Filter button click handlers
document.getElementById('btn-all-filter').addEventListener('click', function () {
    toggleBtnStyle('btn-all-filter');
    updateAvailableJobsCount();
});

document.getElementById('btn-interview-filter').addEventListener('click', function () {
    toggleBtnStyle('btn-interview-filter');
    updateAvailableJobsCount();
});

document.getElementById('btn-rejected-filter').addEventListener('click', function () {
    toggleBtnStyle('btn-rejected-filter');
    updateAvailableJobsCount();
});

function updateAvailableJobsCount() {
    const counterElement = document.getElementById('available-jobs-count');
    const total = parseInt(totalCount.innerText);

    if (btnAllFilter.classList.contains('active-tab')) {
        counterElement.innerHTML = `<p><span id="page-land-total">${total}</span> <span>Jobs </span></p>`;
    } else if (btnInterviewFilter.classList.contains('active-tab')) {
        counterElement.innerHTML = `<p><span id="page-land-total">${interviewList.length}</span> <span>of ${total} Jobs</span></p>`;
    } else if (btnRejectedFilter.classList.contains('active-tab')) {
        counterElement.innerHTML = `<p><span id="page-land-total">${rejectedList.length}</span> <span>of ${total} Jobs</span></p>`;
    }
}

updateAvailableJobsCount();