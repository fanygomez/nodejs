// let hourSpent = 15, duration = 5.50, hoursPerMonth =20, pricePerHour = 2;
// hourSpent = hourSpent + duration;
// const hoursToCharge = hoursPerMonth - hourSpent;
// let  totalPayablePerSpace;
// if (hourSpent <= hoursPerMonth) {
//     console.log(hourSpent);
// }else{
//     console.log("Distinto");
//     console.log(hoursToCharge * -1);
//     totalPayablePerSpace = pricePerHour * ( hoursToCharge * -1);
//     console.log("total a pagar");
//     console.log(totalPayablePerSpace);
// }
let duration = "00:30";
let remainder = duration % 1 //Obtiene los decimales

let decimal = remainder * 100 * 60 * 1000 // convierte a ms

let integer = (duration - remainder) * 60 * 60 * 1000 // horas a ms

console.log(decimal + integer);

const toHour = `${duration.getUTCHours()}:${duration.getUTCMinutes()}`
    const replaceHour = toHour.replace(':', '.')
    console.log(Number(replaceHour));