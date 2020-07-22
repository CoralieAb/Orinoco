function getOneProduct() {
  var url = "http://localhost:3000/api/teddies/";
  console.log(window.location.search);
  if (window.location.search == "?id=5be9c8541c9d440000665243") {
    url += "5be9c8541c9d440000665243";
  } else if (window.location.search == "?id=5beaa8bf1c9d440000a57d94") {
    url += "5beaa8bf1c9d440000a57d94";
  } else if (window.location.search == "?id=5beaaa8f1c9d440000a57d95") {
    url += "5beaaa8f1c9d440000a57d95";
  } else if (window.location.search == "?id=5beaabe91c9d440000a57d96") {
    url += "5beaabe91c9d440000a57d96";
  } else if (window.location.search == "?id=5beaacd41c9d440000a57d97") {
    url += "5beaacd41c9d440000a57d97";
  }
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(function (data) {
      createProductElement(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function createProductElement(response) {
  const teddy = response;
  console.log(teddy);
  // Création des éléments relatifs au produit dans le DOM
  let prevElt = document.createElement("div");
  prevElt.className = "col-md-8";

  let productImgElt = document.createElement("img");
  productImgElt.className = "img-fluid";
  productImgElt.src = teddy.imageUrl;

  let detailsElt = document.createElement("div");
  detailsElt.className = "col-md-4";

  let productTitleElt = document.createElement("h3");
  productTitleElt.className = "my-3"
  productTitleElt.textContent = teddy.name;

  let productDescrElt = document.createElement("p");
  productDescrElt.textContent = teddy.description;

  let productPriceElt = document.createElement("p");
  productPriceElt.textContent = teddy.price / 100 + " €";

  // Création des éléments permettant la sélection de la quantité
  let qteLabelElt = document.createElement("label");
  qteLabelElt.setAttribute("for", "qte");
  qteLabelElt.textContent = "Quantité : ";
  let qteSelectElt = document.createElement("select");
  qteSelectElt.setAttribute("name", "qte");
  for (let i = 1; i < 10; i++) {
    let qteOptionElt = document.createElement("option");
    qteOptionElt.setAttribute("value", i);
    qteOptionElt.textContent = i;
    qteSelectElt.appendChild(qteOptionElt);
  }

  // Création des éléments permettant la sélection de la couleur
  let colorLabelElt = document.createElement("label");
  colorLabelElt.setAttribute("for", "color");
  colorLabelElt.textContent = "Couleur : ";
  let colorSelectElt = document.createElement("select");
  colorSelectElt.setAttribute("name", "color");
  let colors = teddy.colors;
  for (let color of colors) {
    let colorOptionElt = document.createElement("option");
    colorOptionElt.setAttribute("value", color);
    colorOptionElt.textContent = color;
    colorSelectElt.appendChild(colorOptionElt);
  }

  // Création bouton pour ajout au panier
  let productAddToBasketElt = document.createElement("button");
  productAddToBasketElt.textContent = "Ajouter au panier";

  // Insertion des éléments relatifs au produit dans le DOM
  prevElt.appendChild(productImgElt);
  detailsElt.appendChild(productTitleElt);
  detailsElt.appendChild(productDescrElt);
  detailsElt.appendChild(productPriceElt);
  detailsElt.appendChild(qteLabelElt);
  detailsElt.appendChild(qteSelectElt);
  detailsElt.appendChild(colorLabelElt);
  detailsElt.appendChild(colorSelectElt);
  detailsElt.appendChild(productAddToBasketElt);
  document.getElementById("preview").appendChild(prevElt);
  document.getElementById("preview").appendChild(detailsElt);
}

getOneProduct();