import { apiKey } from './ApiKey.js';

const Input = document.getElementById(`Input`);
const Pages = document.getElementById(`Pages`);
const Search = document.getElementById(`Search`);
const Increase = document.getElementById(`Increase`);

let Page = 1;

async function Retrieve() {
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${Page}&query=${Input.value}&per_page=12&content_filter=high&client_id=${apiKey}`);
    const data = await response.json();
    const Result = data.results;

    for (let index of Result) {
        const img = document.createElement(`img`);
        img.src = index.urls.small;

        const a = document.createElement(`a`);
        a.href = index.links.html;
        a.target = `_blank`

        a.append(img);
        document.getElementById(`Pages`).append(a);
    }
}

Search.addEventListener("click", function () {

    if (Input.value == "") {
        alert(`Please Enter Some Text!`)
    }

    else {
        try {
            Pages.innerHTML = ``;
            Page = 1;
            Retrieve();
            Increase.style.display = "block"
            
        } catch (error) {
            console.log(error)
        }
    }

})

Increase.addEventListener("click", () => {
    
    try {
        Page++
        Retrieve();
        
    } catch (error) {
        console.log(error);
        
    }
})