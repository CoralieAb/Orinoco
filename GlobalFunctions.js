function formatCurrencyElement(data) {
  return (data / 100).toFixed(2) + " €";
}

function getTotalQtyInCart() {
  //initialisation de la variable qui recevra la quantité total des articles du panier
  let totalCartQty = 0;
  for (i = 0; i < localStorage.length; i++) {
    let articleInCart = JSON.parse(localStorage.getItem(localStorage.key(i)));
    //Incrémentation de la variable totalCartQty
    totalCartQty += articleInCart.qte;
    console.log(totalCartQty);
  }
  document.getElementById("qty-in-cart").textContent = "(" + totalCartQty + ")";
  return totalCartQty;
}

function getTotalPriceInCart() {
  //initialisation de la variable qui recevra le prix total du panier
  let totalCart = 0;
  for (i = 0; i < localStorage.length; i++) {
    let articleInCart = JSON.parse(localStorage.getItem(localStorage.key(i)));
    //Incrémentation de la variable totalCart
    totalCart += articleInCart.price * articleInCart.qte;
    console.log(totalCart);
  }
  return formatCurrencyElement(totalCart);
}