let allIssues = [];

const issuesCount = document.getElementById("issues");
const spinner = document.getElementById("loading-spinner")
const cardContainer = document.getElementById("card-container");
const searchBtn = document.getElementById("Search")

const searchInput = document.getElementById("Search-input");

function toggleSpinner(isLoading) {
    if (isLoading) {
        spinner.classList.remove("hidden");
    } else {
        spinner.classList.add("hidden");
    }
}


async function fetchIssues (){
    toggleSpinner(true);
    const url = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const result = await url.json();
    allIssues = result.data;
    displayIssues(allIssues);
    toggleSpinner(false);
};

function filterIssues(status, event) {
   toggleSpinner(true);
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
   toggleSpinner(false);
};

async function displayIssues(issues) {

    issuesCount.innerText = `${issues.length} Issues`;
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = '';
    issues.forEach(data => {
    
        const statusImage = data.status === 'open' ? "./images/Open-Status.png" : "./images/Closed- Status .png";
        const statusBorder = data.status === 'open' ? 'border-t-green-500' : 'border-t-[#A855F7]';

        const priorityClass =
            data.priority === 'high' ? 'bg-red-100 text-red-600' :
            data.priority === 'medium' ? 'bg-yellow-200 text-yellow-600' :
            'bg-gray-200 text-black';

        const card = document.createElement("div");

        card.innerHTML = `
            <div onclick="showModalDetails('${data.id}')" class="card cursor-pointer hover:shadow-lg transition-all space-y-3 p-4 shadow rounded bg-orange-100 border-t-4 ${statusBorder} h-full flex flex-col justify-between">
                <div class="flex justify-between items-center">
                    <img src="${statusImage}" alt="${data.status}">
                    <p class="${priorityClass} flex rounded-full px-6 py-1.5 font-bold uppercase text-xs">
                        ${data.priority}
                    </p>
                </div>

                <div>
                    <h3 class="font-bold text-lg">${data.title}</h3>
                    <p class="text-gray-600 text-sm line-clamp-2">${data.description}</p>
                </div>

                <div class="flex items-center gap-3">
                    ${data.labels.map(label => {
                        const style = label === 'bug' ? 'bg-red-100 border-red-400 text-red-600' :
                                      label === 'enhancement' ? 'bg-green-100 border-green-400 text-green-600' :
                                      label === 'help wanted' ? 'bg-orange-100 border-orange-400 text-orange-600' :
                                      label === 'documentation' ? 'bg-blue-100 border-blue-400 text-blue-600' : 
                                      'bg-gray-100 border-gray-400 text-gray-600';

                        const icon = label === 'bug' ? 'fa-bug' :
                                     label === 'enhancement' ? 'fa-solid fa-wand-magic-sparkles' :
                                     label === 'help wanted' ? 'fa-life-ring' :
                                     label === 'documentation' ? 'fa-book' : 'fa-tag';

                        return `
                            <h4 class="${style} border-2 px-2 py-1 rounded-full text-[9px] font-semibold flex items-center gap-1">
                                <i class="fa-solid ${icon}"></i> ${label.toUpperCase()}
                            </h4>
                        `;
                    }).join('')}
                </div>

                <hr class="border border-gray-300">

                <div class="space-y-2 text-sm">
                    <p>${data.id} by <b>${data.author}</b></p>
                    <p>${new Date(data.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
}

fetchIssues()

function showModalDetails(id) {
    const data = allIssues.find(item => item.id == id)
    if (!data) return;

    const statusImage = data.status === 'open' ? "./images/Open-Status.png" : "./images/Closed- Status .png";
    const statusBorder = data.status === 'open' ? 'border-t-green-500' : 'border-t-[#A855F7]';
    const priorityClass = 
            data.priority === 'high' ? 'bg-red-100 text-red-600': 
            data.priority === 'medium' ? 'bg-yellow-200 text-yellow-600': 
            'bg-gray-200 text-black';

    const modalContent = document.getElementById("modal-content");

    modalContent.innerHTML = `
        <div class="card space-y-4 p-6 shadow-2xl rounded bg-orange-100 border-t-8 ${statusBorder} w-full">
            <div class="flex justify-between items-center">
                <img src="${statusImage}" alt="${data.status}" class="w-8">
                <p class="${priorityClass} rounded-full px-6 py-1.5 font-bold uppercase text-xs">
                    ${data.status}
                </p>
            </div>
            <div class="space-y-2">
                <h3 class="font-bold text-2xl text-gray-800">${data.title}</h3>
                <p class="text-gray-700 text-base leading-relaxed">${data.description}</p>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
                ${data.labels.map(label => {
                const style = label === 'bug' ? 'bg-red-100 border-red-400 text-red-600' :
                             label === 'enhancement' ? 'bg-green-100 border-green-400 text-green-600' :
                               label === 'help wanted' ? 'bg-orange-100 border-orange-400 text-orange-600' :
                                 label === 'documentation' ? 'bg-blue-100 border-blue-400 text-blue-600' : 
                                  'bg-gray-100 border-gray-400 text-gray-600';

                    const icon = label === 'bug' ? 'fa-bug' :
                        label === 'enhancement' ? 'fa-wand-magic-sparkles' :
                          label === 'help wanted' ? 'fa-life-ring':
                             label === 'documentation' ? 'fa-book' : 'fa-tag';

                    return `
                        <h4 class="${style} border-2 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <i class="fa-solid ${icon}"></i> ${label.toUpperCase()}
                        </h4>
                    `;
                }).join('')}
            </div>

            <hr class="border border-gray-300">

            <div class="flex justify-between items-center text-sm text-gray-600">
                <p>ID: <b>${data.id}</b></p>
                <p>By <b>${data.author}</b></p>
            </div>
            <p class="text-xs text-gray-400 text-right">${new Date(data.createdAt).toLocaleDateString()}</p>
            
            <form method="dialog" class="mt-4">
                <button class="btn btn-sm btn-block btn btn-warning border-gray-300">Close Detail</button>
            </form>
        </div>
    `;

    document.getElementById('issue_modal').showModal();
};







document.getElementById("Search").addEventListener("click", async () => {
    
    const searchInput = document.getElementById("Search-input");
    const searchText = searchInput.value.trim();
toggleSpinner(true);
    if (searchText === "") {
        displayIssues(allIssues);
        toggleSpinner(false); 

        return;
    }

    try {
  
        const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
        const result = await response.json();
        const searchData = result.data || [];
        displayIssues(searchData);
        
    } catch (error) {
        console.error("Search failed:", error);
    }finally {
        toggleSpinner(false); 
    }
});

document.getElementById("Search-input").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        document.getElementById("Search").click();
    }
});
