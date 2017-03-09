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
    this.waves[0] = new Wave("triangle");
    this.waves[1] = new Wave("square");

    this.envelopeParms = [];
    this.envelopeParms[0] = {
        "attack"    : 0,
        "decay"     : 0.5,
        "sustain"   : 0.5,
        "release"   : 0.5
    };
    this.envelopeParms[1] = {
        "attack"    : 0,
        "decay"     : 0.5,
        "sustain"   : 0.5,
        "release"   : 0.5
    };

    this.lfoParms = [];
    this.lfoParms[0] = {
        "freq"      : 10,
        "type"      : "sine",
        "gain"      : 0.05
    };
    this.lfoParms[1] = {
        "freq"      : 10,
        "type"      : "sine",
        "gain"      : 0.05
    };

    // Volumes for the gain nodes
    this.volumes = [];
    this.volumes[0] = 0.5;
    this.volumes[1] = 0.5;

    this.sounds = {};
}

Synth.prototype.keyboard = function(charCode)
{
    var key = String.fromCharCode(charCode);
    // Main octave c4 - c5 -- TODO: add more
    if(key == "Q")
        return 261.626; // c4
    else if(key == "W")
        return 277.183; // c4/d4
    else if(key == "E")
        return 293.665; // d4
    else if(key == "R")
        return 311.127; // d4/e4
    else if(key == "T")
        return 329.628; // e4
    else if(key == "Y")
        return 349.228; // f4
    else if(key == "U")
        return 369.994; // f4/g4
    else if(key == "I")
        return 391.995; // g4
    else if(key == "O")
        return 415.305; // g4/a4
    else if(key == "P")
        return 440; // a4
    else if(charCode == 219)
        return 466.164; // a4/b4
    else if(charCode == 221)
        return 493.883; // b4
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

        sound.adsr = [];
        sound.adsr[0] = new Envelope(this.envelopeParms[0]);
        sound.adsr[1] = new Envelope(this.envelopeParms[1]);
        sound.adsr[0].connect(sound.gain[0].gain); // ADSR should affect volume, so connect it to that
        sound.adsr[1].connect(sound.gain[1].gain);
        sound.adsr[0].rampUp(this.volumes[0],this.context);
        sound.adsr[1].rampUp(this.volumes[1],this.context);

        sound.lfo = [];
        sound.lfo[0] = new LFO(this.lfoParms[0]);
        sound.lfo[1] = new LFO(this.lfoParms[1]);
        sound.lfo[0].connect(sound.gain[0].gain); // LFO should affect volume, so connect it to that
        sound.lfo[1].connect(sound.gain[1].gain);
        sound.lfo[0].start(this.context);
        sound.lfo[1].start(this.context);
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
        sound.gain[0].connect(this.context.destination);
        sound.osc[0].start();

        sound.osc[1].connect(sound.gain[1]);
        sound.gain[1].connect(this.context.destination);
        sound.osc[1].start();
    }	
}

Synth.prototype.stopSound = function(f)
{
    if(this.sounds[f] !== undefined)
    {
        this.sounds[f].adsr[0].rampDown(this.context);
        this.sounds[f].adsr[1].rampDown(this.context);
        this.sounds[f].lfo[0].stop();
        this.sounds[f].lfo[1].stop();
        delete this.sounds[f];
    }
}