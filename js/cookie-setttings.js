function setCookie(cookieName, cookieValue) {
  const d = new Date();
  d.setTime(d.getTime() + 100 * 24 * 60 * 60 * 1000);
  var expires = d.toUTCString();
  var cookieString =
    cookieName + "=" + cookieValue + "; expires=" + expires + ";path=/;";
  document.cookie = cookieString;
}
function setJsonCookie(cookieName, cookieValue) {
  var strObj = JSON.stringify(cookieValue);
  const d = new Date();
  d.setTime(d.getTime() + 100 * 24 * 60 * 60 * 1000);
  var expires = d.toUTCString();
  var cookieString =
    cookieName + "=" + strObj + "; expires=" + expires + ";path=/;";
  document.cookie = cookieString;
}
function removeCookie(cookieName) {
  const d = new Date();
  d.setTime(d.getTime() - 1000 * 24 * 60 * 60 * 1000);
  var expires = d.toUTCString();
  var cookieString = cookieName + "=;" + "; expires=" + expires + ";path=/;";
  document.cookie = cookieString;
}
function getCookie(cookieName) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
}
function getJsonCookie(cookieName) {
  let name = cookieName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      var strObj = c.substring(name.length, c.length);
      var returnObj = JSON.parse(strObj);
      return returnObj;
    }
  }
}
function checkCookie() {
  let username = getCookie("username");
  if (username != "" && username != undefined) {
    alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username);
    }
  }
}
