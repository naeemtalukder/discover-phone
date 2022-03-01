const searchPhone = () => {
    const searchField = document.getElementById('search-box');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaysearchResult(data.data));
}

const displaysearchResult = data => {
    const searchResult = document.getElementById('search-result');
    for (const phone of data) {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<div class="card" style="width: 18rem;">
            <img src="${phone.image
            }" class="card - img - top pt - 2" alt="...">
            <h4 class="card-title text-center">${phone.brand}</h4>
            <h5 class="card-subtitle text-center">${phone.phone_name}</h5>
            <button class="btn btn-primary text-center mt-3">Datiels</button>
    </div > `;
        searchResult.appendChild(div);
    };
}
