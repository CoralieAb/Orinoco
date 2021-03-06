function getOneProduct() {
  //var url = "http://localhost:3000/api/teddies/";
  let url = "https://oc-p5-api.herokuapp.com/api/teddies/";
  let location = window.location.search.substring(4);
  url += location;
  //console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(function (data) {
            createProductElements(data);
          });
      } else {
        console.error("Réponse du serveur : " + response.status);
      }
    })    
    .catch(function (error) {
      console.log(error);
    });
}

function createProductElements(response) {
  const teddy = response;
  console.log(teddy);

  // Modification du title dans le head
  document.title = teddy.name + " | Orinoco";

  //Modification du H1 de la page
  document.querySelector("h1").textContent = teddy.name;

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
  productPriceElt.textContent = formatCurrencyElement(teddy.price);

  let customGroup = document.createElement("div");
  customGroup.className = "custom-group";

  let customQtyGroup = document.createElement("div");
  
  let customColorGroup = document.createElement("div");

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

  // Création bouton pour ajout du/des produits dans le Local Storage et donc dans panier
  let addToCartElt = document.createElement("button");
  addToCartElt.setAttribute("data-id", teddy._id);
  addToCartElt.setAttribute("data-name", teddy.name);
  addToCartElt.setAttribute("data-price", teddy.price);
  addToCartElt.setAttribute("data-url", "./view/product.html?id=" + teddy._id);
  addToCartElt.textContent = "Ajouter au panier";
  //Ajout des produits dans le Local Storage au clic sur Ajout au panier
  addToCartElt.addEventListener("click", function() {
    let articleInCart = {
      name: teddy.name,
      price: teddy.price,
      qte: Number(qteSelectElt.value),
      color: colorSelectElt.value
    }
    localStorage.setItem(teddy._id, JSON.stringify(articleInCart));
    console.log(localStorage);
    if (confirm("Ajouté au panier ! \n Souhaitez-vous voir votre panier?")) {
      window.location.href = "./cart.html";
    } else {
      window.location.reload(true);
    }
  })

  // Insertion des éléments relatifs au produit dans le DOM
  prevElt.appendChild(productImgElt);
  detailsElt.appendChild(productTitleElt);
  detailsElt.appendChild(productDescrElt);
  detailsElt.appendChild(productPriceElt);
  customQtyGroup.appendChild(qteLabelElt);
  customQtyGroup.appendChild(qteSelectElt);
  customColorGroup.appendChild(colorLabelElt);
  customColorGroup.appendChild(colorSelectElt);
  customGroup.appendChild(customQtyGroup);
  customGroup.appendChild(customColorGroup);
  detailsElt.appendChild(customGroup);
  detailsElt.appendChild(addToCartElt);
  document.getElementById("preview").appendChild(prevElt);
  document.getElementById("preview").appendChild(detailsElt);
}

getOneProduct();
getTotalQtyInCart();