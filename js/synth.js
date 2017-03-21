function Synth()
{
    this.init();
}

Synth.prototype.init = function()
{
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext();

    this.waves = [];
    // Init to sine waves
    this.waves[0] = new Wave("sine");
    this.waves[1] = new Wave("sine");

    this.envelopeParms = [];
    this.envelopeParms[0] = {
        "attack"    : 0,
        "decay"     : 0,
        "sustain"   : 0.5,
        "release"   : 0.2
    };
    this.envelopeParms[1] = {
        "attack"    : 0,
        "decay"     : 0,
        "sustain"   : 0.5,
        "release"   : 0.2
    };

    this.lfoParms = [];
    this.lfoParms[0] = {
        "freq"      : 5,
        "type"      : "sine",
        "gain"      : 0.05
    };
    this.lfoParms[1] = {
        "freq"      : 5,
        "type"      : "sine",
        "gain"      : 0.05
    };

    this.filterParms = [];
    this.filterParms[0] = {
        "type"      : "lowpass",
        "cutoffFreq" : 1000,
        "Q"         : 0
    };
    this.filterParms[1] = {
        "type"      : "lowpass",
        "cutoffFreq" : 1000,
        "Q"         : 0
    };

    this.baseOctave =
    [
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
    this.volumes[0] = 0.5;
    this.volumes[1] = 0.5;

    this.octave = 4;

    this.sounds = {};
}

Synth.prototype.keyboard = function(charCode)
{
    var key = String.fromCharCode(charCode);

    // One full Octave
    if(key == "Q")
        return Math.pow(2,this.octave-1)*this.baseOctave[0]; // c
    else if(key == "W")
        return Math.pow(2,this.octave-1)*this.baseOctave[1]; // c/d
    else if(key == "E")
        return Math.pow(2,this.octave-1)*this.baseOctave[2]; // d
    else if(key == "R")
        return Math.pow(2,this.octave-1)*this.baseOctave[3]; // d/e
    else if(key == "T")
        return Math.pow(2,this.octave-1)*this.baseOctave[4]; // e
    else if(key == "Y")
        return Math.pow(2,this.octave-1)*this.baseOctave[5]; // f
    else if(key == "U")
        return Math.pow(2,this.octave-1)*this.baseOctave[6]; // f/g
    else if(key == "I")
        return Math.pow(2,this.octave-1)*this.baseOctave[7]; // g
    else if(key == "O")
        return Math.pow(2,this.octave-1)*this.baseOctave[8]; // g/a
    else if(key == "P")
        return Math.pow(2,this.octave-1)*this.baseOctave[9]; // a
    else if(charCode == 219)
        return Math.pow(2,this.octave-1)*this.baseOctave[10]; // a/b
    else if(charCode == 221)
        return Math.pow(2,this.octave-1)*this.baseOctave[11]; // b

    else
        return 0;
}

Synth.prototype.changeWaveform = function(osc, type)
{
    if(osc >= 0 && osc <= 1)
    {
        this.waves[osc].setWaveformTo(type);
    }
}

Synth.prototype.setVolume = function(osc, vol)
{
    if(osc >= 0 && osc <= 1)
    {
        this.volumes[osc] = vol;
    }
}

Synth.prototype.shiftPhase = function(osc, k)
{
    if(osc >= 0 && osc <= 1)
    {
        this.waves[osc].shiftPhase(k);
    }
}

Synth.prototype.setEnvelope = function(osc, envelopeParms)
{
    if(osc >= 0 && osc <= 1)
    {
        this.envelopeParms[osc] = envelopeParms;
    }
}

Synth.prototype.setLfo = function(osc, lfoParms)
{
   if(osc >= 0 && osc <= 1)
    {
        this.lfoParms[osc] = lfoParms;
    }
}

Synth.prototype.setFilter = function(osc, filterParms)
{
   if(osc >= 0 && osc <= 1)
    {
        this.filterParms[osc] = filterParms;
    }
}

Synth.prototype.setOctave = function(octave)
{
   this.octave = octave;
}


Synth.prototype.getSoundData = function(f)
{
    if(this.sounds[f] !== undefined)
    {
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
        sound.envelopes[0].rampUp(this.volumes[0],this.context);
        sound.envelopes[1].rampUp(this.volumes[1],this.context);

        sound.lfos = [];
        sound.lfos[0] = new LFO(this.lfoParms[0]);
        sound.lfos[1] = new LFO(this.lfoParms[1]);
        sound.lfos[0].connect(sound.gain[0].gain); // LFO should affect volume, so connect it to that
        sound.lfos[1].connect(sound.gain[1].gain);
        sound.lfos[0].start(this.context);
        sound.lfos[1].start(this.context);

        sound.filters = [];
        sound.filters[0] = new Filter(this.filterParms[0]);
        sound.filters[0].connect(this.context.destination,this.context);
        sound.filters[1] = new Filter(this.filterParms[1]);
        sound.filters[1].connect(this.context.destination,this.context);
    }
}

Synth.prototype.playSound = function(f)
{
    if(this.sounds[f] === undefined)
    {
        this.sounds[f] = {};

        this.getSoundData(f);

        // Play the sound -- two oscillators combined
        sound.osc[0].connect(sound.gain[0]);
        sound.gain[0].connect(sound.filters[0].filter);
        sound.filters[0].start();
        sound.osc[0].start();

        sound.osc[1].connect(sound.gain[1]);
        sound.gain[1].connect(sound.filters[1].filter);
        sound.filters[1].start();
        sound.osc[1].start();
    }	
}

Synth.prototype.stopSound = function(f)
{
    if(this.sounds[f] !== undefined)
    {
        this.sounds[f].envelopes[0].rampDown(this.context);
        this.sounds[f].envelopes[1].rampDown(this.context);
        this.sounds[f].lfos[0].stop();
        this.sounds[f].lfos[1].stop();
        delete this.sounds[f];
    }
}