function AddToCart(itemId, image, name, price, quantity = 1) {
  let newProduct = {
    id: itemId,
    name: name,
    image: image,
    price: price,
    quantity: quantity,
    total: Number(price) * Number(quantity),
  };

  let products = JSON.parse(localStorage.getItem("products"));
  if (!products || typeof products === "undefined") {
    products = [];
    products.push(newProduct);
  } else {
    let isSame = false;
    products = products.map((product) => {
      if (product.id == itemId) {
        product.quantity++;
        product.total = Number(product.price) * Number(product.quantity);
        isSame = true;
      }
      return product;
    });
    if (!isSame) products.push(newProduct);
  }
  ChangeBadgeCart(products.length);
  //re-set again local storage
  localStorage.setItem("products", JSON.stringify(products));
}
