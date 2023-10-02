const data = [
    {
        name: "Banan",
        img: "./img/banana.jfif",
        cena: 6.99,
        catagory: "Zolty",
    },

    {
        name: "jJblko czerwone",
        img: "./img/jablkoczerwone.jfif",
        cena: 3.99,
        catagory: "Czerwony",
    },

    {
        name: "Jablko zielone",
        img: "./img/jablkozielone.jfif",
        cena: 3.99,
        catagory: "Zielony",
    },
    {
        name: "Kiwi",
        img: "./img/kiwi.jfif",
        cena: 9.89,
        catagory: "Zielony",
    },
    {
        name: "Melon",
        img: "./img/melon.jfif",
        cena: 7.45,
        catagory: "Zolty",
    },

    {
        name: "Pomidor czerwony",
        img: "./img/pomidorczerwony.jfif",
        cena: 7.55,
        catagory: "Czerwony",
    },

    {
        name: "Pomidor zolty",
        img: "./img/pomidorzolty.jfif",
        cena: 12.55,
        catagory: "Zolty",
    },
    {
        name: "Truskawka",
        img: "./img/truskawka.jfif",
        cena: 15.99,
        catagory: "Czerwony",
    },
    {
        name: "Ogorek",
        img: "./img/ogorek.jfif",
        cena: 6.79,
        catagory: "Zielony",
    },
];

const productsContainer = document.querySelector(".products");
const categoryList = document.querySelector(".category-list");

function displayProducts(products) {
    if (products.length > 0) {
        const product_details = products
            .map(
                (product) => `
  <div class="product">
  <div class="img">
    <img src="${product.img}" alt="${product.name}" />
  </div>
  <div class="product-details">
    <span class="name">${product.name}</span>
    <span class="cena">${product.cena}zl.</span>
     </div>
</div>`
            )
            .join("");

        productsContainer.innerHTML = product_details;
    } else {
        productsContainer.innerHTML = "<h3>No Products Available</h3>";
    }
}

function setCategories() {
    const allCategories = data.map((product) => product.catagory);
    //console.log(allCategories);
    const catagories = [
        "All",
        ...allCategories.filter((product, index) => {
            return allCategories.indexOf(product) === index;
        }),
    ];
    //console.log(catagories);
    categoryList.innerHTML = catagories.map((catagory) => `<li>${catagory}</li>`).join("");

    categoryList.addEventListener("click", (e) => {
        const selectedCatagory = e.target.textContent;
        selectedCatagory === "All" ? displayProducts(data) : displayProducts(data.filter((product) => product.catagory == selectedCatagory));
    });
}
const priceRange = document.querySelector("#priceRange");
const priceValue = document.querySelector(".priceValue");

function setPrices() {
    const priceList = data.map((product) => product.cena);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceValue.textContent = maxPrice + "zl.";

    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = e.target.value + "zl.";
        displayProducts(data.filter((product) => product.cena <= e.target.value));
    });
}

const txtSearch = document.querySelector("#txtSearch");
txtSearch.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase().trim();
    if (value) {
        displayProducts(data.filter((product) => product.name.toLowerCase().indexOf(value) !== -1));
    } else {
        displayProducts(data);
    }
});

displayProducts(data);
setCategories();
setPrices();