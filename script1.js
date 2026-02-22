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
const filteredJobList = document.getElementById('filtered-job-list');


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


allAvailableJobs.addEventListener('click', function (event) {
    console.log(event.target.classList.contains('btn-interview'));
    if (event.target.classList.contains('btn-interview')) {
        const everyCardInfoNode = event.target.parentNode.parentNode;
        const jobProvider = everyCardInfoNode.querySelector('.job-provider').innerText;
        const jobTitle = everyCardInfoNode.querySelector('.job-title').innerText;
        const locationTypeSalary = everyCardInfoNode.querySelector('.location-type-salary').innerText;
        const jobStatusText = everyCardInfoNode.querySelector('.job-status').innerText;
        const jobStatus = everyCardInfoNode.querySelector('.job-status');

        const jobDetails = everyCardInfoNode.querySelector('.job-details').innerText;

        const cardInfo = { jobProvider, jobTitle, locationTypeSalary, jobStatusText, jobDetails };
        // console.log(cardInfo);

        // console.log(jobTitle);
        const jobExist = interviewList.find(item => item.jobProvider == cardInfo.jobProvider);

        everyCardInfoNode.querySelector('.job-status').innerText = "INTERVIEW";
        if (!jobExist) {
            interviewList.push(cardInfo);
        }
        renderInterviewList();
    }


})
function renderInterviewList() {
    filteredJobList.innerHTML = '';
    for (let interview of interviewList) {
        console.log(interview);
        let div = document.createElement('div');
        div.className = 'flex justify-between p-4 border border-blue-200 bg-gray-50 rounded-sm';
        div.innerHTML = `
        <div class="space-y-2">
                <h2 class="job-provider text-[18px] font-semibold">Mobile First Corp</h2>
                <p class="job-title text-[#64748B]">React Native Developer</p>
                <br>
                <p class="location-type-salary text-[#64748B]">Remote • Full-time • $130,000 - $175,000</p>
                <br>

                <p class=" job-status bg-gray-200 font-medium py-2 px-4 w-35 rounded-sm ">NOT APPLIED</p>
                <p class="job-details">Build cross-platform mobile applications using React Native. Work on products
                    used by millions of
                    users worldwide.</p>
                <div class="flex gap-4">
                    <button
                        class="  py-2 px-4 w-30 rounded-sm font-bold  text-[#10B981] border-2 border-[#10B981]">INTERVIEW</button>

                    <button
                        class="  py-2 px-4 w-30 rounded-sm  font-bold text-[#EF4444] border-2 border-[#EF4444]">REJECTED</button>
                </div>
            </div>

            <div>
                <button class=" bg-white p-1  rounded-sm text-red-500 border border-[#EF4444]"><i
                        class="fa-regular fa-trash-can"></i></button>
            </div>
            `
    }
}