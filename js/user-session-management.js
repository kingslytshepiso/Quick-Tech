const loggedCookieKey = "logged";
const userCookieKey = "userId";
function checkLogginStatus() {
  let loggedStatus = getCookie(loggedCookieKey);
  let userLogged = getCookie(userCookieKey);
  if (loggedStatus && userLogged) {
    return true;
  } else {
    return false;
  }
}
function getLoggedUser() {
  if (getCookie(userCookieKey)) {
    return getCookie(userCookieKey);
  } else {
    return "guest";
  }
}
function logIn(username, password) {
  if (checkLogginStatus()) {
    console.log("already logged");
    window.location.href = "./index-in.html";
  } else {
    var user = null;
    var avaUsers = getJsonCookie("Users");
    let found = false;
    console.log(avaUsers);
    $.each(avaUsers, function () {
      console.log(this);
      if (this["email"] == username && this["password"] == password) {
        found = true;
        user = this;
        setCookie(loggedCookieKey, true);
        setCookie(userCookieKey, this["userId"]);
        return false;
      } else {
        return true;
      }
    });
    if (found) {
      console.log("found");
      document.location.href = "./signed-in-products.html";
    } else {
      $("#form-summary").html("Invalid username or password.");
    }
  }
}
function signOut() {
  removeCookie(loggedCookieKey);
  removeCookie(userCookieKey);
  document.location.href = "./index.html";
}
function signUp(userInfo) {}
function getUsers() {
  return users;
}
var users = [
  {
    userId: "1",
    fname: "Ruth",
    lname: "Hlongwane",
    email: "ruth.hlongwane@quicktech.co.za",
    password: "12345678",
  },
  {
    userId: "2",
    fname: "Katekani",
    lname: "Khoza",
    email: "katekani.khoza@quicktech.co.za",
    password: "12345678",
  },
];
