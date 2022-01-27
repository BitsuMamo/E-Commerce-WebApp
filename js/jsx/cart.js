function updateCart(newTotal) {
  var cart = $("#nav .cart");
  var cart_counter = $("#nav .cart .cart-counter");
  cart_counter.text(newTotal);
}

function addToCart(product) {
  console.log("addToCart", product.id);
  var cart = getCart();
  console.log(cart.length);
  cart.push(product.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart(cart.length);
}

function getCart() {
  return localStorage.getItem("cart") == null
    ? []
    : JSON.parse(localStorage.getItem("cart"));
}
function removeCart(product) {
  var cart = getCart();
  var index = cart.indexOf(product.id);
  cart.splice(index, 1);
  localStorage.setItem(cart, JSON.stringify(cart));
  updateCart(cart.length);
}

export { updateCart, addToCart, getCart, removeCart };
