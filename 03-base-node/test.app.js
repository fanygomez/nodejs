let employeDiscount = 0;
let price = 15;
let discount = 15;
let totalPrice = 0;
employeDiscount = ( (price * discount) / 100).toFixed(2);
totalPrice = price - employeDiscount;
console.log(totalPrice);