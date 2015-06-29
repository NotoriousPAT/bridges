'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('', 'cars', function () {
  $.ajax({
    url: '../data/cars.data',
    method: 'GET'
  })

  .then(parseCarsCsv)
  .then(renderCars);

  function parseCarsCsv(carsCsv) {
    return carsCsv
      .split('\n')
      .map(function (record, i) {
        var cells = record.split(',');

        return {
          id:i,
          normalizedLosses: cells[1],
          make: cells[2],
          fuelType: cells[3],
          aspiration: cells[4],
          numDoors: cells[5],
          bodyStyle: cells[6],
          driveWheels: cells[7],
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

  function renderCars(carsArray) {
    var carsTemplate = views['cars-template'];
    var templateFn = _.template(carsTemplate, { variable: 'm' });
    var carsHTML = templateFn({ cars: carsArray });
    $('.main-content').html(carsHTML);
  }

});
