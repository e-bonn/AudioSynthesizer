var initButtons = function(mySynth) {
  $('input[type=radio][name=osc1-main]').change(
    function() {
      switch (this.id) {
        case 'osc1-main-sine':
          mySynth.changeWaveform(0, 'sine');
          break;
        case 'osc1-main-squ':
          mySynth.changeWaveform(0, 'square');
          break;
        case 'osc1-main-tri':
          mySynth.changeWaveform(0, 'triangle');
          break;
        case 'osc1-main-saw':
          mySynth.changeWaveform(0, 'sawtooth');
          break;
      }
    }
  );

  $('input[type=radio][name=osc2-main]').change(
    function() {
      switch (this.id) {
        case 'osc2-main-sine':
          mySynth.changeWaveform(1, 'sine');
          break;
        case 'osc2-main-squ':
          mySynth.changeWaveform(1, 'square');
          break;
        case 'osc2-main-tri':
          mySynth.changeWaveform(1, 'triangle');
          break;
        case 'osc2-main-saw':
          mySynth.changeWaveform(1, 'sawtooth');
          break;
      }
    }
  );

  $('input[type=radio][name=osc1-lfo]').change(
    function() {
      switch (this.id) {
        case 'osc1-lfo-sine':
          mySynth.setLfoWave(0, 'sine');
          break;
        case 'osc1-lfo-squ':
          mySynth.setLfoWave(0, 'square');
          break;
        case 'osc1-lfo-tri':
          mySynth.setLfoWave(0, 'triangle');
          break;
        case 'osc1-lfo-saw':
          mySynth.setLfoWave(0, 'sawtooth');
          break;
      }
    }
  );

  $('input[type=radio][name=osc2-lfo]').change(
    function() {
      switch (this.id) {
        case 'osc2-lfo-sine':
          mySynth.setLfoWave(1, 'sine');
          break;
        case 'osc2-lfo-squ':
          mySynth.setLfoWave(1, 'square');
          break;
        case 'osc2-lfo-tri':
          mySynth.setLfoWave(1, 'triangle');
          break;
        case 'osc2-lfo-saw':
          mySynth.setLfoWave(1, 'sawtooth');
          break;
      }
    }
  );

  $('input[type=radio][name=osc1-filt]').change(
    function() {
      switch (this.id) {
        case 'osc1-filt-none':
          mySynth.setFilterType(0, 'none');
          break;
        case 'osc1-filt-low':
          mySynth.setFilterType(0, 'lowpass');
          break;
        case 'osc1-filt-high':
          mySynth.setFilterType(0, 'highpass');
          break;
        case 'osc1-filt-band':
          mySynth.setFilterType(0, 'bandpass');
          break;
      }
    }
  );

  $('input[type=radio][name=osc2-filt]').change(
    function() {
      switch (this.id) {
        case 'osc2-filt-none':
          mySynth.setFilterType(1, 'none');
          break;
        case 'osc2-filt-low':
          mySynth.setFilterType(1, 'lowpass');
          break;
        case 'osc2-filt-high':
          mySynth.setFilterType(1, 'highpass');
          break;
        case 'osc2-filt-band':
          mySynth.setFilterType(1, 'bandpass');
          break;
      }
    }
  );

  $('input[type=radio][name=osc-rev]').change(
    function() {
      switch (this.id) {
        case 'osc-rev-on':
          mySynth.setReverbEnabled(true);
          break;
        case 'osc-rev-off':
          mySynth.setReverbEnabled(false);
          break;
      }
    }
  );
}
