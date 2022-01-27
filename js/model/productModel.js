class Product {
  id = "";
  name = "";
  description = "";
  category_id = "";
  inventory_id = "";
  price = 0.0;
  supplier_id = "";
  img_url = "";
  created_at = "";

  constructor(json) {
    this.id = json.id;
    this.name = json.name;
    this.description = json.description;
    this.category_id = json.category_id;
    this.inventory_id = json.inventory_id;
    this.price = json.price;
    this.supplier_id = json.supplier_id;
    this.img_url = json.img_url;
    this.created_at = json.created_at;
  }
}

class Category {
  id = "";
  name = "";
  description = "";
  products = [];

  constructor(json) {
    this.name = name;
    this.age = age;
  }
  displayInfo() {
    return this.name + "is " + this.age + " years old!";
  }
}

export { Product as default };
