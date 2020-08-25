console.log(localStorage);
let orderContent = document.getElementById("order-content");

let orderId = JSON.parse(localStorage.getItem("orderId"));
let orderContact = JSON.parse(localStorage.getItem("contact"));
let orderProducts = JSON.parse(localStorage.getItem("products"));
console.log(orderProducts);

let orderIdElement = document.createElement("p");
orderIdElement.textContent = "N° de commande : " + orderId;

let contactNameElement = document.createElement("p");
contactNameElement.textContent = "Nom, prénom : " + orderContact.lastName + " " + orderContact.firstName;

let contactAddressElement = document.createElement("p");
contactAddressElement.textContent = "Adresse : " + orderContact.address + ", " + orderContact.city;

let contactEmailElement = document.createElement("p");
contactEmailElement.textContent = "Email : " + orderContact.email;

let productsListElement = document.createElement("ul");
productsListElement.textContent = "Vos produits :"

for (i = 0; i < orderProducts.length; i++) {
  let productElement = document.createElement("li");
  productElement.textContent = orderProducts[i].name + " " + formatCurrencyElement(orderProducts[i].price);
  productsListElement.appendChild(productElement);
}

orderContent.appendChild(orderIdElement);
orderContent.appendChild(contactNameElement);
orderContent.appendChild(contactAddressElement);
orderContent.appendChild(contactEmailElement);
orderContent.appendChild(productsListElement);

localStorage.clear();