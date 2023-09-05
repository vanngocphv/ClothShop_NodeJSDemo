const currentProducts = JSON.parse(localStorage.getItem("products"));
ChangeBadgeCart(currentProducts.length);

function ChangeBadgeCart(count) {
  const cartBadge = document.querySelector(".badge");
  if (count > 0) {
    cartBadge.innerHTML = count;
  }
}

function ClearBadgeCartCount() {
  const cartBadge = document.querySelector(".badge");
  cartBadge.innerHTML = "";
}
