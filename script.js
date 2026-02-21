let interviewList = [];
let rejectedList = [];

let totalCount = document.getElementById('total-count');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');
// console.log(totalCount.innerText);
// console.log(interviewCount.innerText);
// console.log(rejectedCount.innerText);

const btnAllFilter = document.getElementById('btn-all-filter');
const btnInterviewFilter = document.getElementById('btn-interview-filter');
const btnRejectedFilter = document.getElementById('btn-rejected-filter');

const allAvailableJobs = document.getElementById('all-available-jobs');


function jobsCounter() {
    totalCount.innerText = allAvailableJobs.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;
}
jobsCounter();

function toggleBtnStyle(id) {
    // console.log('all btn click', id);
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