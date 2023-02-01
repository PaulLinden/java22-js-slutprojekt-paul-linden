// DOM-Elements
const selectAmount = document.querySelector('#amount');
const selectSize = document.querySelector('#size');
const inputSearchPic = document.querySelector('#searchPic');
const inputSubmitForm = document.querySelector('#searchSubmit');
const containerDisplayImage = document.querySelector('#displayImage');
const selectSort = document.querySelector('#sort');
const selectSearchBy = document.querySelector('#searchBy');

// Create options for amount   
for (let i = 1; i <= 10; i++) {
    createElement(selectAmount, 'option', i);
}

// Function for creating Elements
function createElement(appendTo, newElement, text, src, id) {
    newElement = document.createElement(newElement);
    appendTo.append(newElement);
    newElement.innerText = text;
    newElement.src = src;
    newElement.id = id;
}

// EventListner that gets user input from searchForm
inputSubmitForm.addEventListener("click", (event) => {
    event.preventDefault();

    if (inputSearchPic.value == '') {
        inputSearchPic.value = 'random';
    }
    containerDisplayImage.innerHTML = '';
    imgGetAndDisplay(inputSearchPic.value, selectAmount.value, selectSize.value, selectSort.value, selectSearchBy.value);
});

// Function for calling API and display searched images
function imgGetAndDisplay(searchInput, amountChoosen, sizeChoosen, sortChoosen, searchByChoosen) {

    const callUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=31a356ab418ba2338f504ff73df86cf3&${searchByChoosen}=${searchInput}&sort=${sortChoosen}&per_page=${amountChoosen}&format=json&nojsoncallback=1`;

    fetch(callUrl).then(response => {

        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error('Fetch failed');
        }
    })
        .then(data => {
            
            containerDisplayImage.innerHTML = '';
            const dataReturned = data.photos.photo;
       
            if (dataReturned.length == 0) {
                createElement(containerDisplayImage, 'h1', 'No matches found!', '', 'errorMessage');                
            }

            // Loop that creates imgUrl and clickable image
            for (let i = 0; i < dataReturned.length; i++) {
                let imgUrl = `https://live.staticflickr.com/${dataReturned[i].server}/${dataReturned[i].id}_${dataReturned[i].secret}_${sizeChoosen}.jpg`;
                createElement(containerDisplayImage, 'a', '', '');
                let aTag = document.querySelectorAll('a')[i];
                aTag.href = imgUrl;
                createElement(aTag, 'img', '', imgUrl);
            }
        })
        .catch(
            function (error) {
                createElement(containerDisplayImage, 'h1', 'Oopsie!!... Something went wrong!', '', 'errorMessage');
                console.log(error)
            }
        );
}

//---------------------------------------
//------ Under construction--------------
//⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩⇩

const expandButton = document.querySelector('#expandButton');
expandButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    const advancedSearch = document.querySelector('#advancedSearch');
    const searchSection = document.querySelector('#searchSection');
   
    if (expandButton.value == 'expand') {
        advancedSearch.style.display = 'block';
        
        searchSection.style.transition = 'height 0.1s';
        expandButton.innerText = '⇧Advancedsearch⇧';
        searchSection.style.height = '120px';
        expandButton.value = 'close';
    }
    else if (expandButton.value == 'close') {
        advancedSearch.style.display = 'none';
        expandButton.innerText = '⇩Advancedsearch⇩';
        searchSection.style.height = '80px';
        expandButton.value = 'expand';
    }
});


const layout = document.querySelector('#layout');
layout.addEventListener("click", (event) => {
    event.preventDefault();
    
    if (event.target.type === "submit" && event.target.id === "rowLayout") {
        containerDisplayImage.id = 'displayImageRow';
        console.log('1');
    }
    else if (event.target.type === "submit" && event.target.id === "columnLayout") {
        containerDisplayImage.id = 'displayImage';
        console.log('2');
    }
});