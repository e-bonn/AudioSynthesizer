function LFO(lfoParms)
{
    this.init(lfoParms);
}

LFO.prototype.init = function(lfoParms)
{
    this.freq = lfoParms.freq;
    this.type = lfoParms.type;

    this.osc = null;
    this.parm = null;
}

// This connects the lfo to an AudioNode [parm] in the Web Audio API network
LFO.prototype.connect = function(parm)
{
    this.parm = parm;
}

LFO.prototype.start = function(context)
{
    this.osc = context.createOscillator();

    this.osc.frequency.value = this.freq;
    this.osc.type = this.type;
    this.osc.connect(this.parm);
    this.osc.start();
}

LFO.prototype.stop = function()
{
    this.osc.stop();
}
