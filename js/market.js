import initSlideshow from "./slideshow.js";
import getProducts from "./backend/product.js";
import getProductCard from "./jsx/productCard.js";

$(document).ready(async () => {
  console.log("ready");
  initSlideshow();

  // get products with tag "recent"
  var products = await getProducts("recent");
  products.forEach((element) => {
    var productCard = getProductCard(element);
    $("#recent-products-list > .list").append(productCard);
  });
  $("#recent-products-list > .loader-wrapper").addClass("display-none");

  products = await getProducts("popular");
  products.forEach((element) => {
    var productCard = getProductCard(element);
    $("#popular-products-list > .list").append(productCard);
  });
  $("#popular-products-list > .loader-wrapper").addClass("display-none");

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
