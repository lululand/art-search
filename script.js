const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  artworksEl = document.getElementById('artworks'),
  resultHeading = document.getElementById('result-heading'),
  single_artworkEl = document.getElementById('artwork');

// **************************************************
//   search with term and fetch from api
// **************************************************
async function searchArt(event) {
  event.preventDefault(); // because we don't want to submit to a file

  single_artworkEl.innerHTML = ''; // clear single artwork

  const term = search.value; // get search term
  console.log(term);

  // if there's a term, else if empty
  if (term.trim()) {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${term}&hasImages=true`
    );
    const data = await response.json();
    // console.log(data);
    let objectIdList = [];
    objectIdList = data.objectIDs;
    console.log(objectIdList);

    document.getElementById('result-heading').textContent =
      // resultHeading.innerHTML =
      `Results for "${term}":`;

    let artworkInfoList = [];
    // fetch the data for each ID and add it to an array/object
    objectIdList.forEach(el => {
      fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`
      )
        .then(res => res.json())
        .then(data => {
          artworkInfoList.push(data);
        });
    });
    console.log(artworkInfoList);
    // search results - if/else there's data returned
    if (data.objectIDs === null) {
      resultHeading.innerHTML = `
      <div class="level-item has-text-centered mt-5"><h2>There are no objects with those search terms - try again.</h2></div>`;
    } else {
      // MY CURRENT CONUNDRUM -------------------------------------->>>>>>
      // artworkInfoList is an array of objects - I'm trying to reference it and pull out values from each nested object, then render those values on the page.
      // they're nested key:value objects with the keys being 0-n
      // [ 0: {key:value, key:value, etc}, 1: {...}, 2: {...}, etc.]
      // -------------------------------------->>>>>>
      for (const [key, value] of Object.entries(artworkInfoList)) {
        document.getElementById('artworks').textContent = `${key}: ${value}`; // testing it
        // <div class="level-item">
        //   <img src="${primaryImage.value}" alt="${title.value}" />
        //   <div class="data-info" data-artworkID="${iddata.value}">
        //   <h3>${title.value}</h3>
        //   </div>
        // </div>
        // `
      }
      search.value = '';
    }
  } else {
    alert('Please enter a search term');
  }
}

// **************************************************
//   fetch art by ID
// **************************************************
async function getArtById(objectID) {
  let artworkInfo;

  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );
  const data = await response.json();
  artworkInfo = data;
  console.log(artworkInfo);
  document.getElementById('artwork').textContent = `${artworkInfo.title}, ${artworkInfo.primaryImage}`;
  // addArtworkToDOM(artworkInfo);
  // return artworkInfo;
  // console.log(objectID, primaryImage, department, objectName, title, artistDisplayName);
  // });
}

// **************************************************
//   add art object to DOM
// **************************************************
// function addArtworkToDOM(artworkInfo) {
//   single_artworkEl.innerHTML = `
//   <section class="section">
//   <div class="level-item has-text-centered">
//     <div class="level">
//     <h1>${artworkInfo.title}</h1>
//     <img src="${artworkInfo.primaryImage}" alt="${artworkInfo.title}" />
//     <div class="single-artworkInfo-info">
//     ${
//       artworkInfo.artistDisplayName
//         ? `<p>${artworkInfo.artistDisplayName}</p>`
//         : ''
//     }
//     ${artworkInfo.department ? `<p>${artworkInfo.department}</p>` : ''}
//     ${artworkInfo.objectName ? `<p>${artworkInfo.objectName}</p>` : ''}
//     </div>
//     <div class="main">
//       <p>${artworkInfo.objectID}</p>
//     </div>
//   </div>
// </section>
//   `;
// }

// **************************************************
//   add artworks to DOM
// **************************************************
// function addArtworksToDOM(objectIDs) {
//   // const objectIDs = [];
// }

// **************************************************
//   generate random art ID
// **************************************************
function randomArtId() {
  return Math.floor(Math.random() * (16500 - 1) + 1);
}

// **************************************************
//   fetch random artwork from api using random id
// **************************************************
function getRandomArtwork() {
  // clear art and heading
  artworksEl.innerHTML = '';
  resultHeading.innerHTML = '';

  const randomArtworkId = randomArtId();

  getArtById(randomArtworkId);
  // ---> need to add to DOM?
  
}

// **************************************************
//   event listeners
// **************************************************
submit.addEventListener('submit', searchArt);
random.addEventListener('click', getRandomArtwork);

// artworksEl.addEventListener('click', e => {
//   const
// })

// **************************************************
// **************************************************
