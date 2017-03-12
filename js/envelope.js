// Envelope class is an ADSR Envelope
function Envelope(envelopeParms)
{
    this.init(envelopeParms);
}

Envelope.prototype.init = function(envelopeParms)
{
    this.attack = envelopeParms.attack;
    this.decay = envelopeParms.decay;
    this.sustain = envelopeParms.sustain;
    this.release = envelopeParms.release;

    this.parm = null;
}

// This connects the envelope to an AudioNode [parm] in the Web Audio API network
Envelope.prototype.connect = function(parm)
{
    this.parm = parm;
}

Envelope.prototype.rampUp = function(volume, context)
{
    if(this.parm !== null)
    {
        this.parm.setValueAtTime(0, context.currentTime);
        this.parm.linearRampToValueAtTime(volume, context.currentTime + this.attack);
        this.parm.linearRampToValueAtTime(this.sustain, context.currentTime + this.attack + this.decay);
    }
}

Envelope.prototype.rampDown = function(context)
{
    if(this.parm !== null)
    {
        this.parm.cancelScheduledValues(context.currentTime);
        this.parm.linearRampToValueAtTime(0, context.currentTime + this.release);
    }
}