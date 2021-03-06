import { Review } from "../model/reviewModel.js";
var baseUrl = "http://localhost/E-Commerce-Backend/php/";
// "http://localhost/E-Commerce-Backend/php/";

export async function getProductReviewById(id = "1") {
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
export async function getAllReview() {
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
  return reviews;
}

export async function addProductReview(user, product, review) {
  console.log("addProductReview ", user, product, review);
  var user_id = user.id;
  var product_id = product.id;
  try {
    var jqxhr = await $.post(baseUrl + "create.php", {
      table: "review",
      data: `${product_id},${user_id},${review.description},${Number.parseInt(
        review.rating
      )} `,
    });
    console.log("[addProductReview] success");
    console.log(jqxhr);
  } catch (error) {
    console.log("[addProductReview] error");
    console.log(error);
  }
}

export async function getReviewsPerProduct(amount = 20) {
  var reviews = [];
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "review",
      data: "-1",
    });
    console.log("[getReviews] success");
    jqxhr.Data.forEach((element) => {
      reviews.push(new Review(element));
    });
  } catch (error) {
    console.log("[getReviews] error");
  }

  var rating = {};

  reviews.forEach((element) => {
    if (element.product_id in rating) {
      rating[element.product_id] += parseInt(element.rating);
    } else {
      rating[element.product_id] = parseInt(element.rating);
    }
  });

  function sortFunction(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return a[1] < b[1] ? 1 : -1;
    }
  }

  let entries = Object.entries(rating);
  let sorted = entries.sort(sortFunction).slice(0, amount);

  const constructObject = (arr) => {
    return arr.reduce((acc, val) => {
      const [key, value] = val;
      acc[key] = value;
      return acc;
    }, {});
  };

  return constructObject(sorted);
}
// export { getProductReviewById, addProductReview, getReviewsPerProduct };
