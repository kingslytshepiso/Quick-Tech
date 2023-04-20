$(document).ready(function () {
  loadData();
  loadUsers();
  checkCart();
  loadCart();
  $("body").append($(tempOuter));
  updateButtons();
  checkForDuplicates();
  loadCartItems();
  $("#dlt-btn").on("click", function () {
    removeFromCart($(this).attr("data-item-id"));
    loadCartItems();
  });
  $("*[id*=dlt-btn]:visible").on("click", function () {
    var itemToDeleteId = $(this).attr("data-item-id");
    console.log(itemToDeleteId);
    removeFromCart(itemToDeleteId);
    loadCartItems();
  });
  $("*[id*=itemCount-for]:visible").on("change", function () {
    let overallTotalPrice = 0;
    var thisItemCount = $(this).val();
    $(this).attr("data-itemCountValue", thisItemCount);
    var priceTag = "price-for-" + $(this).attr("data-item-id");

    $("#" + priceTag).html(
      Number($(this).attr("data-original-price") * thisItemCount)
    );
    let totalPrice = 0;
    var allPrices = $("*[id*=itemCount-for]:visible");
    for (let i = 0; i < allPrices.length; i++) {
      var itemPrice = 0;
      itemPrice = Number(
        $(allPrices[i]).attr("data-original-price") *
          $(allPrices[i]).attr("data-itemCountValue")
      );
      console.log(itemPrice);
      console.log(allPrices);
      totalPrice = totalPrice + itemPrice;
      overallTotalPrice = overallTotalPrice + totalPrice;
      console.log(overallTotalPrice);
    }
    $("#checkOutTotal").html("R " + overallTotalPrice + ".00");
  });
});
function loadCartItems() {
  if ($("#tblFooterSection")) {
    var userItems = getJsonCookie(CookieKey + getLoggedUser()).items;
    var totalPrice = 0;
    $("tr").not("#tblFooterSection, #tblHeaderSection").remove();
    for (let i = 0; i < userItems.length; i++) {
      var theImage = "<img src='" + userItems[i][0].imageLocation + "' />";
      var theName = "<span><p>" + userItems[i][0].name + "</p></span>";
      var theItemCount =
        "<div class='form-group col p-0 m-0'>" +
        "<div class='col-6 p-0 m-0'>" +
        "<input id='itemCount-for-" +
        userItems[i][0].id +
        "' data-original-price='" +
        userItems[i][0].price +
        "' data-itemCountValue='1' type='number' data-item-id='" +
        userItems[i][0].id +
        "' class='form-control' value='1' /></div></div>";
      var thePrice =
        "<strong id='price-for-" +
        userItems[i][0].id +
        "'>" +
        userItems[i][0].price +
        "</strong>";
      var theDelete =
        "<div class='form-group col p-0 m-0'>" +
        "<div class='col-6 p-0 m-0'>" +
        '<button id="dlt-btn-' +
        userItems[i][0].id +
        '" data-item-id="' +
        userItems[i][0].id +
        '" type="button" class="btn btn-danger">' +
        '<i class="fa-sharp fa-solid fa-trash"></i>' +
        "</button></div></div>";
      var trow = $("<tr>")
        .append("<td>" + theImage + theName + "</td>")
        .append("<td>" + theItemCount + "</td>")
        .append("<td>" + thePrice + "</td>")
        .append("<td>" + theDelete + "</td>");
      $("#tblFooterSection").before(trow);
      totalPrice += Number(userItems[i][0].price);
    }
    $("#checkOutTotal").html("R " + totalPrice + ".00");
  }
}
function updateButtons() {
  var userData = getJsonCookie(CookieKey + getLoggedUser()).items;
  $(".btn:contains('Add to cart')").each(function () {
    var btnId = $(this).attr("id");
    for (let i = 0; i < userData.length; i++) {
      if (btnId == userData[i][0].id) {
        $(this).addClass("disabled").html("added");
        $(this).off("click");
      }
    }
  });
}
function loadData() {
  setJsonCookie("Data", init_data);
}
function loadUsers() {
  setJsonCookie("Users", getUsers());
}
function loadCart() {
  var cartdata = getCartData();
  if (cartdata) {
    $("#cartCount").html(cartdata["items"].length);
  } else {
    return false;
  }
}
const msgDialog = $("<div>")
  .addClass("quick-item-container-g w-75")
  .html("Message goes here");
const tempOuter = $("<div>")
  .addClass("justify-content-center w-100 top-fade")
  .attr("id", "msg_dialog")
  .html(msgDialog)
  .hide();
$(".btn:contains('Add to cart')").on("click", function () {
  var itemId = $(this).attr("id");
  addToCart(itemId);
  $(this).addClass("disabled").html("added");
  $(this).off("click");
  console.log(this);
  var itemName = getItem(itemId)[0]["name"];
  $("#msg_dialog").hide();
  $("#msg_dialog > div")
    .html(itemName + " added to cart")
    .css("color", "black")
    .css("text-align", "center");
  $("#msg_dialog").show(500).css("display", "flex");
  $("#msg_dialog").hide(3000);
});
function getItem(id) {
  var data = getJsonCookie("Data");
  var returnItem = data.filter((item) => item.id == id);
  return returnItem;
}
$("#signInForm").on("submit", function (event) {
  event.preventDefault();
  var email = $("input[name='email']").val();
  var password = $("input[name='psw']").val();
  logIn(email, password);
  console.log(email + password);
});
$("#signOutBtn").on("click", function () {
  signOut();
});
$("#remove-all-btn").on("click", function () {
  console.log("event registered");
  clearCart();
  loadCartItems();
});
$("#signUpForm").on("submit", function (event) {
  event.preventDefault();
  var name = $("input[name='name']").val();
  var surname = $("input[name='surname']").val();
  var email = $("input[name='email']").val();
  var password = $("input[name='psw']").val();
  var currentUsers = getJsonCookie("Users");
  var newUserDetails = {
    userId: (currentUsers.length + 1).toString(),
    fname: name,
    lname: surname,
    email: email,
    password: password,
  };
  currentUsers.push(newUserDetails);
  setJsonCookie("Users", currentUsers);
  logIn(email, password);
});
