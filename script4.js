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

const availableJobsWrapper = document.querySelector('section.flex.justify-between p');

/* ================= EMPTY MESSAGE ================= */

function showEmptyMessage() {
    filteredJobList.innerHTML = `
    <section>
        <div class="p-4 border border-blue-200 bg-gray-50 rounded-sm text-center">
            <h2 class="text-9xl">
                <i class="fa-regular fa-file-lines"></i>
            </h2>
            <h3 class="text-2xl">No jobs available</h3>
            <p>Check back soon for new job opportunities</p>
        </div>
    </section>`;
}

/* ================= COUNTER ================= */

function jobsCounter(activeTab = "all") {

    const totalJobs = allAvailableJobs.children.length;
    const interviewJobs = interviewList.length;
    const rejectedJobs = rejectedList.length;

    totalCount.innerText = totalJobs;
    interviewCount.innerText = interviewJobs;
    rejectedCount.innerText = rejectedJobs;

    if (!availableJobsWrapper) return;

    if (activeTab === "all") {
        availableJobsWrapper.innerHTML = `<span>${totalJobs}</span> Jobs`;
    }

    if (activeTab === "interview") {
        availableJobsWrapper.innerHTML =
            `<span>${interviewJobs}</span> of ${totalJobs} Jobs`;
    }

    if (activeTab === "rejected") {
        availableJobsWrapper.innerHTML =
            `<span>${rejectedJobs}</span> of ${totalJobs} Jobs`;
    }
}

jobsCounter();

/* ================= BUTTON STYLE ================= */

function toggleBtnStyle(id) {

    const buttons = [btnAllFilter, btnInterviewFilter, btnRejectedFilter];

    buttons.forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-800');
    });

    const clicked = document.getElementById(id);
    clicked.classList.remove('bg-gray-200', 'text-gray-800');
    clicked.classList.add('bg-blue-500', 'text-white');
}

/* ================= FILTER BUTTONS ================= */

btnAllFilter.addEventListener('click', function () {
    toggleBtnStyle('btn-all-filter');
    allAvailableJobs.style.display = 'block';
    filteredJobList.innerHTML = '';
    jobsCounter("all");
});

btnInterviewFilter.addEventListener('click', function () {
    toggleBtnStyle('btn-interview-filter');
    allAvailableJobs.style.display = 'none';
    renderInterviewList();
    jobsCounter("interview");
});

btnRejectedFilter.addEventListener('click', function () {
    toggleBtnStyle('btn-rejected-filter');
    allAvailableJobs.style.display = 'none';
    renderRejectedList();
    jobsCounter("rejected");
});

/* ================= RENDER FUNCTIONS ================= */

function renderInterviewList() {

    filteredJobList.innerHTML = '';

    if (interviewList.length === 0) {
        showEmptyMessage();
        return;
    }

    interviewList.forEach(item => {
        createFilteredCard(item, 'INTERVIEW');
    });
}

function renderRejectedList() {

    filteredJobList.innerHTML = '';

    if (rejectedList.length === 0) {
        showEmptyMessage();
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

/* ================= MAIN EVENT HANDLER ================= */

function handleJobAction(event) {

    const target = event.target;

    /* ===== STATUS CHANGE ===== */

    if (target.classList.contains('btn-interview') ||
        target.classList.contains('btn-rejected')) {

        const card = target.closest('.flex.justify-between');

        const jobProvider = card.querySelector('.job-provider').innerText;
        const jobTitle = card.querySelector('.job-title').innerText;
        const locationTypeSalary = card.querySelector('.location-type-salary').innerText;
        const jobDetails = card.querySelector('.job-details').innerText;

        const type = target.classList.contains('btn-interview')
            ? 'INTERVIEW'
            : 'REJECTED';

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

        updateCounterByActiveTab();
    }

    /* ===== DELETE ===== */

    if (target.classList.contains('fa-trash-can') ||
        target.closest('.bg-white.p-1')) {

        const card = target.closest('.flex.justify-between');
        const jobProvider = card.querySelector('.job-provider').innerText;

        interviewList = interviewList.filter(i => i.jobProvider !== jobProvider);
        rejectedList = rejectedList.filter(i => i.jobProvider !== jobProvider);

        card.remove();

        updateCounterByActiveTab();
    }
}

allAvailableJobs.addEventListener('click', handleJobAction);
filteredJobList.addEventListener('click', handleJobAction);

/* ================= ACTIVE TAB UPDATE ================= */

function updateCounterByActiveTab() {

    if (btnInterviewFilter.classList.contains('bg-blue-500')) {
        renderInterviewList();
        jobsCounter("interview");
    }
    else if (btnRejectedFilter.classList.contains('bg-blue-500')) {
        renderRejectedList();
        jobsCounter("rejected");
    }
    else {
        jobsCounter("all");
    }
}