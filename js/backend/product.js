import Product from "../model/productModel.js";

var baseUrl = "http://localhost/E-Commerce-Backend/php/";

async function getProducts(type = "random") {
  var Products = [];
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
