let regNameAndCity = /^[a-zà-ù][a-zà-ù-]*[a-zà-ù]$/i;
let regMail = /^[a-z][\w.-]+@[a-z][\w-]+\.[a-z]+$/i;

//Permet la validation des champs en live
function validerSaisieLive() {
  let inputElts = document.getElementsByTagName("input");
  for (let inputElt of inputElts) {
    inputElt.addEventListener("blur", function (e) {
      if (e.target.id == "lastname" || e.target.id == "firstname" || e.target.id == "city") {
        if (!regNameAndCity.test(e.target.value)) {
          e.target.style.borderColor = "red";
          e.target.classList.add("invalid");
        } else {
          e.target.style.borderColor = "green";
          e.target.classList.remove("invalid");
        }
      } else if (e.target.id == "email") {
        if (!regMail.test(e.target.value)) {
          e.target.style.borderColor = "red";
          e.target.classList.add("invalid");
        } else {
          e.target.style.borderColor = "green";
          e.target.classList.remove("invalid");
        }
      }
    });
  };
}

//Permet la validation à la soumission du formulaire
function validerSaisie() {
  const form = document.getElementById("order-information");
  if (regNameAndCity.test(form.elements.lastname.value) && regNameAndCity.test(form.elements.firstname.value) && regNameAndCity.test(form.elements.city.value) && regMail.test(form.elements.email.value)) {
    return true;
  } else {
    if (!regNameAndCity.test(form.elements.lastname.value)) {
      form.elements.lastname.style.borderColor = "red";
    } else {
      form.elements.lastname.style.borderColor = "green";
    }
    if (!regNameAndCity.test(form.elements.firstname.value)) {
      form.elements.firstname.style.borderColor = "red";
    } else {
      form.elements.firstname.style.borderColor = "green";
    }
    if (!regNameAndCity.test(form.elements.city.value)) {
      form.elements.city.style.borderColor = "red";
    } else {
      form.elements.city.style.borderColor = "green";
    }
    if (!regMail.test(form.elements.email.value)) {
      form.elements.email.style.borderColor = "red";
    } else {
      form.elements.email.style.borderColor = "green";
    }
    return false;
  }
}

//Soumission du formulaire
const form = document.getElementById("order-information");
form.addEventListener("submit", function (e) {
  if (validerSaisie() && localStorage.length > 0) {
    let contact = {
      lastName: form.elements.lastname.value,
      firstName: form.elements.firstname.value,
      address: form.elements.address.value,
      city: form.elements.city.value,
      email: form.elements.email.value
    }
    let products = [];
    for (i = 0; i < localStorage.length; i++) {
      products.push(localStorage.key(i));
    }
    const order = {
      contact: contact,
      products: products
    };
    console.log(order);
    fetch("https://oc-p5-api.herokuapp.com/api/teddies/order", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json"
      }
      })
      .then(response => {
        if (response.ok) {
          response.json()
            .then(data => {
              localStorage.clear();
              localStorage.setItem("orderId", JSON.stringify(data.orderId));
              localStorage.setItem("contact", JSON.stringify(data.contact));
              localStorage.setItem("products", JSON.stringify(data.products));
              window.location.href = "./order-confirmation.html";
            })
            .catch(error => {
                console.error(error);
            });
        } else {
          console.error("Réponse du serveur : " + response.status);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (!localStorage.length > 0) {
    alert("Votre panier est vide !");
  };
  e.preventDefault();
});

//Validation formulaire en live
validerSaisieLive();