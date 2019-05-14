var updateDailyContent = (function() {
  'use strict';

  var lastDate = -1;
  var formulaElement = document.getElementById('formula');
  var plWordElement = document.getElementById('word-pl');
  var enWordElement = document.getElementById('word-en');
  var deWordElement = document.getElementById('word-de');

  function isWeekend() {
    var currentTime = new Date();
    var currentDay = currentTime.getDay();
    var currentHour = currentTime.getHours();
    var currentDate = currentTime.getDate();
    var isWeekend = [6, 0].indexOf(currentDay) > -1 || (currentDay === 5 && currentHour >= 16);

    return isWeekend;
  }

  function updateLuckyNumbers() {
    var currentDay = new Date().getDay();
    var numberElements = [].slice.call(document.querySelectorAll('.lucky-number__wrapper'));

    numberElements.forEach(function(element) {
      element.classList.remove('lucky-number__wrapper--current');
    });

    numberElements[currentDay - 1].classList.add('lucky-number__wrapper--current');
  }


  return function() {
    var currentDate = new Date().getDate();

    // prevent if funciton already has been called
    if (lastDate === currentDate) return;
    if (isWeekend()) return;
    lastDate = currentDate;


    formulaElement.innerHTML = randomFormula();

    var randomedWord = randomWord();
    plWordElement.textContent = randomedWord[0];
    enWordElement.textContent = randomedWord[1];
    deWordElement.textContent = randomedWord[2];

    updateLuckyNumbers();
  };
})();
