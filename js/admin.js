import { getProducts } from "./backend/product.js";
import { getAllReview } from "./backend/review.js";
import { getAllUser, getAllSupplier } from "./backend/user.js";
import { getAllOrders } from "./backend/order.js";
import { getTabel } from "./jsx/table.js";

const fun = {
  "View Product": getProducts,
  "View Feedback": getAllReview,
  "View Customer": getAllUser,
  "View Order": getAllOrders,
  "View Supplier": getAllSupplier,
};
const funArg = {
  "View Product": "all",
  "View Feedback": 100,
  "View Customer": "all",
  "View Order": "all",
  "View Supplier": "all",
};

$(document).ready(async () => {
  $(".side-nav .dash-menu .dash-key").click(function (e) {
    let navigatTo = $(this).text();
    $(".side-nav .dash-menu .dash-key").removeClass("active-dash-menu");
    $(this).addClass("active-dash-menu");
    console.log(navigatTo);
    changeView(navigatTo);
  });
  $(window).on("scroll", function () {
    var scrollleft = $(window).scrollLeft();
    if (scrollleft > 50) {
      $(".side-nav").addClass("side-nav-scroll");
    } else {
      $(".side-nav").removeClass("side-nav-scroll");
    }
  });

  changeView();
});

async function changeView(to = "View Product") {
  $("#main .loader-wrapper").removeClass("display-none");
  $("#main").addClass("display-none");

  let _to = to.replace(" ", "");
  const product = await fun[to](funArg[to]);
  var table = getTabel(Object.keys(product[0]), product);

  $("#main").empty();
  $(`#main`).append($(`<div id="${_to}"></div>`));
  $(`#main #${_to}`).append(table);

  $("#main .loader-wrapper").addClass("display-none");
  $("#main").removeClass("display-none");
}
