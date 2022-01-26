function updateCart(newTotal) {
  var cart = $("#nav .cart");
  var cart_counter = $("#nav .cart .cart-counter");
  cart_counter.text(newTotal);
}

export { updateCart as default };
