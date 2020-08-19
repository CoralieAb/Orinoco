console.log(localStorage);

// Création du panier depuis les données du LocalStorage(LS)
for (i = 0; i < localStorage.length; i++) {
  //Un élément ligne (tr) est généré pour chaque élément présent dans le LS
  let trElt = document.createElement("tr");
  let articleInCart = JSON.parse(localStorage.getItem(localStorage.key(i)));
  //console.log(articleInCart);

  //Un élement data (td) est généré pour chaque donnée présente dans un élément du LS
  let nameCell = document.createElement("td");
  nameCell.textContent = articleInCart.name;

  let colorCell = document.createElement("td");
  colorCell.textContent = articleInCart.color;

  let priceCell = document.createElement("td");
  //priceCell.textContent = articleInCart.price + " €";
  priceCell.textContent = formatCurrencyElement(articleInCart.price);

  let qtyCell = document.createElement("td");
  qtyCell.textContent = articleInCart.qte;

  let totalRowCell = document.createElement("td");
  totalRowCell.classList.add("total-row");
  //totalRowCell.textContent = parseFloat(articleInCart.price * articleInCart.qte).toFixed(2) + " €";
  totalRowCell.textContent = formatCurrencyElement(articleInCart.price * articleInCart.qte);

  //Création du bouton dans un élément td permettant la suppression de la ligne
  let deleteRowCell = document.createElement("td");
  let deleteRowButton = document.createElement("button");
  deleteRowButton.classList.add("delete");
  deleteRowButton.classList.add("delete-row");
  deleteRowButton.setAttribute("data-id", localStorage.key(i));
  deleteRowButton.textContent = "X";

  // Insertion des éléments relatifs aux produits du LS dans le DOM
  deleteRowCell.appendChild(deleteRowButton);
  trElt.appendChild(nameCell);
  trElt.appendChild(colorCell);
  trElt.appendChild(priceCell);
  trElt.appendChild(qtyCell);
  trElt.appendChild(totalRowCell);
  trElt.appendChild(deleteRowCell);
  document.getElementById("cart-content").appendChild(trElt);
};

//Modification du H1 small de la page avec la quantité total de produits dans le panier
document.querySelector("small").textContent = getTotalQtyInCart() + " article(s)";

//Affichage du prix total du panier dans l'élément DOM correspondant
document.getElementById("total-cart").textContent = "Total panier TTC : " + getTotalPriceInCart();

//Permet le vidage de la ligne du LS à supprimer et le rechargement de la fenêtre
const deleteRowButtons = document.getElementsByClassName("delete-row");
for (let deleteRowButton of deleteRowButtons) {
  deleteRowButton.addEventListener("click", function () {
    for (i = 0; i < localStorage.length; i++) {
      //console.log(localStorage.key(i));
      console.log(deleteRowButton.getAttribute("data-id"));
      if (localStorage.key(i) == deleteRowButton.getAttribute("data-id")) {
        if (confirm("Voulez-vous supprimer ces article du panier?")) {
          localStorage.removeItem(localStorage.key(i));
          window.location.reload(true);
        };
      };
    };
  });
};

//Permet le vidage du LS et le rechargement de la fenêtre
document.getElementById("delete-cart").addEventListener("click", function () {
  if (confirm("Voulez-vous supprimer la totalité du panier?")) {
    localStorage.clear();
    window.location.reload(true);
  };
});