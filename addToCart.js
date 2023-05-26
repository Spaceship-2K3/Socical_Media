const listProduct = document.querySelector(".product-list");
const categoryItem = document.querySelector(".category-item.active");
let cartQuantity = document.getElementById("cart-quantity");
let basket = JSON.parse(localStorage.getItem("data")) || [];

// ! generateShop
let generateShop = function () {
    return (listProduct.innerHTML = listToy
        .map(function (x) {
            //destructor
            let { id, name, price, img, desc } = x;
            // *todo tim kiem de cap nhat moi thu cung luc
            let search =
                basket.find(function (x) {
                    return x.id === id;
                }) || [];

            return `
        <li class="product-item" id ='${id}' >
            <img src="${img}" alt="" />
            <div class="product-info">
                <div class="product-info-head">
                    <h4>${name}</h4>
                </div>
                <p>
                ${desc}
                </p>
                <div class="product-item-control">
                    <p class="price">${price}$</p>
                    <div class="product-quantity">
                        <i class="fa-solid fa-minus" onclick='decrement(${id})'></i>
                        <span class="quantity">${
                            search.item === undefined ? 0 : search.item
                        }</span>
                        <i class="fa-solid fa-plus" onclick='increment(${id})'></i>
                    </div>
                </div>
            </div>
        </li>`;
        })
        .join(""));
};
generateShop();

// todo :increment
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
    localStorage.setItem("data", JSON.stringify(basket));
    generateShop();
    totalQuantity();
};

// todo :decrement
let decrement = function (id) {
    let selectedItem = id;
    let search = basket.find(function (x) {
        return x.id === selectedItem.id;
    });
    if (search === undefined) return;
    else if (search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }
    basket = basket.filter(function (x) {
        return x.item !== 0;
    });
    generateShop();
    localStorage.setItem("data", JSON.stringify(basket));
    totalQuantity();
};

// todo : totalQuantity
let totalQuantity = function () {
    if (basket.length !== 0) {
        cartQuantity.innerHTML = basket
            .map(function (x) {
                return x.item;
            })
            .reduce(function (total, item) {
                return total + item;
            });
    } else {
        cartQuantity.innerHTML = 0;
    }
};

totalQuantity();
