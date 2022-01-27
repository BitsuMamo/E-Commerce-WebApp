import { getProductById } from "./backend/product.js";
import getUserById from "./backend/user.js";
import { getCart } from "./jsx/cart.js";
import getProductCard from "./jsx/productCard.js";

$(document).ready(async () => {
  const conunt = {};
  const ProductsIds = getCart();
  conunt[ProductsIds[0]] = 1;
  ProductsIds.forEach(async (element) => {
    if (element in conunt) {
      conunt[element]++;
    }
  });

  Object.keys(conunt).forEach(async (element) => {
    let Product = await getProductById(element);
    console.log(Product);
    var supplier = await getUserById(Product.supplier_id);
    console.log(supplier);
    var productCard = getProductCard(Product, supplier, true);
    console.log(productCard);
    $(productCard).click(productCilck);

    $($(productCard).find(".product-info > .right > p.price")).click(buyCilck);
    $(`.list`).append(productCard);
    $($(productCard).find(".mag .badge p.text")).text(conunt[element]);

    $(`.loader-wrapper`).addClass("display-none");
  });
});

function productCilck(e) {
  e.stopPropagation();
  var card = $(e.target.closest("div.product-card"));
  var id = card.attr("card-id");
  window.location.href = `product.html?id=${id}`;
}
async function buyCilck(e) {
  e.stopPropagation();
  var card = $(e.target.closest("div.product-card"));
  var id = card.attr("card-id");
  // var total = addCart(getProductById(id));
  // updateCart(total);
  // updateCart(1);
  const product = await getProductById(id);
  addToCart(product);
}
