import initSlideshow from "./slideshow.js";
import { getProducts, getProductById } from "./backend/product.js";
import getProductCard from "./jsx/productCard.js";
// import checkUserLogIn from "./authorization.js";
import getUserById from "./backend/user.js";
import { addToCart, getCart, updateCart } from "./jsx/cart.js";

var products_types = ["all", "recent", "popular", "discount", "featured"];

$(document).ready(async () => {
  console.log("ready");
  initSlideshow();

  updateCart(getCart().length);

  //var user_id = localStorage.getItem("user_id");
  var user_id = "1";
  // get user data
  var user = await getUserById(user_id);

  // insert product cards by type
  products_types.forEach(async (type) => {
    var products = await getProducts(type);
    products.forEach(async (element) => {
      var supplier = await getUserById(element.supplier_id);
      var productCard = getProductCard(element, supplier);
      $(productCard).click(productCilck);
      $($(productCard).find(".product-info > .right > p.price")).click(
        buyCilck
      );
      $(`#${type}-products-list > .list`).append(productCard);
      $(`#${type}-products-list > .loader-wrapper`).addClass("display-none");
    });
  });

  // nav on scoll change color
  const nav = $("#hero #nav");
  const hero = $("#hero");

  $(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();
    const heroHeight = hero.height();
    const heightFactor = heroHeight * 0.2;
    if (scrollTop > heightFactor) {
      // nav.animate({ height: "60px" }, 200);
      nav.addClass("nav-scroll");
      nav.addClass("gmd-5");
    } else {
      nav.removeClass("nav-scroll");
      nav.removeClass("gmd-5");
    }
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
