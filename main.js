const button = document.querySelector('.Search')
const input = document.querySelector('.textbox input')
const degree = document.querySelector('h1');
const placeShow = document.querySelector('.main h3')
const switcher = document.querySelector('.switch')
const parts = document.querySelectorAll('.switch .part')

let place = 'Yerevan';
let temperature = '';

function fetchFun() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=55f1f86d638835ca5c68de9261e86508`)
        .then(response => response.json())
        .then(data => {
            temperature = data.main.temp - 273.15;
            degree.innerText = Math.round(temperature) + '°'
        })
        .catch(error => {
            placeShow.innerText = 'No City Found';
            degree.innerText = '-°';
        })
}

window.onload = () => {
    fetchFun();
}
window.onkeydown = (e) => {    
    if (e.which == 13) {
        place = input.value
        placeShow.innerText = place;
        fetchFun();
    }
}

button.onclick = () => {
    place = input.value
    placeShow.innerText = place;
    fetchFun();
}

let bool = true;
parts[1].style = 'opacity: 1; background: #000';
parts[0].style = 'opacity: .5; background: transparent';

switcher.onclick = () => {
    if (bool) {
        bool = false;
        parts[0].style = 'opacity: 1; background: #000';
        parts[1].style = 'opacity: .5; background: transparent';
        degree.innerText = Math.round((temperature * 9 / 5) + 32) + '°';
    } else {
        bool = true;
        parts[1].style = 'opacity: 1; background: #000';
        parts[0].style = 'opacity: .5; background: transparent';
        degree.innerText = Math.round(temperature) + '°'
    }
}
placeShow.innerText = place