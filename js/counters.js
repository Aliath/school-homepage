var updateTicks = (function() {
  'use strict';

  var atestDate = ['04-05-2018 09:00', 'DD-MM-YYYY HH:mm'];
  var schoolEndDate = ['23-06-2018 11:00', 'DD-MM-YYYY HH:mm'];
  var aschoolEndDate = ['28-04-2018 09:00', 'DD-MM-YYYY HH:mm'];

  var dateElement = document.getElementById('date');
  var breakCounterElement = document.getElementById('break-counter');
  var atestCounterElement = document.getElementById('atest-counter');
  var schoolCounterElement = document.getElementById('school-counter');
  var aSchoolCounterElement = document.getElementById('aschool-counter');


  function getTimeToBreak() {
    var breaks = ['08:00', '08:45', '08:50', '09:35', '09:40', '10:25', '10:35', '11:20', '11:40', '12:25', '12:45', '13:30', '13:35', '14:20', '14:25', '15:10', '15:15', '16:00'];
    var breaksAsDayUnix = breaks.map(function(breakTime) {
      var timeUnix = breakTime.substr(0, 2) * 3600 + breakTime.substr(3) * 60;
      var realDifference = 20;

      return timeUnix + realDifference;
    });

    var currentTime = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();
    var today = new Date();
    today -= today % 86400E3 + 1 * 3600E3;

    if (currentTime > Math.max.apply(null, breaksAsDayUnix)) {
      return moment('08:00', 'HH:mm').add(1, 'day').fromNow();
    }

    var currentBreak = breaksAsDayUnix.filter(function (e) {
      return e >= currentTime;
    }).sort(function (a, b) {
      return Math.abs(a - currentTime) > Math.abs(b - currentTime) ? 1 : -1;
    })[0];

    return moment(today + currentBreak * 1000).fromNow();
  }

  return function() {
    breakCounterElement.textContent = getTimeToBreak();

    dateElement.textContent = moment().format('dddd, LL');
    atestCounterElement.textContent = moment.apply(moment, atestDate).fromNow();
    schoolCounterElement.textContent = moment.apply(moment, schoolEndDate).fromNow();
    aSchoolCounterElement.textContent = moment.apply(moment, aschoolEndDate).fromNow();
  };
})();
