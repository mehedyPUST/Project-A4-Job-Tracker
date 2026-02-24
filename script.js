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