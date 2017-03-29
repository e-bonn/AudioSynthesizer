function Synth() {
  this.init();
}

Synth.prototype.init = function() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  this.context = new AudioContext();

  this.waves = [];
  // Init to sine waves
  this.waves[0] = new Wave("sine");
  this.waves[1] = new Wave("square");

  this.envelopeParms = [];
  this.envelopeParms[0] = {
    "attack"    : 0,
    "decay"     : 0,
    "sustain"   : 0.5,
    "release"   : 0.2,
  };
  this.envelopeParms[1] = {
    "attack"    : 0,
    "decay"     : 0,
    "sustain"   : 0.5,
    "release"   : 0.2,
  };

  this.lfoParms = [];
  this.lfoParms[0] = {
    "freq"      : 5,
    "type"      : "sine",
    "gain"      : 0.05,
  };
  this.lfoParms[1] = {
    "freq"      : 5,
    "type"      : "sine",
    "gain"      : 0.05,
  };

  this.filterParms = [];
  this.filterParms[0] = {
    "enabled"    : true,
    "type"       : "lowpass",
    "cutoffFreq" : 1000,
    "Q"          : 0,
  };
  this.filterParms[1] = {
    "enabled"    : true,
    "type"       : "lowpass",
    "cutoffFreq" : 1000,
    "Q"          : 0,
  };

  this.reverbParms = {
    "enabled"   : false,
    "duration"  : 1,
    "decay"     : 0,
  };

  this.delayTime = 0.1;

  this.baseOctave = [
    32.7032,
    34.6478,
    36.7081,
    38.8909,
    41.2034,
    43.6535,
    46.2493,
    48.9994,
    51.9131,
    55.0000,
    58.2705,
    61.7354
  ];

  // Volumes for the gain nodes
  this.volumes = [];
  this.volumes[0] = 0.1;
  this.volumes[1] = 0.1;

  this.octaves = [];
  this.octaves[0] = 4;
  this.octaves[1] = 5;

  this.sounds = {};
  this.analysers = {};
}

Synth.prototype.keyboard = function(charCode) {
  // One full Octave
  switch(charCode) {
    case 49: // Key 1
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[0]; // c
    case 50: // Key 2
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[1]; // c/d
    case 51: // Key 3
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[2]; // d
    case 52: // Key 4
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[3]; // d/e
    case 53: // Key 5
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[4]; // e
    case 54: // Key 6
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[5]; // f
    case 55: // Key 7
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[6]; // f/g
    case 56: // Key 8
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[7]; // g
    case 57: // Key 9
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[8]; // g/a
    case 48: // Key 0
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[9]; // a
    case 189: // Key -
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[10]; // a/b
    case 187: // Key =
      return Math.pow(2, this.octaves[0]-1)*this.baseOctave[11]; // b
    case 81: // Key Q
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[0]; // c
    case 87: // Key W
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[1]; // c/d
    case 69: // Key E
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[2]; // d
    case 82: // Key R
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[3]; // d/e
    case 84: // Key T
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[4]; // e
    case 89: // Key Y
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[5]; // f
    case 85: // Key U
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[6]; // f/g
    case 73: // Key I
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[7]; // g
    case 79: // Key O
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[8]; // g/a
    case 80: // Key P
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[9]; // a
    case 219: // Key [
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[10]; // a/b
    case 221: // Key ]
      return Math.pow(2, this.octaves[1]-1)*this.baseOctave[11]; // b
    default:
      return 0;
  }
}

Synth.prototype.changeWaveform = function(osc, type) {
  if (osc >= 0 && osc <= 1) {
    this.waves[osc].setWaveformTo(type);
  }
}

Synth.prototype.setVolume = function(osc, vol) {
  this.volumes[osc] = vol;
}

Synth.prototype.setPhaseShift = function(osc, k) {
  this.waves[osc].setPhaseShift(k);
}

Synth.prototype.setEnvelope = function(osc, envelopeParms) {
  this.envelopeParms[osc] = envelopeParms;
}

Synth.prototype.setLfo = function(osc, lfoParms) {
  this.lfoParms[osc] = lfoParms;
}

Synth.prototype.setFilter = function(osc, filterParms) {
  if (osc >= 0 && osc <= 1) {
    this.filterParms[osc] = filterParms;
  }
}

Synth.prototype.setOctave = function(keyboard, octave) {
  this.octaves[keyboard] = octave;
}

Synth.prototype.setReverb = function(reverbParms) {
  this.reverbParms = reverbParms;
}

Synth.prototype.setDelayTime = function(delayTime) {
  this.delayTime = delayTime;
}

Synth.prototype.buildConvolver = function(convolver) {
  var sampleRate = this.context.sampleRate;
  var size = sampleRate*this.reverbParms.duration;
  var impulse = this.context.createBuffer(2, size, sampleRate);
  var impulseL = impulse.getChannelData(0);
  var impulseR = impulse.getChannelData(1);

  // Generate noise on logarithmic decay curve:
  // http://stackoverflow.com/questions/34482319/web-audio-api-how-do-i-add-a-working-convolver
  for (var i = 0; i < size; i++) {
    impulseL[i] = Math.random() * Math.pow(1-i/size, this.reverbParms.decay);
    impulseR[i] = Math.random() * Math.pow(1-i/size, this.reverbParms.decay);
  }

  convolver.buffer = impulse;
}

Synth.prototype.getSoundData = function(f) {
  if (this.sounds[f] !== undefined) {
    sound = this.sounds[f];

    sound.osc = [];
    sound.osc[0] = this.context.createOscillator();
    sound.osc[1] = this.context.createOscillator();

    sound.gain = [];
    sound.gain[0] = this.context.createGain();
    sound.gain[1] = this.context.createGain();
    sound.gain[0].gain.value = this.volumes[0];
    sound.gain[1].gain.value = this.volumes[1];

    // Waves for the the AudioContext's oscillator
    var waves = [];
    waves[0] = this.context.createPeriodicWave(this.waves[0].real, this.waves[0].im);
    waves[1] = this.context.createPeriodicWave(this.waves[1].real, this.waves[1].im);

    sound.osc[0].setPeriodicWave(waves[0]);
    sound.osc[0].frequency.value = f;
    sound.osc[1].setPeriodicWave(waves[1]);
    sound.osc[1].frequency.value = f;

    sound.envelopes = [];
    sound.envelopes[0] = new Envelope(this.envelopeParms[0]);
    sound.envelopes[1] = new Envelope(this.envelopeParms[1]);
    sound.envelopes[0].connect(sound.gain[0].gain); // Envelope should affect volume, so connect it to that
    sound.envelopes[1].connect(sound.gain[1].gain);
    sound.envelopes[0].rampUp(this.volumes[0], this.context);
    sound.envelopes[1].rampUp(this.volumes[1], this.context);

    sound.lfos = [];
    sound.lfos[0] = new LFO(this.lfoParms[0]);
    sound.lfos[1] = new LFO(this.lfoParms[1]);
    sound.lfos[0].connect(sound.gain[0].gain); // LFO should affect volume, so connect it to that
    sound.lfos[1].connect(sound.gain[1].gain);
    sound.lfos[0].start(this.context);
    sound.lfos[1].start(this.context);

    sound.delay = this.context.createDelay();
    sound.delay.delayTime.value = this.delayTime;

    if (this.reverbParms.enabled) {
      sound.convolver = this.context.createConvolver();
      this.buildConvolver(sound.convolver);
    }

    var filterConnection;
    if (this.reverbParms.enabled) {
      filterConnection = sound.convolver;
    } else {
      filterConnection = sound.delay;
    }

    sound.filters = [];
    sound.filters[0] = new Filter(this.filterParms[0]);
    if (sound.filters[0].enabled) {
      sound.filters[0].connect(filterConnection, this.context);
    }

    sound.filters[1] = new Filter(this.filterParms[1]);
    if (sound.filters[1].enabled) {
      sound.filters[1].connect(filterConnection, this.context);
    }
  }
}

Synth.prototype.playSound = function(f) {
  if (this.sounds[f] === undefined) {
    this.sounds[f] = {};

    this.getSoundData(f);

    // Play Oscillator 1
    sound.osc[0].connect(sound.gain[0]);
    if (sound.filters[0].enabled) {
      sound.gain[0].connect(sound.filters[0].filter);
      sound.filters[0].start();
    } else if (!sound.filters[0].enabled && this.reverbParms.enabled) {
      sound.gain[0].connect(sound.convolver);
    } else if (!sound.filters[0].enabled && !this.reverbParms.enabled) {
      sound.gain[0].connect(sound.delay);
    }
    sound.osc[0].start();

    // Play Oscillator 2
    sound.osc[1].connect(sound.gain[1]);
    if (sound.filters[1].enabled) {
      sound.gain[1].connect(sound.filters[0].filter);
      sound.filters[1].start();
    } else if (!sound.filters[1].enabled && this.reverbParms.enabled) {
      sound.gain[1].connect(sound.convolver);
    } else if (!sound.filters[1].enabled && !this.reverbParms.enabled) {
      sound.gain[1].connect(sound.delay);
    }
    sound.osc[1].start();

    if (this.reverbParms.enabled) {
      sound.convolver.connect(sound.delay);
    }

    // One analyser per sound, draw each individual sound wave
    this.analysers[f] = this.context.createAnalyser();
    sound.delay.connect(this.analysers[f]);
    this.analysers[f].connect(this.context.destination);
  }
}

Synth.prototype.stopSound = function(f) {
  if (this.sounds[f] !== undefined) {
    this.sounds[f].envelopes[0].rampDown(this.context);
    this.sounds[f].envelopes[1].rampDown(this.context);
    this.sounds[f].lfos[0].stop();
    this.sounds[f].lfos[1].stop();
    delete this.sounds[f];
    delete this.analysers[f];
  }
}
