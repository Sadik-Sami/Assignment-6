let storedData = [];
const fetchData = (dataLimit) => {
    spinner(true)
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            storedData = data.data.tools;
            onSiteLoad(data.data.tools, dataLimit);
        });
}
const onSiteLoad = (data, dataLimit) => {
    const allCardContainer = document.getElementById("parent-container");
    allCardContainer.innerHTML = ``;
    const showAll = document.getElementById("show-more-btn");
    if (dataLimit) {
        data = data.slice(0, 6);
        showAll.classList.remove("hidden");
    }
    else {
        showAll.classList.add("hidden");
    }
    data.forEach(Singledata => {
        const { image, features, published_in, name, id } = Singledata;
        allCardContainer.innerHTML +=
            `
            <div class="max-w-md bg-white border border-gray-200 rounded-lg shadow-lg">
            <a href="#">
                <img class="rounded-t-lg h-[220px] w-[450px] object-cover" src="${image}" alt=""/>
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Features</h5>
                </a>
                <p class="my-4 font-normal text-gray-700">
                    <ol class="list-decimal list-inside">
                        <li>${features[0] ? features[0] : "No Data Found"}</li>
                        <li>${features[1] ? features[1] : "No Data Found"}</li>
                        <li>${features[2] ? features[2] : "No Data Found"}</li>
                    </ol>
                </p>
                <div class="flex justify-between items-center my-4">
                    <div class="flex flex-col gap-2">
                        <h3 class="text-xl font-work font-semibold">${name}</h3>
                        <div class="flex gap-2 items-center">
                            <i class="fa-solid fa-calendar-days"></i>
                            <p class="font-work">${published_in}</p>
                        </div>
                    </div>
                    <div>
                        
                        <label for="my-modal-5" ><i for="my-modal-5" class="fa-solid fa-arrow-right" onclick="fetchCardDetail('${id}')"></i></label>
                    </div>
                </div>
            </div>
            </div>
        `;
    });
    spinner(false)
};
const sortData = () => {
    let sortedData = storedData.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));
    console.log(sortedData);
    onSiteLoad(sortedData);
}
const fetchCardDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            showCardDetail(data.data);
        })
};
const spinner = isLoading => {
    const spinnerIcon = document.getElementById("spinner")
    if(isLoading){
        spinnerIcon.classList.remove("hidden");
    }
    else{
        spinnerIcon.classList.add("hidden");
    }
};
const showCardDetail = (fetchedData) => {
    const { image_link, features, integrations, input_output_examples, description, pricing, accuracy} = fetchedData;
    const modalContainer = document.getElementById("modal-container");
    console.log(fetchedData);
    const modalBody = document.getElementById("modal-body");
    modalBody.innerHTML = ``;
    modalBody.innerHTML =
    `
    <!-- ! left -->
                    <div class="max-w-md bg-white border border-red-300 rounded-lg shadow-lg">
                    <div class="flex flex-col p-2 gap-4">
                    <div>
                        <h2 class="text-2xl font-bold font-work text-black">${description}</h2>
                    </div>
                    <div class="flex justify-around items-center">
                        <div class="flex flex-col items-center text-green-600 font-semibold">
                            <p>${pricing ? pricing[0].price : "free of cost"}</p>
                            <p>${pricing ? pricing[0].plan : "Basic"}</p>
                        </div>
                        <div class="flex flex-col items-center text-orange-600 font-semibold">
                            <p>${pricing ? pricing[1].price : "free of cost"}</p>
                            <p>${pricing ? pricing[1].plan : "Pro"}</p>
                        </div>
                        <div class="flex flex-col items-center text-red-600 font-semibold">
                            <p>${pricing ? pricing[2].price : "free of cost"}</p>
                            <p>${pricing ? pricing[2].plan : "Enterprise"}</p>
                        </div>
                    </div>
                </div>
                        <div class="p-5 flex justify-between items-center">
                            <div>
                                <p class="my-4 font-normal text-gray-700">
                                    <a href="#">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Features</h5>
                                    </a>
                                <ol class="list-disc list-inside">
                                    <li>${features[1].feature_name ? features[1].feature_name : "No Data Found"}</li>
                                    <li>${features[2].feature_name ? features[2].feature_name : "No Data Found"}</li>
                                    <li>${features[3].feature_name ? features[3].feature_name : "No Data Found"}</li>
                                </ol>
                                </p>
                            </div>
                            <div>
                                <p class="my-4 font-normal text-gray-700">
                                    <a href="#">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Integrations</h5>
                                    </a>
                                <ol class="list-disc list-inside">
                                    <li>${integrations ? integrations[0] ? integrations[0] : "No Data Found" : "No Data Found"}</li>
                                    <li>${integrations ? integrations[1] ? integrations[1] : "No Data Found" : "No Data Found"}</li>
                                    <li>${integrations ? integrations[2] ? integrations[2] : "No Data Found" : "No Data Found"}</li>
                                </ol>
                                </p>
                            </div>
                        </div>
                    </div>
    <!-- ! Right -->
                    <div class="flex flex-col gap-4">
                            <div class="relative">
                                <img src="${image_link[0]}" alt="">
                                <p class="bg-red-400 inline-block absolute top-2 right-2 rounded-md px-1 text-white font-bold">${accuracy.score ? accuracy.score * 100 + '% accuracy' : ""}</p>
                            </div>
                        <h1 class="font-work text-xl font-semibold text-center">${input_output_examples ? input_output_examples[0].input : "Can you gove an example?"}</h1>
                        <p class="font-work text-gray-600 text-center">${input_output_examples ? input_output_examples[0].output : "No! Not Yet! Take a Break!!!"}</p>
                    </div>
    `
};