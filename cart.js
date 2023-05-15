var dataCart = [];
showLoading();
fetchRequest(`${URL}/carts`, "get")
  .then(function (res) {
    dataCart = res;
    console.log(dataCart);
    renderCart();
  })
  .finally(function () {
    hideLoading();
  });

function renderCart() {
  var cartBody = $("cart-body");

  var cartBodyHtml = dataCart.map(function (item, index) {
    const { title, number, price } = item;
    return `
        <tr>
          <td>${title}</td>
          <td><button class='minus' data-index=${index}>-</button>
          <button>${number}</button>
          <button class='plus' data-index=${index}>+</button></td>
          <td>${price}$</td>
          <td>${number * price}$</td>
          <td><button data-index=${index} class='delete'>X</button></td>
        </tr>
    `;
  });
  cartBody.innerHTML = cartBodyHtml.join("");

  const minusButton = document.querySelectorAll(".minus");
  minusButton.forEach((button) => {
    button.onclick = handleMinusButton;
  });

  const plusButton = document.querySelectorAll(".plus");
  plusButton.forEach((button) => {
    button.onclick = handlePlusButton;
  });

  const deleteButton = document.querySelectorAll(".delete");
  deleteButton.forEach((button) => {
    button.onclick = handleDeleteButton;
  });
}

const handleDeleteButton = (e) => {
  e.preventDefault();

  const index = e.target.getAttribute("data-index");
  const cart = { ...dataCart[index] };

  fetchRequest(`${URL}/carts/${cart.id}`, "delete").then(() => {
    fetchRequest(`${URL}/carts`, "get").then(function (res) {
      dataCart = res;
      renderCart();
    });
  });
};

const handlePlusButton = (e) => {
  const index = e.target.getAttribute("data-index");
  const cart = { ...dataCart[index] };

  fetchRequest(`${URL}/carts/${cart.id}`, "patch", {
    number: cart.number + 1,
  }).then(() => {
    // fetchRequest(`${URL}/carts`, "get").then(function (res) {
    //   dataCart = res;
    //   renderCart();
    // });
  });
};

const handleMinusButton = (e) => {
  e.preventDefault();

  const index = e.target.getAttribute("data-index");
  const cart = { ...dataCart[index] };

  if (cart.number === 1) {
    fetchRequest(`${URL}/carts/${cart.id}`, "delete").then(() => {
      fetchRequest(`${URL}/carts`, "get").then(function (res) {
        dataCart = res;
        renderCart();
      });
    });
  } else {
    fetchRequest(`${URL}/carts/${cart.id}`, "patch", {
      number: cart.number - 1,
    }).then(() => {
      fetchRequest(`${URL}/carts`, "get").then(function (res) {
        dataCart = res;
        renderCart();
      });
    });
  }
};
