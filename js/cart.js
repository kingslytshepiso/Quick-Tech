const CookieKey = "userCart";
function checkCart() {
  let userCart = getJsonCookie(CookieKey + getLoggedUser());
  if (userCart != "" && userCart != undefined) {
    /**Update cart items badge */
  } else {
    /**Create a new cart for the new user */
    var userId = getLoggedUser();
    if (userId && userId != "guest") {
      createCart(userId);
    } else if (userId == "guest") {
      removeCookie(CookieKey + userId);
      createCart(userId);
      return true;
    } else {
      var guest = confirm("Do you wish to browse as a guest?");
      if (guest) {
        createCart(userId);
        return true;
      } else {
        document.location.href = "./signin.html";
      }
    }
  }
}
function checkForDuplicates() {
  var cartData = getCartData();
  var cartItems = cartData.items;
  for (let i = 0; i < cartItems.length; i++) {
    var matchCount = 0;
    var currentItem = cartItems[i][0];
    for (let r = 0; r < cartItems.length; r++) {
      if (currentItem.id == cartItems[r][0].id) {
        matchCount++;
      } else {
      }
    }
    if (matchCount > 1) {
      cartItems = cartItems.splice(currentItem, 1);
    }
  }
  setJsonCookie(CookieKey + getLoggedUser(), cartData);
  updateCart();
}
function createCart(userId) {
  var cartCookie = { id: userId, items: [] };
  setJsonCookie(CookieKey + userId, cartCookie);
}
function getCartData() {
  return getJsonCookie(CookieKey + getLoggedUser());
}
function addToCart(id) {
  var cart = getCartData();
  var data = getJsonCookie("Data");
  var itemToAdd = data.filter((item) => item.id == id);
  cart["items"].push(itemToAdd);
  setJsonCookie(CookieKey + getLoggedUser(), cart);
  updateCart();
}
function updateCart() {
  var cartData = getCartData();
  $("#cartCount").html(cartData.items.length);
}
function removeFromCart(id) {
  var cartData = getCartData();
  const updatedCartItems = cartData["items"].filter(
    (item) => item[0].id !== id
  );
  console.log(updatedCartItems);
  cartData["items"] = updatedCartItems;
  setJsonCookie(CookieKey + getLoggedUser(), cartData);
  updateCart();
}
function clearCart() {
  var cartData = getCartData();
  cartData["items"] = [];
  setJsonCookie(CookieKey + getLoggedUser(), cartData);
  updateCart();
}
