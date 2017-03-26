(function() {

var mySynth = null;

var init = function() {
  mySynth = new Synth();
  initKnobs();
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

var initKnobs = function() {
  $(".knobs").knob({
    'angleArc'    : 180,
    'angleOffset' : 270,
    'bgColor'     : '#AAAAAA',
    'fgColor'     : '#33FFFF',
    'height'      : 80,
    'inputColor'  : '#33FFFF',
    'max'         : 100,
    'min'         : 0,
    'step'        : 1,
    'width'       : 80
  });
  $(".knobs").prop('readonly', true);

  $(".freq-knobs").trigger(
    'configure',
    {
      'max' : 25,
      'min' : 1
    }
  );

  $(".time-knobs").trigger(
    'configure',
    {
      'max'  : 2,
      'min'  : 0,
      'step' : 0.1,
    }
  );
}

})();
