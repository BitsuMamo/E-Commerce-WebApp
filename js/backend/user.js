import User from "../model/userModel.js";

var baseUrl = "http://206.189.19.197:80/E-Commerce-Backend/php/";
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
export { getUserById as default };
