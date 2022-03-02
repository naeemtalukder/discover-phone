const searchPhone = () => {
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaysearchResult(data.data.slice(0, 15)));
}

const displaysearchResult = data => {
    if (data.length == 0) {
        document.getElementById('no-pound').style.display = "block";
    }
    else {
        document.getElementById('no-pound').style.display = "none";
    }

    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    for (const phones of data) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card my-2" style="width: 18rem;">
            <img src="${phones.image
            }" class="card - img - top pt - 2" alt="...">
            <h4 class="card-title fw-bold text-warning text-center">${phones.brand}</h4>
            <h5 class="card-subtitle fst-italic text-center">${phones.phone_name}</h5>
            <button onclick="phoneDetails('${phones.slug}')" class="btn btn-primary text-center mt-3">Details</button>
    </div > `;
        searchResult.appendChild(div);
    };
}
//phone details load
const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data));
};
const displayPhoneDetails = data => {
    const showPhoneDetails = document.getElementById('phone-details');
    showPhoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${data.image}" class="w-100 mt-5 pe-3 ps-5 d-block" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title text-warning fw-bold">Brand: ${data.brand}</h4>
        <h5 class="card-sub-title text-info fw-bold">Name: ${data.name}</h5>
        <p class="card-text"><small class="text-muted">Release Date: ${data.releaseDate ? data.releaseDate : undefined}</small></p>

        <h5 class="card-sub-title text-success fw-bold">Main Features</h5>
        <p><span class="fw-bold text-info">Sensors: </span>${data.mainFeatures.sensors}</p>

        <p><span class="fw-bold">Storage: </span>
        ${data.mainFeatures.storage}</p>
        <p><span class="fw-bold">Chipset: </span>${data.mainFeatures.chipSet}</p>
        <p><span class="fw-bold">Memory: </span>${data.mainFeatures.memory}</p>
        <p><span class="fw-bold">Display Size: </span>${data.mainFeatures.displaySize}</p>

        <h5 class="card-sub-title text-success fw-bold">Other</h5>
        <p><span class="fw-bold">WLAN: </span>${data.others.WLAN}</p>
        <p><span class="fw-bold">Bluetooth: </span>${data.others.Bluetooth}</p>
        <p><span class="fw-bold">GPS: </span>${data.others.GPS}</p>
        <p><span class="fw-bold">NFC: </span>${data.others.NFC}</p>
        <p><span class="fw-bold">Radio: </span>${data.others.Radio}</p>
        <p><span class="fw-bold">USB: </span>${data.others.USB}</p>
        </div>
    </div>
  </div>
       
        `;
    showPhoneDetails.appendChild(div);
}