import User from "../model/userModel.js";

var baseUrl = "http://localhost/E-Commerce-Backend/php/";

async function getUserById(user_id = "") {
  var user = undefined;
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "user",
      data: `${user_id}`,
    });
    console.log("[getUserById] success");
    jqxhr.Data.forEach((element) => {
      user = new User(element);
    });
  } catch (error) {
    console.log("[getUserById]", error);
    console.log("[getUserById] error");
  }

  return user;
}
async function getAllUser() {
  var users = [];
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "user",
      data: `-1`,
    });
    console.log("[getUserById] success");
    jqxhr.Data.forEach((element) => {
      users.push(new User(element));
    });
  } catch (error) {
    console.log("[getUserById]", error);
    console.log("[getUserById] error");
  }

  return users;
}
async function getAllSupplier() {
  var users = [];
  try {
    var jqxhr = await $.post(baseUrl + "select.php", {
      table: "supplier",
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

export { getUserById as default };
export { getAllUser, getAllSupplier };
