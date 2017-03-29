(function() {

var mySynth = null;

var init = function() {
  mySynth = new Synth();
  initKnobs(mySynth);
  initKeyboard(mySynth);
  initButtons(mySynth);
};

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

document.addEventListener("keydown", function(event) {
  var charCode = event.keyCode || event.which;
  var freq = mySynth.keyboard(charCode);

  if (freq != 0) {
    mySynth.playSound(freq);
  }
});

document.addEventListener("keyup", function(event) {
  var charCode = event.keyCode || event.which;
  var freq = mySynth.keyboard(charCode);

  if (freq != 0) {
    mySynth.stopSound(freq);
  }
});

var draw = function() {
  for (var analyser in mySynth.analysers) {

  }
}

})();
