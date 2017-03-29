var initKeyboard = function(mySynth) {
  $('#key1-knob').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setOctave(0, Math.round(v)); }
    }
  );

  $('#key2-knob').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setOctave(1, Math.round(v)); }
    }
  );

  // $('#c-key1').on(
  //   'click',
  //   function() {
  //     play(0);
  //   }
  // );
}
