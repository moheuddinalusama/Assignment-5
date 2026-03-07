let allIssues = []


 



async function fetchIssues (){
    const url = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const result = await url.json();
    allIssues = result.data;
    displayIssues(allIssues);
    
};

function filterIssues(status, event) {
   
    const buttons = document.querySelectorAll('#filter-buttons button');
    buttons.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-soft');
    });
    event.target.classList.add('btn-primary');
    event.target.classList.remove('btn-soft');

   
    if (status === 'all') {
        displayIssues(allIssues);
    } else {
        const filtered = allIssues.filter(item => item.status === status);
        displayIssues(filtered);
    }
};

async function displayIssues(issues){
const cardContainer = document.getElementById("card-container");
cardContainer.innerHTML=''
issues.forEach(data => {

const statusImage = data.status === 'open' ? "./images/Open-Status.png" : "./images/Closed- Status .png";

    const card = document.createElement("div")
const statusBorder = data.status === 'open' ? 'border-t-green-500' : 'border-t-[#A855F7]';

    const priorityClass = 
            data.priority === 'high' ? 'bg-red-100 text-red-600': 
            data.priority === 'medium' ? 'bg-yellow-200 text-yellow-600': 
            'bg-gray-200 text-black';


    card.innerHTML=`
            <div class="card space-y-3 p-4 shadow rounded bg-orange-100 border-t-4 ${statusBorder} h-full flex flex-col justify-between">
                <div class="flex justify-between items-center">
                    <img src="${statusImage}" alt="${data.status}">
                    <p  class="${priorityClass} flex rounded-full px-6 py-1.5  font-bold uppercase text-xs">
                        ${data.priority}
                    </p>
                </div>

                <div>
                    <h3 class="font-bold text-lg ">${data.title}</h3>
                    <p class="text-gray-600 text-sm line-clamp-2">${data.description}</p>
                </div>

                <div class="flex items-center gap-3  ">
                   ${data.labels.map(label => {
    const style = label === 'bug' ? 'bg-red-100 border-red-400 text-red-600' :
                  label === 'enhancement' ? 'bg-green-100 border-green-400 text-green-600' :
                  label === 'help wanted' ? 'bg-orange-100 border-orange-400 text-orange-600' :
                  label === 'documentation' ? 'bg-blue-100 border-blue-400 text-blue-600' : 
                  'bg-gray-100 border-gray-400 text-gray-600';

    const icon = label === 'bug' ? 'fa-bug' :
                 label === 'enhancement' ? 'fa-solid fa-wand-magic-sparkles' :
                 label === 'help wanted' ? 'fa-life-ring':
                 label === 'documentation' ? 'fa-book' : 'fa-tag';

    return `
        <h4 class="${style} border-2 px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1">
            <i class="fa-solid ${icon}"></i> ${label}
        </h4>
    `;
}).join('')}
                </div>

                <hr class="border border-gray-300">

                <div class="space-y-2 text-sm ">
                    <p>${data.id} by <b>${data.author}</b></p>
                    <p>${new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
    cardContainer.appendChild(card)
});

};

fetchIssues()