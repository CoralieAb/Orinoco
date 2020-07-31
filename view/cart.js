console.log(localStorage);

for (i = 0; i < localStorage.length; i++) {
  let trElt = document.createElement("tr");
  let articlesData = JSON.parse(localStorage.getItem(localStorage.key(i)));
  console.log(articlesData);
  let articleTab = [];
  for (let articleData in articlesData) {
    //console.log(articlesData[articleData]);
    articleTab.push(articlesData[articleData]);
  }
  console.log(articleTab);
  
  let nameCell = document.createElement("td");
  nameCell.textContent = articleTab[0];

  let colorCell = document.createElement("td");
  colorCell.textContent = articleTab[3];

  let priceCell = document.createElement("td");
  priceCell.textContent = articleTab[1];

  let qtyCell = document.createElement("td");
  qtyCell.textContent = articleTab[2];

  let totalRowCell = document.createElement("td");
  totalRowCell.textContent = parseInt(articleTab[1] * articleTab[2]);

  trElt.appendChild(nameCell);
  trElt.appendChild(colorCell);
  trElt.appendChild(priceCell);
  trElt.appendChild(qtyCell);
  trElt.appendChild(totalRowCell);
  document.getElementById("cart-content").appendChild(trElt);
};

document.getElementById("delete-cart").onclick = localStorage.clear();