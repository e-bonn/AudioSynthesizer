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

	this.sounds = {};
}

Synth.prototype.playSound = function(f)
{
	if(this.sounds[f] === undefined)
	{
		this.sounds[f] = {};
		sound = this.sounds[f];

		sound.osc = [];
		sound.osc[0] = this.context.createOscillator();
		sound.osc[1] = this.context.createOscillator();

		// Waves for the the AudioContext's oscillator
		var waves = [];
		waves[0] = this.context.createPeriodicWave(this.waves[0].real, this.waves[0].im);
		waves[1] = this.context.createPeriodicWave(this.waves[1].real, this.waves[1].im);

		sound.osc[0].setPeriodicWave(waves[0]);
		sound.osc[0].frequency.value = f;
		sound.osc[1].setPeriodicWave(waves[1]);
		sound.osc[1].frequency.value = f;

		sound.osc[0].connect(this.context.destination);
		sound.osc[0].start();
		sound.osc[1].connect(this.context.destination);
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