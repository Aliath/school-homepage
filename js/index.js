(function() {
  'use strict';

  function update() {
    requestAnimationFrame(update);

    updateTicks();
    updateClock();
    updateDailyContent();
  };

  requestAnimationFrame(update);
})();
