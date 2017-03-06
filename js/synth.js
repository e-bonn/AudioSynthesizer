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

    // Volumes for the gain nodes
    this.volumes = [];
    this.volumes[0] = 1;
    this.volumes[1] = 1;

    this.sounds = {};
}

Synth.prototype.keyboard = function(key)
{
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
    else if(key == "A")
        return 466.164; // a4/b4
    else if(key == "S")
        return 493.883; // b4
}

Synth.prototype.changeVolume = function(osc, delta)
{
    if(osc >= 0 && osc <= 1)
    {
        this.volumes[osc] += delta;
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
        this.sounds[f].osc[0].stop();
        this.sounds[f].osc[1].stop();
        delete this.sounds[f];
    }
}