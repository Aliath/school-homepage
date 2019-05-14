var updateClock = (function() {
  'use strict';

  var secondsInDay = 86400;
  var secondsInHour = 3600;
  var secondsInMinute = 60;

  var defaultTransform = 'translate(-50%, -50%)';

  var hourElement = document.getElementById('clock-hour');
  var minuteElement = document.getElementById('clock-minute');
  var secondElement = document.getElementById('clock-second');


  return function() {
    var currentTime = new Date();
    var elapsedTime = currentTime.getHours() * secondsInHour;
        elapsedTime += currentTime.getMinutes() * secondsInMinute;
        elapsedTime +=  currentTime.getSeconds();

    var rotateHour = (elapsedTime / secondsInDay) * 720; // 2 full rotates per day
    var rotateMinute = (elapsedTime / secondsInHour) * 360;
    var rotateSecond = (elapsedTime / secondsInMinute) * 360;

    hourElement.style.transform = defaultTransform + ' rotate(' + rotateHour + 'deg)';
    minuteElement.style.transform = defaultTransform + ' rotate(' + rotateMinute + 'deg)';
    secondElement.style.transform = defaultTransform + ' rotate(' + rotateSecond + 'deg)';
  }
})();
