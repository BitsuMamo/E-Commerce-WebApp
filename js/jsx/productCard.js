function getProductCard(product, user) {
  var user = user;
  if (user == undefined) {
    user = new User({
      id: "1",
      username: "",
      first_name: "",
      last_name: "",
      telephone: "",
      img_url: "",
    });
  }
  var templet = `
    
    <div class="product-card" card-id="${product.id}">
    <div class="card-img">
      <img src="https://picsum.photos/id/${product.id}/1000/1000" alt="" />
    </div>
    <div class="user-info">
      <div class="user-img">
        <img src="https://picsum.photos/id/${user.id}/1000/1000" alt="" />
      </div>
      <p class="text title user-name">${user.username}</p>
    </div>
    <div class="product-info">
      <div class="left">
        <p class="text title">${product.name}</p>
      </div>
      <div class="right">
        <p class="text price">${product.price}</p>
      </div>
    </div>
  </div>

    `;

  return $(templet);
}

export { getProductCard as default };
