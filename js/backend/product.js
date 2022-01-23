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
    console.log(jqxhr);
    jqxhr.Data.forEach((element) => {
      Products.push(new Product(element));
    });
  } catch (error) {
    console.log("[getProducts] error");
  }
  return Products;
}
function getProduct() {}

export { getProducts as default };
