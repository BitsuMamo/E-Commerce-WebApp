import Review from "../model/reviewModel.js";
var baseUrl = "http://localhost/E-Commerce-Backend/php/";

async function getProductReviewById(id = "1") {
  var reviews = [];
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "review",
      data: "-1",
    });
    console.log("jqxhr", jqxhr);
    jqxhr.Data.forEach((element) => {
      reviews.push(new Review(element));
    });
  } catch (error) {
    console.log("[getProductReviewById] error");
    console.log(error);
    return null;
  }
  return reviews.filter((element) => element.product_id == id);
}

async function addProductReview(user, product, review) {
  console.log("addProductReview ", user, product, review);
  var user_id = user.id;
  var product_id = product.id;
  try {
    var jqxhr = await $.post(baseUrl + "create.php", {
      table: "review",
      data: `${user_id},${product_id},${review.description},${Number.parseInt(
        review.rating
      )}`,
    });
    console.log("[addProductReview] success");
    console.log(jqxhr);
  } catch (error) {
    console.log("[addProductReview] error");
    console.log(error);
  }
}
export { getProductReviewById, addProductReview };
