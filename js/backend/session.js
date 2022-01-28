var baseUrl = "http://206.189.19.197:80/E-Commerce-Backend/php/";
async function startSession(user) {
  var user_id = user.id;
  try {
    var jqxhr = await $.post(baseUrl + "create.php", {
      table: "shopping_session",
      data: `${user_id},0`,
    });
    console.log("[getProducts] success");
    console.log(jqxhr);
    jqxhr.Data.forEach((element) => {
      Products.push(new Product(element));
    });
  } catch (error) {
    console.log("[getProducts] error");
  }
}

export { startSession as default };
