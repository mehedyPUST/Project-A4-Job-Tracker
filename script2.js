let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');

const btnAllFilter = document.getElementById('btn-all-filter');
const btnInterviewFilter = document.getElementById('btn-interview-filter');
const btnRejectedFilter = document.getElementById('btn-rejected-filter');

const allAvailableJobs = document.getElementById('all-available-jobs');
const filteredJobList = document.getElementById('filtered-job-list');

const availableJobsCount = document.querySelector('section.flex.justify-between p span');

/* ================= COUNTER ================= */

function jobsCounter() {
    totalCount.innerText = allAvailableJobs.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (availableJobsCount) {
        availableJobsCount.innerText = allAvailableJobs.children.length;
    }
}
jobsCounter();

/* ================= BUTTON STYLE ================= */

function toggleBtnStyle(id) {
    btnAllFilter.classList.remove('bg-blue-500', 'text-white');
    btnInterviewFilter.classList.remove('bg-blue-500', 'text-white');
    btnRejectedFilter.classList.remove('bg-blue-500', 'text-white');

    btnAllFilter.classList.add('bg-gray-200', 'text-gray-800');
    btnInterviewFilter.classList.add('bg-gray-200', 'text-gray-800');
    btnRejectedFilter.classList.add('bg-gray-200', 'text-gray-800');

    const clicked = document.getElementById(id);
    clicked.classList.remove('bg-gray-200', 'text-gray-800');
    clicked.classList.add('bg-blue-500', 'text-white');
}

/* ================= FILTER BUTTONS ================= */

btnAllFilter.addEventListener('click', function () {
    toggleBtnStyle('btn-all-filter');

    allAvailableJobs.style.display = 'block';
    filteredJobList.innerHTML = '';
});

btnInterviewFilter.addEventListener('click', function () {
    toggleBtnStyle('btn-interview-filter');

    allAvailableJobs.style.display = 'none';
    renderInterviewList();
});

btnRejectedFilter.addEventListener('click', function () {
    toggleBtnStyle('btn-rejected-filter');

    allAvailableJobs.style.display = 'none';
    renderRejectedList();
});

/* ================= RENDER FUNCTIONS ================= */

function renderInterviewList() {
    filteredJobList.innerHTML = '';

    if (interviewList.length === 0) {
        filteredJobList.innerHTML =
            '<p class="text-center text-gray-500 p-4">There is no job selected</p>';
        return;
    }

    interviewList.forEach(item => {
        createFilteredCard(item, 'INTERVIEW');
    });
}

function renderRejectedList() {
    filteredJobList.innerHTML = '';

    if (rejectedList.length === 0) {
        filteredJobList.innerHTML =
            '<p class="text-center text-gray-500 p-4">There is no job selected</p>';
        return;
    }

    rejectedList.forEach(item => {
        createFilteredCard(item, 'REJECTED');
    });
}

/* ================= CARD CREATOR ================= */

function createFilteredCard(data, type) {
    let div = document.createElement('div');
    div.className = 'flex justify-between p-4 border bg-gray-50 rounded-sm';

    const statusColor =
        type === 'INTERVIEW'
            ? 'text-[#10B981] border-[#10B981]'
            : 'text-[#EF4444] border-[#EF4444]';

    div.innerHTML = `
        <div class="space-y-2">
            <h2 class="job-provider text-[18px] font-semibold">${data.jobProvider}</h2>
            <p class="job-title text-[#64748B]">${data.jobTitle}</p>
            <br>
            <p class="location-type-salary text-[#64748B]">${data.locationTypeSalary}</p>
            <br>
            <p class="job-status border-2 font-medium py-2 px-4 w-35 rounded-sm ${statusColor}">
                ${type}
            </p>
            <p class="job-details">${data.jobDetails}</p>
            <div class="flex gap-4">
                <button class="btn-interview py-2 px-4 w-30 rounded-sm font-bold text-[#10B981] border-2 border-[#10B981]">
                    INTERVIEW
                </button>
                <button class="btn-rejected py-2 px-4 w-30 rounded-sm font-bold text-[#EF4444] border-2 border-[#EF4444]">
                    REJECTED
                </button>
            </div>
        </div>
        <div>
            <button class="bg-white p-1 rounded-sm text-red-500 border border-[#EF4444]">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>
    `;

    filteredJobList.appendChild(div);
}

/* ================= MAIN JOB CLICK HANDLER ================= */

allAvailableJobs.addEventListener('click', function (event) {
    const target = event.target;

    // Interview / Rejected button
    if (target.classList.contains('btn-interview') ||
        target.classList.contains('btn-rejected')) {

        const card = target.closest('.flex.justify-between');
        const jobProvider = card.querySelector('.job-provider').innerText;
        const jobTitle = card.querySelector('.job-title').innerText;
        const locationTypeSalary = card.querySelector('.location-type-salary').innerText;
        const jobDetails = card.querySelector('.job-details').innerText;
        const jobStatusElement = card.querySelector('.job-status');

        const type = target.classList.contains('btn-interview')
            ? 'INTERVIEW'
            : 'REJECTED';

        jobStatusElement.innerText = type;
        jobStatusElement.className =
            `job-status border-2 font-medium py-2 px-4 w-35 rounded-sm ${type === 'INTERVIEW'
                ? 'text-[#10B981] border-[#10B981]'
                : 'text-[#EF4444] border-[#EF4444]'
            }`;

        const cardInfo = {
            jobProvider,
            jobTitle,
            locationTypeSalary,
            jobDetails
        };

        interviewList = interviewList.filter(i => i.jobProvider !== jobProvider);
        rejectedList = rejectedList.filter(i => i.jobProvider !== jobProvider);

        if (type === 'INTERVIEW') interviewList.push(cardInfo);
        else rejectedList.push(cardInfo);

        jobsCounter();

        if (btnInterviewFilter.classList.contains('bg-blue-500')) renderInterviewList();
        if (btnRejectedFilter.classList.contains('bg-blue-500')) renderRejectedList();
    }

    // Delete
    if (target.classList.contains('fa-trash-can') ||
        target.closest('.bg-white.p-1')) {

        const card = target.closest('.flex.justify-between');
        const jobProvider = card.querySelector('.job-provider').innerText;

        interviewList = interviewList.filter(i => i.jobProvider !== jobProvider);
        rejectedList = rejectedList.filter(i => i.jobProvider !== jobProvider);

        card.remove();
        jobsCounter();

        if (btnInterviewFilter.classList.contains('bg-blue-500')) renderInterviewList();
        if (btnRejectedFilter.classList.contains('bg-blue-500')) renderRejectedList();
    }
});