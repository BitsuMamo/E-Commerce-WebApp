function checkUserLogIn() {
  var userid = localStorage.getItem("user");
  if (userid) {
    return true;
  }
  return false;
}
