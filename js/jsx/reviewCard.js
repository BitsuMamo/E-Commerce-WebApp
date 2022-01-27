function getReviewCard(review) {
  var templet = `
      
    <div class="user-warpper">
    <div class="user-img">
      <img src="https://picsum.photos/id/${review.user_id}/1000/1000" alt="" />
    </div>
    <p id="input">
        ${review.description}
    </p>
    </div>
  
      `;

  return $(templet);
}

export { getReviewCard as default };
