var heldKeys = {};
var mySynth = null;
(function() {

var init = function() {
  mySynth = new Synth();
  initKnobs();
  initKeyboard();
  initButtons();
  initGraphs();
};

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

document.addEventListener("keydown", function(event) {
  var charCode = event.keyCode || event.which;
  var freq = mySynth.keyboard(charCode);
  if (freq != 0 && heldKeys[charCode] !== true) {
    $('.oscillator').addClass('disable');
    $('.effects').addClass('disable');
    $('.key-knobs').addClass('disable');
    heldKeys[charCode] = true;
    activateKey(charCode);
    mySynth.playSound(freq);
  }
});

document.addEventListener("keyup", function(event) {
  var charCode = event.keyCode || event.which;
  var freq = mySynth.keyboard(charCode);
  if (freq != 0) {
    delete heldKeys[charCode];
    if (heldKeys[charCode] === undefined && heldKeys[charCode + 500] === undefined) {
      deactivateKey(charCode);
      mySynth.stopSound(freq);
      if (Object.keys(heldKeys).length === 0) {
        $('.oscillator').removeClass('disable');
        $('.effects').removeClass('disable');
        $('.key-knobs').removeClass('disable');
      }
    }
  }
});

})();
