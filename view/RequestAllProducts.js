function getAllProducts() {
  //const url = "http://localhost:3000/api/teddies/";
  const url = "https://oc-p5-api.herokuapp.com/api/teddies/";
  fetch(url)
    .then(response => response.json())
    .then(function (data) {
      console.log(data);
      createProductsElements(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function createProductsElements(data) {
  // Création des éléments relatifs aux produits dans le DOM
  const teddies = data;
  for (teddy of teddies) {
    let prevElt = document.createElement("div");
    prevElt.className = "col-lg-6 mb-4";

    let subprevElt = document.createElement("div");
    subprevElt.className = "card h-100";

    let aElt = document.createElement("a");

    let cardImgElt = document.createElement("img");
    cardImgElt.className = "card-img-top";
    cardImgElt.src = teddy.imageUrl;

    let cardBodyElt = document.createElement("div");
    cardBodyElt.className = "card-body";

    let cardTitleElt = document.createElement("h4");
    cardTitleElt.className = "card-title"
    cardTitleElt.textContent = teddy.name;

    let aCardTitleElt = document.createElement("a");

    let cardPriceElt = document.createElement("p");
    cardPriceElt.textContent = (teddy.price / 100).toFixed(2) + " €";;

    // Création bouton pour aller à l'article
    let seeProductElt = document.createElement("button");
    seeProductElt.setAttribute("data-id", teddy._id);
    let productId = seeProductElt.getAttribute("data-id");
    seeProductElt.onclick = (function () { window.location.href = "./view/product.html?id=" + productId; });
    seeProductElt.textContent = "Voir l'article";

    // Insertion des éléments relatifs aux produits dans le DOM
    cardTitleElt.appendChild(aCardTitleElt);
    aElt.appendChild(cardImgElt);
    cardBodyElt.appendChild(cardTitleElt);
    cardBodyElt.appendChild(cardPriceElt);
    cardBodyElt.appendChild(seeProductElt);
    subprevElt.appendChild(aElt);
    subprevElt.appendChild(cardBodyElt);
    prevElt.appendChild(subprevElt);
    document.getElementById("preview").appendChild(prevElt);
  }
}

getAllProducts();