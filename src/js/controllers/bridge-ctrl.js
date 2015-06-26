'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var c3 = require('c3');

router.route('cars/:id', function (carId) {
  $.ajax({
    url: 'data/cars.data',
    method: 'GET'
  })
  .then(parseCarsCsv)
  .then(renderCar);

  function parseCarsCsv(carsCsv) {
    return carsCsv
      .split('\n')
      .map(function (record) {
        var cells = record.split(',');

        return {
          id: cells[0],
          erected: cells[3],
          lanes: cells[6],
          material: cells[9],
          type: cells[12]
        };
      });
  }

  function renderCar(carsArray) {
    var car = _.findWhere(carsArray, { id: carId });
    var carTemplate = views['car-template'];
    var templateFn = _.template(carTemplate, { variable: 'm' });
    var carHTML = templateFn(car);

    $('.main-content').html(carHTML);

    renderChart(car, carsArray);
  }

  function renderChart(car, carsArray) {
    var older = carsArray.filter(function (b) {
      return b.erected < car.erected;
    }).length;

    var newer = carsArray.filter(function (b) {
      return b.erected > car.erected;
    }).length;

    c3.generate({
      bindto: '.car-chart',
      data: {
        columns: [
          ['Older', older],
          ['Newer', newer],
          ['Same', carsArray.length - newer - older]
        ],
        type : 'pie'
      },
      color: {
        pattern: ['#3FBEBB', '#FF5843', '#39B54A']
      }
    });
  }
});
