const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  artworksEl = document.getElementById('artworks'),
  resultHeading = document.getElementById('result-heading'),
  single_artworkEl = document.getElementById('artwork');

// search with term and fetch from api
function searchArt(e) {
  e.preventDefault();

  // clear single artwork
  single_artworkEl.innerHTML = '';

  // get search term
  const term = search.value;

  // check for empty
  if (term.trim()) {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${term}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Results for "${term}":</h2>`;
      });
    //clear search text
    search.value = '';
  } else {
    alert('Please enter a search term');
  }
}

// fetch art by ID
function getArtById(artworkId) {
  fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`
  )
    .then(res => res.json())
    .then(data => {
      const artwork = data.artworks[0];

      addArtworkToDOM(artwork);
    });
}

// fetch random artwork from api
// create a random id
// Function to generate random number  
function randomNumber() {  
  return Math.floor(Math.random() * (16500 - 1) + 1); 
}  

function getRandomArtwork() {
  // clear art and heading
  artworksEl.innerHTML = '';
  resultHeading.innerHTML = '';

  const randomArtworkId = 0;
  // create random id generator


  getArtById(randomArtworkId);
}
