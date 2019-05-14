(function() {
  'use strict';

  var requestFrequencyInSeconds = 60;
  var requestTimeoutInSeconds = 50;


  /**
    heroku deploy fades out when it is unactive by 30 minutes
    possibly is option that something will may be go wrong
  **/
  function parseResult(result) {
    var data;

    try {
      data = JSON.parse(result);
    } catch(error) {
      return console.error(error);
    }

    if (data.lastUpdate > +localStorage.getItem('lastUpdate')) {
      localStorage.setItem('lastUpdate', data.lastUpdate);
      location.reload();
    }

    [].slice.call(
      document.querySelectorAll('.lucky-number__wrapper')
    ).forEach(function(element, index) {
      element.textContent = data.luckyNumbers[index];
    });
  };

  function checkUpdates() {
    var request = new XMLHttpRequest();

    request.timeout = requestTimeoutInSeconds * 1000;
    request.open('GET', './lastchange.json?' + Math.random(), true);

    request.addEventListener('readystatechange', function(data) {
      if (request.readyState !== 4) return;

      parseResult(request.responseText);
      setTimeout(checkUpdates, requestFrequencyInSeconds * 1000);
    }, false);

    request.send(null);
  }

  checkUpdates();
})();
