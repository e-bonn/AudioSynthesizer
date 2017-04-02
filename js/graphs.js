var scopeContext = null;
var spectrumContex = null;

var initGraphs = function() {
  scopeContext = $('#oscilloscope')[0].getContext('2d');
  spectrumContext = $('#spectrum')[0].getContext('2d');
  draw();
}

var draw = function() {
  if (scopeContext !== null) {
    drawScope();
  }
  if (spectrumContext !== null) {
    drawSpectrum();
  }
  window.requestAnimationFrame(draw);
}

function drawScope() {
  var width = scopeContext.canvas.width;
  var height = scopeContext.canvas.height;
  var scaling = (height - 10) / 256;
  var risingEdge = 0;
  var edgeThreshold = 5;

  scopeContext.clearRect(0, 0, width, height);
  scopeContext.fillStyle = 'rgba(170, 170, 170, 0.1)';
  scopeContext.fillRect(0, 0, width, height);

  scopeContext.lineWidth = 2;
  scopeContext.strokeStyle = 'rgb(51, 255, 255)';


  if (Object.keys(mySynth.analysers).length > 0) {
    for (var f in mySynth.analysers) {
      var timeData = new Uint8Array(1024);
      mySynth.analysers[f].getByteTimeDomainData(timeData);
      scopeContext.beginPath();
      while (risingEdge < 1024 && timeData[risingEdge] - 128 > 0 && risingEdge <= width) {
        risingEdge++;
      }
      if (risingEdge >= width) risingEdge = 0;

      while (risingEdge < 1024 && timeData[risingEdge] - 128 < edgeThreshold && risingEdge <= width) {
         risingEdge++;
      }
      if (risingEdge >= width) risingEdge = 0;

      for (var x = risingEdge; x < timeData.length && x - risingEdge < width; x++) {
        scopeContext.lineTo(x - risingEdge, height - (timeData[x] * scaling) - 5);
      }
      scopeContext.stroke();
    }
  }
}

function drawSpectrum() {
  var width = spectrumContext.canvas.width;
  var height = spectrumContext.canvas.height;
  var scaling = (height - 5) / 256;

  spectrumContext.clearRect(0, 0, width, height);
  spectrumContext.fillStyle = 'rgba(170, 170, 170, 0.1)';
  spectrumContext.fillRect(0, 0, width, height);

  spectrumContext.lineWidth = 2;
  spectrumContext.strokeStyle = 'rgb(51, 255, 255)';
  spectrumContext.beginPath();

  var analysersToDelete = [];
  var totalFreqData = new Uint8Array(1024);
  if (Object.keys(mySynth.analysers).length > 0) {
    for (var f in mySynth.analysers) {
      var freqData = new Uint8Array(1024);
      mySynth.analysers[f].getByteFrequencyData(freqData);
      if (mySynth.sounds[f] === undefined && freqData.every(elem => elem === 0)) {
        analysersToDelete.push(f);
        continue;
      }
      for (var i = 0; i < totalFreqData.length; i++) {
        if (totalFreqData[i] < freqData[i]) {
          totalFreqData[i] = freqData[i];
        }
      }
    }
  }

  for (var i = 0; i < analysersToDelete.length; i++) {
    delete mySynth.analysers[analysersToDelete[i]];
  }

  for (var x = 0; x < width; x++) {
    spectrumContext.lineTo(x, height - (totalFreqData[x] * scaling));
  }
  spectrumContext.stroke();
}
