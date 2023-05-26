let label = document.getElementById("label");

let ShoppingCart = document.querySelector(".cart-product-list");
let cartEmpty = document.getElementById("cart-empty");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let cartControl = document.querySelector(".cartProduct-control");
let calculation = () => {
    let cartIcon = document.getElementById("cart-quantity");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        cartEmpty.style.display = "none";
        cartControl.style.display = "flex";
        ShoppingCart.innerHTML = basket
            .map(function (x) {
                let { id, item } = x; // destructor
                let search =
                    listToy.find(function (y) {
                        // match id of data with id of id destructor
                        return y.id === id;
                    }) || [];
                let { img, name, price, desc } = search;
                return `
                
                
                    <li class="cart-product-item" id= "${id}">
                        <img src="${img}" alt="" />
                        <div class="cart-product-item-info">
                            <h4>${name} <span>$ ${price}</span></h4>
                            <div
                                class="cart-product-item-info-quantity"
                            >
                                <i onclick="decrement(${id})"  class="fa-solid fa-minus"></i>
                                <span>${item}</span>
                                <i onclick="increment(${id})"  class="fa-solid fa-plus"></i>
                            </div>
                            <p>
                               ${desc}
                            </p>

                            <p id="total-cart-product-item">
                                Total : ${price * item} $
                            </p>
                        </div>

                        <button class="btn-clear" onclick="removeItem(${id})">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </li>
                
            `;
            })
            .join("");
    } else {
        // xet th khong co gi trong basket
        cartEmpty.style.display = "block";
        cartControl.style.display = "none";
    }
};
generateCartItems();
let increment = function (id) {
    let selectedItem = id;

    let search = basket.find(function (x) {
        return x.id === selectedItem.id;
    });

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    // *todo de du lieu vao localStorage
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
    totalProduct();
    calculation();
};
let decrement = function (id) {
    let selectedItem = id;
    let search = basket.find(function (x) {
        return x.id === selectedItem.id;
    });

    // Neu ma k co du lieu ma khogn co dong nay se sinh ra loi
    if (search === undefined) return;
    // Ngan khong cho no = 0
    else if (search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }

    // *todo neu du lieu bang 0 thi se khong cho luu vao localStorage
    basket = basket.filter(function (x) {
        return x.item !== 0;
    });
    calculation();
    generateCartItems(); //*todo do khong con trong localStorage nen no se xoa di
    localStorage.setItem("data", JSON.stringify(basket));
    totalProduct();
};

let totalProduct = function () {
    let totalMoney = document.querySelector("#total-money");
    totalMoney.innerHTML = basket
        .map(function (x) {
            let { item, id } = x;
            let search = listToy.find(function (y) {
                return y.id === id;
            });
            return item * search.price;
        })
        .reduce(function (x, y) {
            return x + y;
        }, 0);
};
totalProduct();

let removeItem = function (id) {
    let selectedItem = id;
    basket = basket.filter(function (x) {
        return x.id !== selectedItem.id;
    });
    generateCartItems();
    calculation();
    totalProduct();
    localStorage.setItem("data", JSON.stringify(basket));
};

let removeAll = function () {
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};
