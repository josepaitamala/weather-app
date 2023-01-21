console.log('client side js');

const searchForm = document.querySelector('.search-location');
const searchInput = document.querySelector('.search-location-address');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchInput.value;

    messageOne.innerHTML = 'Loading...';

    fetch('/weather?address='+location).then( (response) => {
        response.json().then( (data) => {
            if (data.error) {
                messageOne.innerHTML = '';
                messageTwo.innerHTML = data.error;
            }
            else {
                messageOne.innerHTML = data.location;
                messageTwo.innerHTML = data.forecast;
            }
        });
    });

});