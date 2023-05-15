const faker = require("faker");
const fs = require("fs");

faker.locale = "vi";

const getCategories = (n) => {
  if (n <= 0) return [];
  let result = [];
  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createAt: Date.now(),
      image: faker.image.image(),
    };
    result.push(category);
  });
  return result;
};
const getProductList = (categoryList, numberOfProduct) => {
  if (numberOfProduct <= 0) return [];
  let result = [];
  for (let category of categoryList) {
    Array.from(new Array(numberOfProduct)).forEach(() => {
      let product = {
        id: category.id,
        name: faker.commerce.productName(),
        price: Number.parseFloat(faker.commerce.price()),
        img: faker.image.image(),
        createdAt: Date.now(),
      };
      result.push(product);
    });
  }

  return result;
};
(() => {
  const categories = getCategories(5);
  const productsList = getProductList(categories, 12);

  const db = {
    categories: categories,
    products: productsList,
  };

  fs.writeFile("db.json", JSON.stringify(db), () => {
    console.log("generater data succes!");
  });
})();

// function paginatePage() {
//   let size_page = document.getElementsByClassName("page");
//   for (let i = 0; i < size_page.length; i++) {
//     size_page[i].addEventListener("click", myFunction);
//   }
//   function myFunction() {
//     let x = this.innerHTML;
//     fetchRequest(`${URL}/products`, "get")
//       .then(function (data) {
//       showLoading();
//       let limiteValue = Math.round(data.length / 4);

//       fetchRequest(`${URL}/products?_page=${x}&_limit=${limiteValue}`, "get")
//         .then(function (data) {
//           // document.getElementById("sort").addEventListener("change", sortPrice(x));
//           console.log(data.pagination._page);
//           renderProduct(data.data);
//         })
//         .finally(function () {
//           hideLoading();
//         });
//     });
//   }
// }
