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

// ... previous code ...

const mainContainer = document.querySelector('main');

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-interview')) {
        handleInterviewClick(event);
    } else if (event.target.classList.contains('btn-rejected')) {
        handleRejectedClick(event);
    } else if (event.target.classList.contains('btn-delete') || event.target.classList.contains('fa-trash-can')) {
        handleDeleteClick(event);
    }
});

function handleInterviewClick(event) {
    const jobCard = event.target.closest('.job-container');
    if (!jobCard) return;

    const jobProvider = jobCard.querySelector('.job-provider')?.innerText || '';
    if (!jobProvider) return;

    const cardInfo = {
        jobProvider: jobProvider,
        jobTitle: jobCard.querySelector('.job-title')?.innerText || '',
        locationTypeSalary: jobCard.querySelector('.location-type-salary')?.innerText || '',
        jobDetails: jobCard.querySelector('.job-details')?.innerText || ''
    };

    // Remove from rejected list
    rejectedList = rejectedList.filter(item => item.jobProvider !== jobProvider);

    // Add to interview list if not already present
    if (!interviewList.some(item => item.jobProvider === jobProvider)) {
        interviewList.push(cardInfo);
    }

    // Update status in main card
    updateJobStatus(jobProvider, 'INTERVIEW');

    calculateCount();
    updateAvailableJobsCount();
    refreshFilteredView();
}

function handleRejectedClick(event) {
    const jobCard = event.target.closest('.job-container');
    if (!jobCard) return;

    const jobProvider = jobCard.querySelector('.job-provider')?.innerText || '';
    if (!jobProvider) return;

    const cardInfo = {
        jobProvider: jobProvider,
        jobTitle: jobCard.querySelector('.job-title')?.innerText || '',
        locationTypeSalary: jobCard.querySelector('.location-type-salary')?.innerText || '',
        jobDetails: jobCard.querySelector('.job-details')?.innerText || ''
    };

    // Remove from interview list
    interviewList = interviewList.filter(item => item.jobProvider !== jobProvider);

    // Add to rejected list if not already present
    if (!rejectedList.some(item => item.jobProvider === jobProvider)) {
        rejectedList.push(cardInfo);
    }

    // Update status in main card
    updateJobStatus(jobProvider, 'REJECTED');

    calculateCount();
    updateAvailableJobsCount();
    refreshFilteredView();
}

function handleDeleteClick(event) {
    const deleteButton = event.target.closest('button');
    if (!deleteButton) return;

    const jobCard = deleteButton.closest('.job-container');
    if (!jobCard) return;

    const jobProvider = jobCard.querySelector('.job-provider')?.innerText || '';
    if (!jobProvider) return;

    // Remove from main view
    jobCard.remove();

    // Remove from lists
    interviewList = interviewList.filter(item => item.jobProvider !== jobProvider);
    rejectedList = rejectedList.filter(item => item.jobProvider !== jobProvider);

    calculateCount();
    updateAvailableJobsCount();
    refreshFilteredView();
}

function updateJobStatus(jobProvider, status) {
    for (let card of allJobsCard.children) {
        const providerElement = card.querySelector('.job-provider');
        if (providerElement && providerElement.innerText === jobProvider) {
            const statusDiv = card.querySelector('.job-status');
            if (statusDiv) {
                if (status === 'INTERVIEW') {
                    statusDiv.innerHTML = '<p class="bg-green-100 text-[#10B981] font-medium py-2 px-4 w-35 rounded-sm">INTERVIEW</p>';
                } else if (status === 'REJECTED') {
                    statusDiv.innerHTML = '<p class="bg-red-100 text-[#EF4444] font-medium py-2 px-4 w-35 rounded-sm">REJECTED</p>';
                }
            }
            break;
        }
    }
}

function refreshFilteredView() {
    if (btnInterviewFilter.classList.contains('active-tab')) {
        renderInterview();
    } else if (btnRejectedFilter.classList.contains('active-tab')) {
        renderRejected();
    }
}

function renderInterview() {
    filteredJobList.innerHTML = '';

    if (interviewList.length === 0) {
        filteredJobList.innerHTML = `
        <div class="text-center p-10 md:p-25 border-2 border-purple-700 rounded-xl md:mt-10">
            <h2 class="text-8xl text-blue-500"><i class="fa-regular fa-file-lines"></i></h2>
            <br>
            <p class="text-4xl font-bold">No Jobs for Interview</p>
            <br>
            <p>Check back soon for new job opportunities</p>
        </div>`;
        return;
    }

    for (let interview of interviewList) {
        filteredJobList.appendChild(createJobCard(interview, 'INTERVIEW'));
    }
}

function renderRejected() {
    filteredJobList.innerHTML = '';

    if (rejectedList.length === 0) {
        filteredJobList.innerHTML = `
        <div class="text-center p-10 md:p-25 border-2 border-purple-700 rounded-xl md:mt-10">
            <h2 class="text-8xl text-blue-500"><i class="fa-regular fa-file-lines"></i></h2>
            <br>
            <p class="text-4xl font-bold">No Jobs Rejected</p>
            <br>
            <p>Check back soon for new job opportunities</p>
        </div>`;
        return;
    }

    for (let rejected of rejectedList) {
        filteredJobList.appendChild(createJobCard(rejected, 'REJECTED'));
    }
}

function createJobCard(job, status) {
    let newDiv = document.createElement('div');
    newDiv.className = 'job-container p-4 border border-blue-200 bg-gray-50 rounded-sm';

    const statusClass = status === 'INTERVIEW' ? 'bg-green-100 text-[#10B981]' : 'bg-red-100 text-[#EF4444]';

    newDiv.innerHTML = `
    <div class="flex justify-between">
        <h2 class="job-provider text-[18px] font-semibold">${job.jobProvider}</h2>
        <button class="btn-delete cursor-pointer bg-white p-1 rounded-sm text-red-500 border border-[#EF4444]">
            <i class="fa-regular fa-trash-can"></i>
        </button>
    </div>
    <div class="space-y-2">
        <p class="job-title text-[#64748B]">${job.jobTitle}</p>
        <br>
        <p class="location-type-salary text-[#64748B]">${job.locationTypeSalary}</p>
        <br>
        <p class="${statusClass} font-medium py-2 px-4 w-35 rounded-sm">${status}</p>
        <p class="job-details text-justify">${job.jobDetails}</p>
        <div class="flex gap-4">
            <button class="btn-interview p-2 w-25 md:w-30 rounded-sm md:font-bold text-[#10B981] border md:border-2 border-[#10B981] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">INTERVIEW</button>
            <button class="btn-rejected p-2 w-25 md:w-30 rounded-sm md:font-bold text-[#EF4444] border md:border-2 border-[#EF4444] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">REJECTED</button>
        </div>
    </div>`;

    return newDiv;
}
