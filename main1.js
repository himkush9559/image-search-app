const accessKey = "3N2G_M9abrhRGrHSLtYcMjR1HgCOy-lTc027PYYMb9U";

const img12 = document.querySelector("#search-inp-img");
const searchResults = document.querySelector(".search-results");

const showMoreBtn = document.querySelector("#show-more-btn");

let inputData = "";
let page = 1;

async function searchImage1() {
  inputData = img12.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.text = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

function attachFormSubmitEvent() {
  const form1 = document.querySelector("form");
  form1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    uiResult();
  });
}

function attachShowMoreClickEvent() {
  const showMoreBtn = document.querySelector("#show-more-btn");
  showMoreBtn.addEventListener("click", () => {
    uiResult();
  });
}
function uiResult() {
  searchImage1();
  attachFormSubmitEvent();
  attachShowMoreClickEvent();
}
uiResult();
