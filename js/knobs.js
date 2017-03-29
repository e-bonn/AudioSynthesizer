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
  $('.knobs').prop('step', 0);
  $('.knobs').prop('readonly', true);
  $('.knobs').css('user-select', 'none');
  $('.knobs').css('-moz-user-select', 'none');
  $('.knobs').css('-ms-user-select', 'none');
  $('.knobs').css('-webkit-user-select', 'none');

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

  $('.filt-cut-knobs').trigger(
    'configure',
    {
      'max'  : 8000,
      'min'  : 0,
      'step' : 100,
    }
  );

  $('.filt-q-knobs').trigger(
    'configure',
    {
      'max'  : 2000,
      'min'  : 0,
      'step' : 100,
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
      'change' : function(v) { mySynth.setPhaseShift(0, Math.round(v)); }
    }
  );

  $('#osc2-main-phase').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setPhaseShift(1, Math.round(v)); }
    }
  );

  $('#osc1-lfo-vol').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setLfoGain(0, Math.round(v) / 100); }
    }
  );

  $('#osc2-lfo-vol').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setLfoGain(1, Math.round(v) / 100); }
    }
  );

  $('#osc1-lfo-freq').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setLfoFreq(0, Math.round(v)); }
    }
  );

  $('#osc2-lfo-freq').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setLfoFreq(1, Math.round(v)); }
    }
  );

  $('#osc1-env-att').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setAttack(0, Math.round(v * 10) / 10); }
    }
  );

  $('#osc2-env-att').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setAttack(1, Math.round(v * 10) / 10); }
    }
  );

  $('#osc1-env-dec').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setDecay(0, Math.round(v * 10) / 10); }
    }
  );

  $('#osc2-env-dec').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setDecay(1, Math.round(v * 10) / 10); }
    }
  );

  $('#osc1-env-rel').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setRelease(0, Math.round(v * 10) / 10); }
    }
  );

  $('#osc2-env-rel').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setRelease(1, Math.round(v * 10) / 10); }
    }
  );

  $('#osc1-env-sus').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setSustain(0, Math.round(v) / 100); }
    }
  );

  $('#osc2-env-sus').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setSustain(1, Math.round(v) / 100); }
    }
  );

  $('#osc1-filt-cut').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setFilterCutoff(0, Math.round(v)); }
    }
  );

  $('#osc2-filt-cut').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setFilterCutoff(1, Math.round(v)); }
    }
  );

  $('#osc1-filt-q').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setFilterQ(0, Math.round(v)); }
    }
  );

  $('#osc2-filt-q').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setFilterQ(1, Math.round(v)); }
    }
  );

  $('#delay-knob').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setDelayTime(Math.round(v * 10) / 10); }
    }
  );

  $('#rev-dur-knob').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setReverbDuration(Math.round(v * 10) / 10); }
    }
  );

  $('#rev-dec-knob').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setReverbDecay(Math.round(v * 10) / 10); }
    }
  );
}
