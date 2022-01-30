var baseUrl = "http://localhost/E-Commerce-Backend/php/";

async function getAllOrders() {
  var users = [];
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "order_details",
      data: `-1`,
    });
    console.log("[getUserById] success");
    jqxhr.Data.forEach((element) => {
      users.push(element);
    });
  } catch (error) {
    console.log("[getUserById]", error);
    console.log("[getUserById] error");
  }

  return users;
}

export { getAllOrders };
