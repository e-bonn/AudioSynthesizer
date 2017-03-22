function Filter(filterParms)
{
    this.init(filterParms);
}

Filter.prototype.init = function(filterParms)
{
    this.enabled = filterParms.enabled;
    this.type = filterParms.type;
    this.cutoffFreq = filterParms.cutoffFreq;
    this.Q = filterParms.Q;

    this.filter = null;
    this.parm = null;
}

Filter.prototype.connect = function(parm, context)
{
    this.parm = parm;
    this.filter = context.createBiquadFilter();
}

Filter.prototype.start = function()
{
    this.filter.type = this.type;
    this.filter.frequency.value = this.cutoffFreq;
    this.filter.Q = this.Q;

    this.filter.connect(this.parm);
}
