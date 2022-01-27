class Review {
  id = "";
  product_id = "";
  user_id = "";
  description = "";
  rating = 0;

  constructor(json) {
    this.id = json.id;
    this.product_id = json.product_id;
    this.user_id = json.user_id;
    this.description = json.description;
    this.rating = json.rating;
  }
}

export default Review;
