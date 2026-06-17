const PRODUCT1_NAME = "Nvidia RTX 5090";
const PRODUCT1_PRICE = 2750;
let PRODUCT1_QTY = 0;

const PRODUCT2_NAME = "Intel Core i7-14700k";
const PRODUCT2_PRICE = 400;
let PRODUCT2_QTY = 0;

const VAT_RATE = 0.2;
const CURRENCY = "USD";
const USD_PER_EUR = 1.16;
const VALID_COUPONS = ["SAVE10", "SAVE15", "FREESHIP"];

console.log(typeof PRODUCT1_NAME);
console.log(typeof PRODUCT1_PRICE);
console.log(typeof VAT_RATE);
console.log(typeof PRODUCT1_QTY);
console.log(VALID_COUPONS);

// suma totala
let suma = Number(localStorage.getItem("suma")) || 0;

function adaugaLaSuma(pret) {
  try {
    if (typeof pret !== "number" || isNaN(pret) || pret < 0) {
      throw new Error("Pret invalid.");
    }

    suma += pret;
    localStorage.setItem("suma", suma);

    console.log(`Suma curenta este: $${suma}`);
    showCartPopup(`Ai adaugat produs! Total: $${suma}`);
  } catch (error) {
    console.error("Eroare:", error.message);
  }
}

// demonstratie consola
console.log("Functie adaugaLaSuma:");
let sumaTest = 0;

function adaugasuma(pret) {
  sumaTest += pret;
  console.log(`Dupa adaugarea pretului ${pret}, suma totala este: $${sumaTest}`);
}

adaugasuma(2750);
adaugasuma(400);
adaugasuma(190);

function normalizeCoupon(code) {
  let trimmedCode = code.trim();
  let upperCaseCode = trimmedCode.toUpperCase();
  return upperCaseCode;
}

// verifica cuponul
function isValidCoupon(code) {
  for (let i = 0; i < VALID_COUPONS.length; i++) {
    if (VALID_COUPONS[i] === code) {
      return true;
    }
  }
  return false;
}

// validare + mesaj
function validateAndNotify() {
  try {
    const promoInput = document.querySelector("#promo-input");

    if (!promoInput) {
      throw new Error("Campul pentru promo code nu exista in pagina.");
    }

    const code = promoInput.value;
    const normalizedCode = normalizeCoupon(code);

    if (isValidCoupon(normalizedCode)) {
      if (normalizedCode === "SAVE10") {
        alert("Cuponul dvs. oferă 10% reducere.");
      } else if (normalizedCode === "SAVE15") {
        alert("Cuponul dvs. oferă 15% reducere.");
      } else if (normalizedCode === "FREESHIP") {
        alert("Cuponul dvs. oferă livrare gratuită.");
      }
    } else {
      alert("Codul introdus nu este valid.");
    }
  } catch (error) {
    console.error("Eroare la validarea cuponului:", error.message);
  }
}

// login
function login(emailValue, passwordValue) {
  try {
    let email = emailValue;
    let password = passwordValue;

    if (email === undefined || password === undefined) {
      const emailInput = document.querySelector("#email");
      const passwordInput = document.querySelector("#password");

      if (!emailInput || !passwordInput) {
        throw new Error("Campurile de login nu exista in pagina.");
      }

      email = emailInput.value;
      password = passwordInput.value;
    }

    email = email.trim();
    password = password.trim();

    return email === "admin" && password === "admin";
  } catch (error) {
    console.error("Eroare la login:", error.message);
    return false;
  }
}

console.log(login("admin", "admin"));
console.log(login(" admin ", "admin"));
console.log(login("Admin", "admin"));
console.log(login("admin", " ADMIN "));
console.log(login("", ""));

function handleLogin(event) {
  if (event) {
    event.preventDefault();
  }

  const isLoggedIn = login();

  if (isLoggedIn) {
    alert("Autentificare reusita!");
    window.location.href = "product.html";
  } else {
    alert('Date incorecte. Foloseste "admin" si "admin".');
  }
}

function showCartPopup(text) {
  const popup = document.getElementById("cart-popup");

  if (!popup) return;

  popup.textContent = text;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
}

function afiseazaSumaCurenta(event) {
  if (event) event.preventDefault();
  showCartPopup(`Suma totala: $${suma}`);
}

// array obiecte
const allProducts = [
  { name: "Nvidia RTX 5090", price: 2750, qty: 4 },
  { name: "Intel Core i7-14700k", price: 400, qty: 12 },
  { name: "Placa de baza ASUS ROG STRIX Z890-E GAMING", price: 400, qty: 8 },
  { name: "Memorie RAM Kingston 16 GB DDR5", price: 190, qty: 15 },
  { name: "Carcasa PC", price: 105, qty: 6 },
  { name: "SSD Seagate Firecuda 530R 1TB", price: 150, qty: 20 },
  { name: "Cooler procesor racire lichida ASUS ROG", price: 120, qty: 7 },
  { name: "Pasta termoconductoare Arctic Silver 5", price: 20, qty: 30 }
];

// valoare stoc
function calculeazaValoareaTotalaStocului(products) {
  let totalValue = 0;

  for (let i = 0; i < products.length; i++) {
    totalValue += products[i].price * products[i].qty;
  }

  console.log(`Valoarea totala a stocului: ${totalValue} USD`);
  return totalValue;
}

calculeazaValoareaTotalaStocului(allProducts);

// lowstock
const lowStock = [];

for (let i = 0; i < allProducts.length; i++) {
  if (allProducts[i].qty < 10) {
    lowStock.push(allProducts[i]);
  }
}

console.log("Produse cu stoc mic:", lowStock);

// findproduct
function findProductByName(list, searchName) {
  let normalizedSearchName = searchName.toLowerCase().trim();

  for (let i = 0; i < list.length; i++) {
    let normalizedProductName = list[i].name.toLowerCase().trim();

    if (normalizedProductName === normalizedSearchName) {
      return list[i];
    }
  }

  return null;
}

// teste in consola
console.log(findProductByName(allProducts, "Nvidia RTX 5090"));
console.log(findProductByName(allProducts, "   intel core i7-14700k   "));
console.log(findProductByName(allProducts, "produs inexistent"));

document.addEventListener("DOMContentLoaded", function () {
  const promoButton = document.querySelector("#apply-promo-btn");
  if (promoButton) {
    promoButton.addEventListener("click", validateAndNotify);
  }

  const loginButton = document.querySelector("#login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", handleLogin);
  }

  const cartIcons = document.querySelectorAll(".cart-icon");
  cartIcons.forEach((icon) => {
    icon.addEventListener("click", afiseazaSumaCurenta);
  });
});