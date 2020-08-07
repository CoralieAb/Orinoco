let regNameAndCity = /^[a-zà-ù][a-zà-ù-]*[a-zà-ù]$/i;
let regMail = /^[a-z][\w.-]+@[a-z][\w-]+\.[a-z]+$/i;

const form = document.getElementById("order-information");

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
form.addEventListener("submit", function (e) {
  let contact = new Object();
  if (validerSaisie()) {
    contact.lastname = form.elements.lastname.value;
    contact.firstname = form.elements.firstname.value;
    contact.address = form.elements.address.value;
    contact.city = form.elements.city.value;
    contact.email = form.elements.email.value
  };
  e.preventDefault();
});

//Validation formulaire en live
validerSaisieLive();