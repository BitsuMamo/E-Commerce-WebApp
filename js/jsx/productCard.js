function getProductCard(product, user, mag = false, useFackImage = false) {
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
  let productimg = useFackImage
    ? `https://picsum.photos/id/${product.id}/1000/1000`
    : product.img_url;

  var templet = `
    
    <div class="product-card" card-id="${product.id}">
    <div class="card-img">
      <img src=${productimg} alt="" />
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

    ${
      mag
        ? `<div class="mag">
      <button class="button mag-button" id="sub">
        <img src="https://www.freeiconspng.com/uploads/subtract-icon-png-16.png" />
      </button>

      <div class="badge">d
        <p class="text">0</p>
      </div>

      <button class="button mag-button" id="add">
        <img src="https://i.pinimg.com/564x/a5/6d/35/a56d3517bb1323832680fbe7eb342da0.jpg" />
      </button>
    </div>`
        : ""
    }
  </div>

    `;

  return $(templet);
}

export { getProductCard as default };
