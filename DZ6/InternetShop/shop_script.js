const shopCatalogInHTML= document.querySelector(".shopwindow");
const productCountInBasket= document.querySelector(".products-counter");
    productCountInBasket.style.display = "none";
const totalBasketMoneySumm= document.querySelector(".basket-summ");
const listProductsInBasket= document.querySelector(".products-in-basket");

function Product(id, article, productName, price, quantity) {
    this.id = id;
    this.article = article;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
};

const userBasket = {
    id:"SomeBasketID",
    owner:"SomeCustomerID",
    productList:[],
    productCount:0,
    moneySumm:0,
    isPaid:false,
    paidDateAndTime:"",

    recalculateBasket: function() {
        let totalSumm = 0;
        let totalQuantity = 0;
        this.productList.forEach(element => {
            totalSumm = totalSumm + (element.price * element.quantity);
            totalQuantity = totalQuantity + element.quantity;
        });

        this.moneySumm = totalSumm;

        this.productCount = totalQuantity;
    }
};

const productsFromDataBase = {
    products: [
        new Product(id = 1, article="pouch", productName = "Корм влажный пакетик тип 1", price = 100, quantity=1),
        new Product(id = 2, article="pouch2", productName = "Корм влажный пакетик тип 2", price = 110, quantity=1),
        new Product(id = 3, article="pouch26", productName = "Корм влажный упаковка пакетиков 26 штук", price = 2400, quantity=1),
        new Product(id = 4, article="kilo", productName = "Корм сухой пакет 1 килограмм", price = 900, quantity=1),
        new Product(id = 5, article="400g", productName = "Корм сухой пакет 400 грамм ", price = 350, quantity=1),
        new Product(id = 6, article="5kilo", productName = "Корм сухой пакет 5 килограмм", price = 4500, quantity=1),
        new Product(id = 7, article="3kilo", productName = "Корм сухой пакет 3 килограмма", price = 2100, quantity=1),
        new Product(id = 8, article="10kilo", productName = "Корм сухой пакет 10 килограмм", price = 8800, quantity=1),
    ]
}

function printProductsToHTML() {
    for (let product of productsFromDataBase.products) {
        const newProductCard = document.createElement("div");
        newProductCard.classList.add("product-card");
        const newProductCardImg = document.createElement("img");
        newProductCardImg.src = "./images/" + product.article + ".jpg";
        newProductCard.appendChild(newProductCardImg);

        const newProductCardText = document.createElement("div");
        textInnerHTML = "<strong>" + product.productName + "</strong><br />"
        + product.price + " руб. <br />";

        newProductCardText.innerHTML = textInnerHTML;
        newProductCard.appendChild(newProductCardText);

        const newProductCardByuButton = document.createElement("input");
        newProductCardByuButton.value = "Купить";
        newProductCardByuButton.setAttribute("type", "button");
        newProductCardByuButton.classList.add("id" + product.id);
        newProductCardByuButton.addEventListener("click", function(){addProductToBasket(product)}, false);
        newProductCard.appendChild(newProductCardByuButton);
        
        shopCatalogInHTML.appendChild(newProductCard);
    }    
}

function addProductToBasket(product){
    let alreadyExist = false;
    userBasket.productList.forEach(element => {
        if(element.id == product.id){
            alreadyExist = true;
            element.quantity += 1;
            return ;
        }            
    });

    if(!alreadyExist){
        userBasket.productList.push(product);
    }

    renewBasket();
}

function deleteProductFromBasket(productId){    
    console.log(userBasket.productList);

    const indexToDelete = userBasket.productList.findIndex(element => element.id === productId);
    console.log("delete ", indexToDelete);

    userBasket.productList.splice(indexToDelete, 1);

    renewBasket();
}

function renewBasket(){
    userBasket.recalculateBasket();
    printBasketTotalDataToHTML();
    printItemsInBasketToHTML();
}

function printBasketTotalDataToHTML(){
    if (userBasket.productCount > 0){
        totalBasketMoneySumm.innerHTML = "Всего товаров " + userBasket.productCount + "<br />на сумму " + userBasket.moneySumm + " руб.";
        productCountInBasket.innerHTML = userBasket.productCount;
        
        productCountInBasket.style.display = "block";
    }
    else{
        productCountInBasket.style.display = "none";
        totalBasketMoneySumm.innerHTML = "";
    }
}

function printItemsInBasketToHTML(){
    listProductsInBasket.innerHTML = "";

    for (let product of userBasket.productList) {
        const allProductInbasket = document.createElement("div");
        const productInbasket = document.createElement("div");
        
        productInbasket.innerHTML = "&#9656; " + product.productName + " (" + product.quantity + " шт.) " 
        + (product.quantity * product.price)+ " руб.";

        const buttonDelete = document.createElement("input");
        buttonDelete.value = "delete";
        buttonDelete.setAttribute("type", "button");
        buttonDelete.classList.add("delete-" + product.id);
        buttonDelete.addEventListener("click", function(){deleteProductFromBasket(product.id)}, false);
        
        allProductInbasket.appendChild(buttonDelete);
        allProductInbasket.appendChild(productInbasket);        

        listProductsInBasket.appendChild(allProductInbasket);
    }
}

printProductsToHTML();
