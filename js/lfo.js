function LFO(lfoParms) {
  this.init(lfoParms);
}

LFO.prototype.init = function(lfoParms) {
  this.freq = lfoParms.freq;
  this.type = lfoParms.type;
  this.gain = lfoParms.gain;

  this.osc = null;
  this.gainObj = null;
  this.parm = null;
}

// This connects the lfo to an AudioNode [parm] in the Web Audio API network
LFO.prototype.connect = function(parm) {
  this.parm = parm;
}

LFO.prototype.start = function(context) {
  var wave = new Wave(this.type, 0);
  var contextWave = context.createPeriodicWave(wave.real, wave.im);

  this.osc = context.createOscillator();

  this.osc.setPeriodicWave(contextWave);
  this.osc.frequency.value = this.freq;

  // LFO needs its own volume control
  this.gainObj = context.createGain();
  this.gainObj.gain.value = this.gain;

  this.osc.connect(this.gainObj);
  this.gainObj.connect(this.parm);
  this.osc.start();
}

LFO.prototype.stop = function() {
  this.osc.stop();
}
