// import { Producto } from "./ProductoClass.js";
class Producto {
  constructor(id, nombre, precio, categoria) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
  }
}
const arrayProductos = [
  new Producto(1, "Viola 16 pulgadas", 650, "instrumentos"),
  new Producto(2, "Violin 4/4", 500, "instrumentos"),
  new Producto(
    3,
    "RockJam Kit de piano de teclado con pantalla táctil",
    300,
    "instrumentos"
  ),
  new Producto(
    4,
    "D Z Strad - Viola de 15,5 pulgadas hecha a mano",
    1500,
    "instrumentos"
  ),
  new Producto(
    5,
    "Sabomenia Violin Dreamer D10 hecho a mano",
    299,
    "instrumentos"
  ),
  new Producto(
    6,
    "Starument Piano de teclado eléctrico prémium",
    149,
    "instrumentos"
  ),
  new Producto(7, "D'Addario Kaplan Premium Rosin", 8, "accesorios"),
  new Producto(
    8,
    "Bernardel Original – Colofonia para violín y viola",
    12,
    "accesorios"
  ),
];

const carrito = [];

//DOM, cambio de cantidad de artículos

let minusBtn = document.querySelector(".input__minus");
let plusBtn = document.querySelector(".input__plus");
let userInput = document.querySelector(".input__number");
let contenedor = document.getElementById("contenedor");

arrayProductos.forEach((el,index)=>{
  const section = document.createElement("section");
  section.classList.add("card");
  section.id = "producto" + (index + 1);
  const articule = `
                      <article class="card__img"></article>
                        <article class="card__title">
                          ${el.nombre}
                          <div class="card__description">
                            <p>
                              El kit de piano de teclado RockJam 761 incluye un teclado digital
                              con 61 teclas de tamaño completo mientras mantiene un diseño
                              portátil y compacto que puede ser alimentado por red eléctrica
                              (fuente de alimentación incluida) o baterías
                            </p>
                          </div>
                          <div class="card__price">$${el.precio}</div>
                          <div class="card__product-quantity">
                            <div class="input">
                              <img
                                class="input__minus"
                                src="./recursos/icon-minus.svg"
                                alt="minus"
                              />
                              <input class="input__number" type="number" value="0" />
                              <img
                                class="input__plus"
                                src="./recursos/icon-plus.svg"
                                alt="plus"
                              />
                            </div>
                          </div>                          
                        </article>`
  section.innerHTML = articule;

  const div = document.createElement("div");
  const button = document.createElement("button");

  div.classList.add("cart__button")
  button.innerHTML = ` Añadir al carrito
          <img src="./recursos/shopping-cart.png" alt="carrito" />`

  button.addEventListener("click",()=>{
    carrito.push(el);
    console.log(carrito);
  })
  div.appendChild(button);
  section.appendChild(div);
  contenedor.appendChild(section);
})

let userInputNumber = 0;

// plusBtn.addEventListener("click", () => {
//   userInputNumber++;
//   userInput.value = userInputNumber;
//   console.log(userInputNumber);
// });

// minusBtn.addEventListener("click", () => {
//   userInputNumber--;
//   if (userInputNumber <= 0) {
//     userInputNumber = 0;
//   }
//   userInput.value = userInputNumber;
//   console.log(userInputNumber);
// });

// Agregar el total de productos al carrito cuando se presiona el botón Añadir al carrito
const addToCartBtn = document.querySelector(".cart__button");
let cartNotification = document.querySelector(".header__cart--notification");
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener("click", () => {
  lastValue += userInputNumber;

  cartNotification.innerText = lastValue;
  cartNotification.style.display = "block";
  drawProductInModal();
  priceModal.innerHTML = `$4.99 x ${lastValue} <span>$${
    lastValue * 4.99
  }</span>`;

  localStorage.setItem("cartValue", lastValue.toString());
});

// Mostrar el modal con el detalle
const cartIconBtn = document.querySelector(".header__cart");
const cartModal = document.querySelector(".cart-modal");
const productContainer = document.querySelector(
  ".cart-modal__checkout-container"
);
let priceModal = document.querySelector(".cart-modal__price");

cartIconBtn.addEventListener("click", () => {
  cartModal.classList.toggle("show");
  if (lastValue === 0) {
    drawProductInModal();
  }
});

// Borrar contenido del carrito
function deleteProduct() {
  const deleteProductBtn = document.querySelector(".cart-modal__delete");

  deleteProductBtn.addEventListener("click", () => {
    productContainer.innerHTML =
      '<p class="cart-empty">Tu carrito está vacío</p>';
    lastValue = 0;
    cartNotification.innerText = lastValue;
    priceModal.innerHTML = "";
    // Eliminar el valor del carrito del almacenamiento local
    localStorage.removeItem("cartValue");
  });
}

// FUNCIONES
function drawProductInModal() {
  productContainer.innerHTML = `<div class="cart-modal__details-container">
    <img src="./recursos/piano.jpg" alt="piano" />
    <div>
      <p class="cart-modal__product">RockJam kit de piano...</p>
      <p class="cart-modal__price">$4.99 x ${lastValue} <span>$${
    lastValue * 4.99
  }</span></p>
    </div>
    <div class="cart-modal__delete-img">
      <img class="cart-modal__delete" src="./recursos/icon-delete.svg" alt="delete" />
    </div>
  </div>
  <button class="cart-modal__checkout">Checkout</button>
  `;
  deleteProduct();
  priceModal = document.querySelector(".cart-modal__price");
  priceModal.innerHTML = `$4.99 x ${lastValue} <span>$${
    lastValue * 4.99
  }</span>`;
}

// Obtener el valor del carrito almacenado en el localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const storedValue = localStorage.getItem("cartValue");
  if (storedValue) {
    lastValue = parseInt(storedValue);
    cartNotification.innerText = lastValue;
    cartNotification.style.display = lastValue > 0 ? "block" : "none";
    priceModal.innerHTML = `$4.99 x ${lastValue} <span>$${
      lastValue * 4.99
    }</span>`;
  }
});
