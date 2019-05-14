var randomFormula = (function() {
  'use strict';

  var alreadyRandomed = JSON.parse(localStorage.getItem('randomedFormulas')) || [];
  var formulas = [
    '(a + b)^2 = a^2 + 2ab + b^2',
    '(a - b)^2 = a^2 - 2ab + b^2',
    'a^2 - b^2 = (a-b)(a+b)',

    '(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3',
    'a^3 + b^3 = (a + b)(a^2 - ab + b^2)',
    '(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3',
    'a^3 - b^3 = (a - b)(a^2 + ab + b^2)'
  ];

  var formattedFormulas = formulas.map(function(formula) {
    return formula.replace(/\^[0-9]{1,}/g, function(content) {
      return '<sup>' + content.substr(1) + '</sup>';
    }).replace(/[0-9]/g, function(e) {
      // quite ugly, but works :D
      return '<span class="formula__number">' + e + '</span>';
    });
  });

  return function() {
    var toRandom = formulas.filter(function(value, index) {
      return alreadyRandomed.indexOf(index) === -1;
    });

    if (!toRandom.length) {
      alreadyRandomed.length = 0;
      toRandom = [].slice.call(formulas);
    }

    var randomedIndex = Math.floor((Math.random() * toRandom.length));
    var randomedValue = toRandom[randomedIndex];
    var formulaIndex = formulas.indexOf(randomedValue);

    alreadyRandomed.push(formulaIndex);
    localStorage.setItem('randomedFormulas', JSON.stringify(alreadyRandomed));

    return formattedFormulas[formulaIndex];
  };
})();
