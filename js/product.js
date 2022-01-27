import getUserById from "./backend/user.js";
import { getProducts, getProductById } from "./backend/product.js";
import getProductCard from "./jsx/productCard.js";
import { getCart, addToCart } from "./jsx/cart.js";
import { getProductReviewById, addProductReview } from "./backend/review.js";
import getReviewCard from "./jsx/reviewCard.js";

$(document).ready(async () => {
  const productId = document.foucsProductId;
  if (productId == undefined) {
    window.location.href = "404.html";
  }

  var cart_ = getCart();
  cart_ = cart_.filter((ele) => ele == productId);
  $(".buy-and-count > .badge > p.text").text(cart_.length);

  $(".buy-and-count > #buy").click(buyProduct);

  const loading = $(".loader-wrapper");
  const onLoaded = $("#onload");

  const hero = $("#hero");
  const sideCard = $("#hero #product-side-card");

  onLoaded.addClass("display-none");
  //get product info
  const product = await getProductById(productId);
  if (product == null) {
    window.location.href = "404.html";
  }

  $(".buy-and-count > #buy").text(product.price);
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

  sideCard
    .find("div.more div.user-info .user-img > img")
    .attr("src", `https://picsum.photos/id/${user.id}/1000/1000`);

  const productHighlights = [
    product.price + " BIRR",
    (Math.random() * 10).toFixed() + " /10",
    "Verified",
    // product.rating,
    // product.verified ? "Verified" : "Not Verified",
  ];

  const highlights = $("#highlights .minCard");
  for (let index = 0; index < highlights.length; index++) {
    $($(highlights)[index]).find("p.title").text(productHighlights[index]);
    console.log("productHighlights[index]", productHighlights[index]);
  }

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

  $(`#user-feedback-input .user-img > img`).attr(
    "src",
    `https://picsum.photos/id/${user.id}/1000/1000`
  );
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

  const Reviews = await getProductReviewById(productId);
  Reviews.forEach((element) => {
    var review = getReviewCard(element, user);
    $(`.feed-back > #other-user-input`).prepend(review);
  });

  const user_input = $(`.feed-back > #user-feedback-input textarea#input`);
  console.log("user_input", user_input);
  const user_input_btn = $(`.feed-back > #user-feedback-input #submit`);
  $(user_input_btn).click(async (e) => {
    e.stopPropagation();
    var user = await getUserById(user_id);
    var review = {
      user_id: user_id,
      product_id: productId,
      description: $(user_input).val(),
      rating: 0,
    };
    await addProductReview(user, product, review);
    let Reviews = await getProductReviewById(productId);
    console.log("Reviews", Reviews);
    $(`.feed-back > #other-user-input`).empty();
    Reviews.forEach((element) => {
      var review = getReviewCard(element, user);
      $(`.feed-back > #other-user-input`).prepend(review);
      // $(`.feed-back > #other-user-input`).prepend(review_card);
    });

    user_input.val("");
  });

  loading.addClass("display-none");
  onLoaded.removeClass("display-none");
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
  const product = await getProductById(id);
  addToCart(product);
}

async function buyProduct(product) {
  const productId = document.foucsProductId;
  addToCart(await getProductById(productId));
  var cart_ = getCart();
  cart_ = cart_.filter((ele) => ele == productId);
  console.log("badge", cart_);
  $(".buy-and-count > .badge > p.text").text(cart_.length);
}
