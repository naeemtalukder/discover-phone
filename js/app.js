const searchPhone = () => {
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    //load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaysearchResult(data.data));
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
        // console.log(phone);
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
    console.log(data);
    const showPhoneDetails = document.getElementById('phone-details');
    showPhoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <div class="card">
            <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4 class="card-title text-center">${data.slug}</h4>
            <h5 class="card-text text-center">${data.releaseDate}</h5>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `;
    showPhoneDetails.appendChild(div);
}