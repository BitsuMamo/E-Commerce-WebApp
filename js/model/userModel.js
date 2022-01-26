class User {
  id = "";
  username = "";
  first_name = "";
  last_name = "";
  telephone = "";
  img_url = "";

  constructor(json) {
    this.id = json.id;
    this.username = json.username;
    this.first_name = json.first_name;
    this.last_name = json.last_name;
    this.telephone = json.telephone;
    this.img_url = json.img_url;
  }
}

export { User as default };
