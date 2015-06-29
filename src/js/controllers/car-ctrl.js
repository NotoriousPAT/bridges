'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var c3 = require('c3');

router.route('cars/:id', function (carId) {
  $.ajax({
    url: '../data/cars.data',
    method: 'GET'
  })
  .then(parseCarsCsv)
  .then(renderEachCar);

  function parseCarsCsv(carsData) {
    return carsData

      .split('\n')
      .map(function (record) {
        var cells = record.split(',');


        return {

id:[],
              normalizedLosses:cells[1],
              make:cells[2],
              fuelType:cells[3],
              aspiration: cells [4],
              numDoors: cells[5],
              bodyStyle: cells[6],
              driveWheels:  cells[7],
              engineLocation: cells [8],
              length: cells[10],
              width:  cells[11],
              height: cells[12],
              curbWeight:  cells[13],
              numCylinders: cells [16],
              horsepower:  cells[21],
              peakRpm: cells[22],
              cityMpg:      cells[23],
              highwayMpg:   cells[24],
              price:   cells[25]
        };
      });
  }





  function renderEachCar(carsData) {
    var car = _.findWhere(carsData, parseInt(carId));
   var carTemplate = views['car-template'];
   var templateFn = _.template(carTemplate, { variable: 'm' });
   var carHTML = templateFn({car: car});

   $('.main-content').html(carHTML);
conosle.log(carsData);
   renderChart(car, carsData);
  }

  function renderChart(car, carsData) {

    var details=carsData;
    // var under = carsData.filter(function (b) {
    //
    //   return b.price < 10000;
    // }).length;

    // var same = carsData.filter(function (b) {
    //   return b.price === car.price;
    //   // && < 20000;
    // }).length;

    // var over = carsData.filter(function (b) {
    //   return b.price > 20000;
    //  }).length;

    // for (var i = 0; i < carsArray.length; i++) {

    //   if (carsArray.price < "10000") {
    //     var under = carsArray[i];
    //   }
    //   else if(carsArray.price > 10000 && price < 20000 ) {
    //     var average = carsArray[i];
    //   }
    //   else{
    //     var over = carsArray[i];
    //   }
    // }

    c3.generate({
      bindto: '.car-chart',
      data: {
        columns: [
          [];
          []
        ],
        type : 'pie'
      },
      color: {
        pattern: ['#3FBEBB', '#FF5843', '#39B54A']
      }
    });
  }

});
