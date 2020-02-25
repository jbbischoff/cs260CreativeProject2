let baseUrl = "https://dog.ceo/api/breed";
let endUrlSingleImage = "/images/random";
let endUrlAllImages = "/images";

function initializeBreedList() {
  fetch(baseUrl + "s/list/all")
    .then(function(response) {return response.json();})
    .then(function(json) {
      createSidebarList(json.message);
      loadBreedTiles(json.message);
      document.getElementById("headder-bar-title").addEventListener('click', () => loadBreedTiles(json.message));
      for (let link of document.getElementsByClassName("navigation-sidebar-link")) {
        link.addEventListener('click', () => loadBreedPics(link.title));
      }
    });
}

function createSidebarList(breedList) {
  let mainList = document.createElement("ul");
  document.getElementById("breed-list-container").appendChild(mainList);
  mainList.classList.add("navigation-sidebar-list");
  mainList.classList.add("dog-breed-list");

  for (let key of Object.keys(breedList)) {
    let mainItem = document.createElement("li");
    mainList.appendChild(mainItem);
    mainItem.classList.add("navigation-sidebar-list-item");
    if (breedList[key].length > 0) {
      mainItem.appendChild(document.createTextNode(key));
      let subList = document.createElement("ul");
      mainItem.appendChild(subList);
      subList.classList.add("navigation-sidebar-list");
      subList.classList.add("navigation-sidebar-sublist");
      subList.classList.add("dog-breed-list");
      subList.classList.add("dog-subbreed-list");
      for (let subbreed of breedList[key]) {
        let subItem = document.createElement("li");
        subList.appendChild(subItem);
        subItem.classList.add("navigation-sidebar-list-item");
        subItem.classList.add("navigation-sidebar-sublist-item");
        let link = document.createElement("a");
        subItem.appendChild(link);
        link.classList.add("navigation-sidebar-link");
        link.title = key + " " + subbreed;
        link.appendChild(document.createTextNode(subbreed));
      }
    }
    else {
      let link = document.createElement("a");
      mainItem.appendChild(link);
      link.classList.add("navigation-sidebar-link");
      link.title = key;
      link.appendChild(document.createTextNode(key));
    }
  }

  return mainList;
}

function loadBreedTiles(breedList) {
  let container = document.getElementById("main-content");
  container.innerHTML = "";
  for (let key of Object.keys(breedList)) {
    let tile;
    if (breedList[key].length > 0) {
      for (let subbreed of breedList[key]) {
        tile = createBreedTile(key + " " + subbreed);
      }
    }
    else {
      tile = createBreedTile(key);
    }
    container.appendChild(tile);
    tile.addEventListener('click', () => loadBreedPics(tile.title));
  }

  function createBreedTile(breedTitle) {
    let tile = document.createElement("div");
    container.appendChild(tile);
    tile.classList.add("main-item");
    tile.classList.add("tile");
    tile.classList.add("breed-tile");
    tile.title = breedTitle;
    let tileImage = document.createElement("img");
    tile.appendChild(tileImage);
    tileImage.classList.add("tile-image");
    tileImage.classList.add("breed-tile-image");
    tileImage.alt = breedTitle;
    fetch(baseUrl + "/" + breedTitle.replace(" ", "/") + endUrlSingleImage)
      .then(function(response) {return response.json();})
      .then(function(json) {
        tileImage.src = json.message;
      });
    let tileText = document.createElement("p");
    tile.appendChild(tileText);
    tileText.classList.add("tile-label");
    tileText.classList.add("breed-tile-label");
    tileText.appendChild(document.createTextNode(breedTitle));

    return tile;
  }
}

function loadBreedPics(breedTitle) {
  let container = document.getElementById("main-content");
  container.innerHTML = "";
  fetch(baseUrl + "/" + breedTitle.replace(" ", "/") + endUrlAllImages)
    .then(function(response) {return response.json();})
    .then(function(json) {
      let count = 1;
      for (let imageSrc of json.message) {
        let imageContainer = document.createElement("div");
        container.appendChild(imageContainer);
        imageContainer.classList.add("main-item");
        imageContainer.classList.add("example-image-container");
        imageContainer.classList.add("breed-image-container");
        let image = document.createElement("img");
        imageContainer.appendChild(image);
        image.classList.add("example-image");
        image.classList.add("breed-image");
        image.alt = breedTitle + count;
        image.src = imageSrc;

        count++;
      }
    });

}


function hideShowElement(element) {
  if (element.style.visibility === "collapse") {
    element.style.visibility = "visible";
  }
  else {
    element.style.visibility = "collapse";
  }
}

initializeBreedList();
document.getElementById('menu-button').addEventListener('click', () => hideShowElement(document.getElementById('sidebar-container')));
