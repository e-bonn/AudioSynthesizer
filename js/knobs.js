var initKnobs = function(mySynth) {
  $('.knobs').knob({
    'angleArc'    : 180,
    'angleOffset' : 270,
    'bgColor'     : '#AAAAAA',
    'fgColor'     : '#33FFFF',
    'height'      : 80,
    'inputColor'  : '#33FFFF',
    'max'         : 100,
    'min'         : 0,
    'step'        : 1,
    'width'       : 80,
  });
  $('.knobs').prop('readonly', true);

  $('.freq-knobs').trigger(
    'configure',
    {
      'max' : 25,
      'min' : 1,
    }
  );

  $('.shift-knobs').trigger(
    'configure',
    {
      'max' : 360,
      'min' : 0,
    }
  );

  $('.time-knobs').trigger(
    'configure',
    {
      'max'  : 2,
      'min'  : 0,
      'step' : 0.1,
    }
  );

  $('#rev-dec-knob').trigger(
    'configure',
    {
      'max'  : 4,
      'min'  : 0,
      'step' : 0.1,
    }
  );

  $('.oct-knobs').trigger(
    'configure',
    {
      'max'  : 8,
      'min'  : 1,
      'step' : 1,
    }
  );

  $('#osc1-main-vol').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setVolume(0, Math.round(v) / 100); }
    }
  );

  $('#osc2-main-vol').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setVolume(1, Math.round(v) / 100); }
    }
  );

  $('#osc1-main-phase').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setPhaseShift(0, (Math.round(v) * Math.PI) / 180); }
    }
  );

  $('#osc2-main-phase').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setPhaseShift(1, (Math.round(v) * Math.PI) / 180); }
    }
  );

}
