import Product from "../model/productModel.js";
import getReviewsPerPoduct from "../backend/review.js";

var baseUrl = "http://localhost/E-Commerce-Backend/php/";

async function getProducts(type = "random") {
  var Products = [];
  var currentTime = Date.now();
  var timeTillStgShowsUp = 311040000000;
  var jqxhr;
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "product",
      data: "-1",
    });
    console.log("[getProducts] success");
  } catch (error) {
    console.log("[getProducts] error");
  }

  switch (type) {
    case "all":
      jqxhr.Data.forEach((element) => {
        Products.push(new Product(element));
      });
      break;

    case "recent":
      jqxhr.Data.filter((element) => {
        var createdTime = Date.parse(element.created_at);
        var timeDiff = currentTime - createdTime;
        if (timeDiff <= timeTillStgShowsUp) {
          return true;
        }
        return false;
      }).forEach((element) => {
        Products.push(new Product(element));
      });
      console.log(Products.length);
      break;

    case "popular":
      var ratings = await getReviewsPerPoduct(50);

      jqxhr.Data.forEach((element) => {
        if (element.id in ratings) {
          Products.push(new Product(element));
        }
      });

      break;

    case "discount":
      break;

    case "featured":
      break;
  }

  return Products;
}

async function getProductById(id = "1") {
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "product",
      data: id,
    });
  } catch (error) {
    console.log("[getProducts] error");
    return null;
  }
  return new Product(jqxhr.Data[0]);
}
async function addCart(products) {
  var shoping_session = localStorage.getItem("shoping_session");
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "product",
      data: "-1",
    });
    console.log("[getProducts] success");
    // console.log(jqxhr);
    jqxhr.Data.forEach((element) => {
      Products.push(new Product(element));
    });
  } catch (error) {
    console.log("[getProducts] error");
  }
}

export { getProducts, addCart, getProductById };
