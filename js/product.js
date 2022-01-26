import getUserById from "./backend/user.js";
import { getProducts, addCart, getProductById } from "./backend/product.js";
import getProductCard from "./jsx/productCard.js";
import updateCart from "./jsx/cart.js";
$(document).ready(async () => {
  const productId = document.foucsProductId;
  if (productId == undefined) {
    window.location.href = "404.html";
  }
  const loading = $(".loader-wrapper");
  const onLoaded = $("#onload");

  const hero = $("#hero");
  const sideCard = $("#hero #product-side-card");

  onLoaded.addClass("display-none");
  //get product info
  var product = await getProductById(productId);
  if (product == null) {
    window.location.href = "404.html";
  }
  console.log(product);

  // set the hero image to the product image
  hero.css(
    "background-image",
    `url(https://picsum.photos/id/${productId}/1000/1000)`
  );

  // set sideCard info
  sideCard
    .find("div#img > img")
    .attr("src", `https://picsum.photos/id/${productId}/1000/1000`);

  sideCard.find("div#body > p.title").text(product.name);
  sideCard.find("div#body > p.sub-title").text(product.description);

  var user = await getUserById(product.supplier_id);
  console.log(user);

  sideCard
    .find("div.more div.user-info .user-img > img")
    .attr("src", `https://picsum.photos/id/${user.id}/1000/1000`);

  loading.addClass("display-none");
  onLoaded.removeClass("display-none");

  var products_types = [
    "all",
    "recent",
    "popular",
    "discount",
    "featured",
    "more",
  ];
  //var user_id = localStorage.getItem("user_id");
  var user_id = "1";
  // get user data
  var user = await getUserById(user_id);

  // insert product cards by type

  var products = await getProducts("more");
  products.forEach(async (element) => {
    var supplier = await getUserById(element.supplier_id);
    var productCard = getProductCard(element, supplier);
    $(productCard).click(productCilck);
    $($(productCard).find(".product-info > .right > p.price")).click(buyCilck);
    $(`#more-products-list > .list`).append(productCard);
    $(`#more-products-list > .loader-wrapper`).addClass("display-none");
  });
});

function productCilck(e) {
  e.stopPropagation();
  var card = $(e.target.closest("div.product-card"));
  var id = card.attr("card-id");
  window.location.href = `product.html?id=${id}`;
}
function buyCilck(e) {
  e.stopPropagation();
  var card = $(e.target.closest("div.product-card"));
  var id = card.attr("card-id");
  // var total = addCart(getProductById(id));
  // updateCart(total);
  updateCart(1);
}
