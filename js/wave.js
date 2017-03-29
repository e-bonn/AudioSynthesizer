function Wave(type, phaseShift) {
  this.init(type, phaseShift);
}

Wave.prototype.init = function(type, phaseShift) {
  this.real = [];
  this.im = [];
  this.ogReal = null;
  this.ogIm = null;

  this.setWaveformTo(type);
  this.setPhaseShift(phaseShift);
}

// k is the rotation value in radians
Wave.prototype.setPhaseShift = function(phaseShift) {
  var shiftVal = (phaseShift * Math.PI) / 180;
  this.phaseShift = phaseShift;
  // A Phase Shift is a counter-clockwise rotation on real-imaginary plane
  // This is a simple Euler rotation in 2 dimensions, using a rotation matrix:
  // | cos(theta)     -sin(theta) |
  // | sin(theta)     cos(theta)  |
  for (var i = 1; i < this.im.length; i++) {
    this.real[i] = this.ogReal[i]*Math.cos(shiftVal) - this.ogIm[i]*Math.sin(shiftVal);
    this.im[i] = this.ogReal[i]*Math.sin(shiftVal) + this.ogIm[i]*Math.cos(shiftVal);
  }
}

Wave.prototype.setWaveformTo = function(type) {
  this.real = new Float32Array(4096);
  this.im = new Float32Array(4096);
  this.type = type;

  switch(type) {
    case 'sine':
      this.im[1] = 1.0;
      break;
    case 'square':
      for (var k = 1; k < this.im.length; k += 2) {
          this.im[k] = 4.0/(Math.PI*k);
      }
      break;
    case 'triangle':
      for (var k = 1; k < this.im.length; k += 2) {
          this.im[k] = (8.0*Math.pow(-1,(k-1)/2))/(Math.pow(Math.PI,2)*Math.pow(k,2));
      }
      break;
    case 'sawtooth':
      for (var k = 1; k < this.im.length; k++) {
          this.im[k] = (2.0*Math.pow(-1,k))/(Math.PI*k);
      }
      break;
  }

  this.ogReal = this.real.slice();
  this.ogIm = this.im.slice();
}
