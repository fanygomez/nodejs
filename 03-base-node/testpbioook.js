"user strict";
const utils = require("../lib/utils");
const Booking = require("../models/Booking");
const PaymentService = require("../services/payment");
const PartnerCompanies = require("../models/PartnerCompanies/index");
const Employee = require("../models/Employee");
const Inquilino = require("../models/Inquilino/inquilino");
const inquilino = require("../models/Inquilino/inquilino");
/// company = await Company.find({ _id: companyId }).select({ email: 1 })
// var employee = PartnerCompanies.find({employees: "6230bcd716f11f29cbddb98f"});
// console.clear();
var newBooking = new Booking();
let discountCode = "70McIn";

const getDiscount = async (discountCode = "70McIn") => {
  //let discountCode = '70McIn';
  //var employee  = Employee.find({ code: discountCode });
  let employeeId;
  let employeeCode;
  let isTenant;
  let tenant;
  let companyDiscount;
  var newBooking = new Booking();

  try {
    let employee = await Employee.find({ code: discountCode }).select({
      code: 1,
      _id: 1,
    });
    console.log("employee -> query");
    console.log(employee);
    if (employee.length > 0) {
      console.log("Result");
      companyDiscount; // = PartnerCompanies.find({employees:{ '62267c1c8979581c1b01b2ac' }},{codeDiscount:1});
      console.log(companyDiscount);

      if (companyDiscount > 0) {
      }
    } else {
      tenant = Inquilino.find({ code: discountCode }).select({
        hoursPerMonth: 1,
        duration: 1,
      });
      if (tenant.length > 0) {
        let hoursPerMonth = tenant.hoursPerMonth;
        let reservedTime = body.duration;
        if (hoursPerMonth >= reservedTime) {
          reservedTime = hoursPerMonth - reservedTime;
          body.duration = reservedTime;
        } else {
          throw "El tiempo de reserva se ha agotado";
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
getDiscount("70McIn")
  .then((t) => console.log(t))
  .catch((err) => console.log(err));

module.exports = {
  newBooking,
};

class BookingServiceTest {
  constructor() {}

  create(body) {
    let createNotify;
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.createOne(body);
        console.log(data);
      } catch (err) {
        reject({
          msg: "Algo salio mal",
          error: err.message,
          status: false,
        });
      }
    });
  }

  async createOne(body) {
    let wompiFare;
    let spazerFare;
    let userDB;
    let company;
    let pagoAnticipado, pagoTransaccion;
    let timeDate;

    try {
      const {
        branchOffice,
        date,
        type,
        startTime,
        status,
        isActive,
        user,
        endTime,
        services,
        ifNoUser,
        isPagaLink,
        discountCode,
      } = body;
      const { cardNumber, cvv, cardMonth, cardYear, companyId } = body;

      var bookingData = {
        branchOffice,
        slot: body.slot,
        startTime,
        status: status || "Pendiente",
        endTime: endTime,
        date,
        user,
        isActive,
        type,
        services,
        ifNoUser,
        code: pwdBooking,
        pagaLink: isPagaLink ? true : false,
        discountCode,
      };

      if (user) {
        userDB = await User.findOne({ _id: user });
        bookingData.user = userDB._id;
      }
    } catch (error) {
      if (error) throw error;
    }
  }
}
///

//request

let body = {
  branchOffice: "61327cc2f1bacfde8f37fb42",
  slot: "61327dbbf1bacf4f0f37fb48",
  type: 2,
  user: "6139201b2f28af182f98b5c5",
  startTime: "08:00",
  endTime: "09:00",
  date: "2021-9-6",
  services: ["61327d9ef1bacfda9837fb46"],
  duration: "1:00",
  cardNumber: "4242424242424242",
  cvv: "424",
  cardMonth: "12",
  cardYear: "2023",
  companyId: "6139201b2f28af107b98b5c6",
  pagaLink: "",
  discountCode: "70McIn",
};

const createOne = async (body) => {
  let wompiFare;
  let spazerFare;
  let userDB;
  let company;
  let pagoAnticipado, pagoTransaccion;
  let timeDate;

  try {
    const {
      branchOffice,
      date,
      type,
      startTime,
      status,
      isActive,
      user,
      endTime,
      services,
      ifNoUser,
      isPagaLink,
      discountCode,
    } = body;
    const { cardNumber, cvv, cardMonth, cardYear, companyId } = body;

    var bookingData = {
      branchOffice,
      slot: body.slot,
      startTime,
      status: status || "Pendiente",
      endTime: endTime,
      date,
      user,
      isActive,
      type,
      services,
      ifNoUser,
      code: "pwdBooking",
      pagaLink: isPagaLink ? true : false,
      discountCode,
    };

    console.log("entro");
    let compani = PartnerCompanie.employees.find('62267c1c8979581c1b01b2ac');
    //
    let employee = await Employee.find({ code: "70McIn" }).select({
      code: 1,
      _id: 1,
    });
    console.log("Si");
    console.log("employee -> query");
    console.log(employee);
    if (employee.length > 0) {
      console.log("Result");
      companyDiscount; // = PartnerCompanies.find({employees:{ '62267c1c8979581c1b01b2ac' }},{codeDiscount:1});
      console.log(companyDiscount);

      if (companyDiscount > 0) {
      }
    } else 
    {
      tenant = await Inquilino.find({ code: discountCode });
      // .select({
      //   hoursPerMonth: 1,
      //   duration: 1,
      //   _id: 1
      // });
      if (tenant.length > 0) {
        var updateTenant = new Inquilino(tenant);
        let hoursPerMonth = tenant.hoursPerMonth;
        let reservedTime = bookingData.duration;

        if (hoursPerMonth >= reservedTime) {
          reservedTime = hoursPerMonth - reservedTime;
          let hourSpent = tenant.hourSpent + reservedTime;
          //updateTenant.hourSpent = updateTenant.hourSpent + reservedTime;

          //const tenant2 = await updateTenant.update();
          const updateTenant = await Inquilino.findByIdAndUpdate(
            { _id: tenant._id },
            { $set: { hourSpent } }
          );
        } else {
          throw "No hay tiempo (Hrs) suficiente para crear la reserva";
        }
      }
    }

    //
  } catch (error) {
    if (error) throw error;
  }
};

createOne(body)
  .then((msg) => {
    console.log("TODO BIEN!");
    console.log(msg);
  })
  .catch((err) => {
    console.log("Too bad");
    console.log(err);
  });

module.exports = new BookingServiceTest();
