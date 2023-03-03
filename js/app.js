
let displaySortingTools = []

// Fetch All Ai Tools 
const loadAITools = async (dataLimit) => {
    toggleLoader(true)
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url)
    const data = await res.json()
    displaySortingTools = data.data.tools
    showAITools(data.data.tools, dataLimit)
}

// Display All Ai tools 
const showAITools = (tools, dataLimit) => {
    // console.log('Ai Tools : ', tools);
    const toolsContainer = document.getElementById('tools-container')
    toolsContainer.innerHTML = ''

    if (dataLimit && tools.length > dataLimit) {
        tools = tools.slice(0, dataLimit)
        document.getElementById('see-more').classList.remove('d-none')
    } else {
        document.getElementById('see-more').classList.add('d-none')
    }


    tools.forEach(tool => {
        // console.log('tools : ', tool);
        const { id, image, name, features, published_in } = tool;

        const cardContainer = document.createElement('div')
        cardContainer.classList.add('col')
        cardContainer.innerHTML = `
        <div class="card h-100 p-3 pb-0">
        <img src="${image}" style="max-height:250px; height:100%; width:auto;" class="card-img-top px-3" alt="${name}">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <p id="feature" class="card-text">
            <ol type="1">
                <li>${features[0] ? features[0] : 'No data found'}</li>
                <li>${features[1] ? features[1] : 'No data found'}</li>
                <li>${features[2] ? features[2] : 'No data found'}</li>
         
            </ol>  
            </p>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="fs-4">${name}</h2>
                    <i class="far fa-clock"></i> <span class="ms-1">${published_in}</span>
                </div>
                <div>
                    <i onclick="loadToolDetails('${id}')" 
                        class="fas fa-arrow-right fs-5 px-3 py-3 rounded-circle bg-warning-subtle text-warning" data-bs-toggle="modal" data-bs-target="#toolDetailModal"></i>
                </div>
                </div>
            </div>
        </div>
        `
        toolsContainer.appendChild(cardContainer)

    });

    toggleLoader(false)
}



// Display Loader/Spinner 
const toggleLoader = isLoading => {
    const loderSection = document.getElementById('loader')
    if (isLoading) {
        loderSection.classList.remove('d-none')
    }
    else {
        loderSection.classList.add('d-none')
    }
}

// Display See More Tools 
document.getElementById('btn-see-more').addEventListener('click', function () {
    loadAITools()
})


// Fetch Tools Details 
const loadToolDetails = async (id) => {
    url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    // console.log(url);
    const res = await fetch(url)
    const data = await res.json()
    showToolDetails(data.data)
}

// Display Tool Details 
const showToolDetails = details => {
    console.log('detail : ', details);
    const { accuracy, description, features, image_link, input_output_examples, integrations, pricing } = details
    const toolsDetails = document.getElementById('tools-details')
    toolsDetails.innerHTML = ''


    toolsDetails.innerHTML = `
    
    <div class="modal-header border-0 p-0">
    <button type="button" class="btn-close p-2 p-md-3 rounded-circle bg-danger"
        style="position: absolute;top:-15px;right:-15px" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body p-2 p-md-5">
        <div class="modal-grid gap-4">
            <div class="p-2 p-md-4 rounded-3 border border-warning order-1 order-lg-0" style="background: #FEF9E7;">
                <h2 class="fs-5">${description ? description : "No description available"}</h2>

                <div class="d-flex align-items-center justify-content-center  gap-2 my-4 flex-wrap">
                    <div class="bg-white py-3 px-3 rounded-3  text-success d-flex flex-column align-items-center justify-content-center"
                        style="width: 130px; height:100px;">
                        <h3 class="fs-5 fw-semibold text-center mb-0">${pricing && pricing[0] ? (pricing[0].price).split('/').join('/<br/>') : 'Free of Cost'}</h3>
                        <h3 class="fs-5 fw-semibold text-center mb-0">${pricing && pricing[0] ? (pricing[0].plan).split('/').join('/<br/>') : 'Basic'}</h3>
                        </div>
                    <div class="bg-white py-3 px-3 rounded-3 fs-5 fw-bolder  text-danger d-flex flex-column align-items-center justify-content-center"
                        style="width: 130px; height:100px;">
                        <h3 class="fs-5 fw-semibold text-center mb-0">${pricing && pricing[1] ? (pricing[1].price).split('/').join('/<br/>') : 'Free of Cost'}</h3>
                        <h3 class="fs-5 fw-semibold text-center mb-0">${pricing && pricing[1] ? (pricing[1].plan.split('/').join('/<br/>')) : 'Pro'}</h3>
                        </div>
                    <div class="bg-white py-3 px-3 rounded-3 fs-5 fw-bolder  text-warning d-flex flex-column align-items-center justify-content-center"
                        style="width: 130px; height:100px;">
                        <h3 class="fs-5 fw-semibold text-center mb-0">${pricing && pricing[2] ? (pricing[2].price).split('/').join('/<br/>') : 'Free of Cost'}</h3>
                        <h3 class="fs-5 fw-semibold text-center mb-0">${pricing && pricing[2] ? (pricing[2].plan).split('/').join('/<br/>') : 'Enterprise'}</h3>
                        </div>
                </div>

                <div class="d-flex flex-column flex-lg-row justify-content-center gap-4">
                    <div class="">
                        <h2 class="fs-5 fw-bolder">Features</h2>
                        <ul>
                            ${features[1].feature_name ? '<li>' + features[1].feature_name + '</li>' : 'No data found'}
                            ${features[2].feature_name ? '<li>' + features[2].feature_name + '</li>' : 'No data found'}
                            ${features[3].feature_name ? '<li>' + features[3].feature_name + '</li>' : 'No data found'}
                        </ul>
                    </div>
                    <div class="">
                        <h2 class="fs-5 fw-bolder">Integrations</h2>
                        ${integrations === null ? "No data found" : ''}
                        <ul>
                        ${integrations && integrations[0] ? '<li>' + integrations[0] + '</li>' : ''}
                        ${integrations && integrations[1] ? '<li>' + integrations[1] + '</li>' : ''}
                        ${integrations && integrations[2] ? '<li>' + integrations[2] + '</li>' : ''}   
                        </ul>
                    </div>
                </div>

            </div>
            <div class="text-center p-2 p-md-4 bg-white border rounded-3">
                <div class="position-relative mb-4">
                    <span id="accuracyId" class="${accuracy.score ? 'position-absolute top-0 end-0 m-2 rounded-2 bg-warning p-2' : ''}">${accuracy.score ? (accuracy.score * 100) + '% accuracy' : ''}</span>
                    <img src="${image_link[0] ? image_link[0] : 'No Image Found'}" class="img-fluid  shadow" alt="">
                </div>
                <h2 class="fs-4 fw-bolder">${input_output_examples && input_output_examples[0] ? input_output_examples[0].input : "Can you give any example?"}</h2>
                <p class="">${input_output_examples && input_output_examples[0] ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
            </div>
        </div>
    </div>
    
    `

}


// Display Sorting Tools 
const showSortingTools = () => {
    const sortingTools = (a, b) => {
        a = new Date(a.published_in)
        b = new Date(b.published_in)
        return a - b
    }
    const showTools = displaySortingTools.sort(sortingTools)
    showAITools(showTools);
}


loadAITools(6)
