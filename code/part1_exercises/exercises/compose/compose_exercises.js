var _ = require('lodash/fp');
var accounting = require('accounting');

var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
  ];

var isLastInStock = _.compose(_.prop('in_stock'), _.last);
var nameOfFirstCar = _.compose(_.prop('name'), _.head);

var _average = function(xs) { return _.reduce(_.add, 0, xs) / xs.length; };
var averageDollarValue = _.compose(_average, _.map(_.prop('dollar_value')))

var _underscore = _.replace('_', /\W+/g);
var sanitizeNames = _.map(_.compose(_underscore, _.toLower, _.prop('name')));

var getDollar = _.prop('dollar_value');
var getStock = _.prop('in_stock');
var getHorsePower = _.prop('horsepower');
var formatMoney = accounting.formatMoney;
var filterMoney = _.compose(formatMoney, getDollar);
var separateWithComma = _.join(', ')
var availablePrices = _.compose(separateWithComma, _.map(filterMoney), _.filter(getStock));

var fastestCar = _.compose(
  _.join('') ,
  _.reverse,
  _.concat('is the fastest'),
  _.concat(' '),
  _.prop('name'),
  _.last,
  _.sortBy(_.prop('horsepower'))
);

module.exports = { CARS: CARS,
                   isLastInStock: isLastInStock,
                   nameOfFirstCar: nameOfFirstCar,
                   fastestCar: fastestCar,
                   averageDollarValue: averageDollarValue,
                   availablePrices: availablePrices,
                   sanitizeNames: sanitizeNames
                 };
