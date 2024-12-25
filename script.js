import { apiKey } from "./ApiKey.js"; // API Key

// Elements
const Input = document.getElementById(`Input`);
const Pages = document.getElementById(`Pages`);
const Search = document.getElementById(`Search`);
const Increase = document.getElementById(`Increase`);

// Page Number
let Page = 1;

// Total Pages
let totalPages = 0;

// Function for Retrieving Images
async function Retrieve() {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${Page}&query=${Input.value}&per_page=12&content_filter=high&client_id=${apiKey}`);

        const data = await response.json();
        const Result = data.results;
        Page = data.total_pages;

        for (let index of Result) {
            const img = document.createElement(`img`);
            img.src = index.urls.small;

            const a = document.createElement(`a`);
            a.href = index.links.html;
            a.target = `_blank`

            a.append(img);
            document.getElementById(`Pages`).append(a);
        }

    } catch (error) {
        alert(error.message)
    }
}

// Event Listener for Search Button
Search.addEventListener("click", function () {
    if (Input.value !== "") {
        Pages.innerHTML = ``;
        Page = 1;
        Retrieve();
        Increase.style.display = "block"
    } else {
        alert("Please enter some text!")
    }
})

// Event Listener for Show Button
Increase.addEventListener("click", () => {
    Page++
    if (Page < totalPages) {
        Retrieve();
    } else {
        alert("You have reached the end!")
    }
})