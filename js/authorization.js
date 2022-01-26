function checkUserLogIn() {
  var userid = localStorage.getItem("user_id");
  if (userid) {
    return true;
  }
  return false;
}
