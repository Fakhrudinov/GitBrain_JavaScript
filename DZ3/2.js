let userBasket = {
    id:"basket123",
    owner:"SomeCustomerID",
    dateAndTime:"2021-08-08 20:20:20",
    productList:[],
    isPaid:false,
    paidDateAndTime:"",
};

console.log("Print user basket");
for (let key in userBasket) {
    console.log("\t" + key + ": " + userBasket[key]);
  }

//добавляем товары в корзину
userBasket.productList.push({
    id: 123,
    title: 'Product1',
    price: 234
});

userBasket.productList.push({
    id: 123123312,
    title: 'Product2',
    price: 123.22
});

userBasket.productList.push({
    id: 23452342,
    title: 'Product3',
    price: 12
});

//выводим продукты и цены
console.log("\nPrint produсts in basket");
userBasket.productList.forEach(element => {
    console.log("\t" + element.title + " id:" + element.id +" with price " + element.price);
});

//выводим сумму 
let basketValue = countBasketPrice(userBasket);
console.log( "\nTotal summ = " + basketValue);

function countBasketPrice(userBasket){
    let result = 0;

    userBasket.productList.forEach(element => {
        result = result + element.price;
    });

    return result;
}
