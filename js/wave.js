function Wave(type)
{
    this.init(type);
}

Wave.prototype.init = function(type)
{
    this.real = [];
    this.im = [];

    this.setWaveformTo(type);
}

Wave.prototype.setWaveformTo = function(type)
{
    this.real = new Float32Array(4096);
    this.im = new Float32Array(4096);

    if(type == "sine")
    {
        this.im[1] = 1.0;
    }
        else if (type == "square")
    {
        for(var k = 1; k < this.im.length; k += 2)
        {
            this.im[k] = 4.0/(Math.PI*k);
        }
    }
    else if (type == "triangle")
    {
        for(var k = 1; k < this.im.length; k += 2)
        {
            this.im[k] = (8.0*Math.pow(-1,(k-1)/2))/(Math.pow(Math.PI,2)*Math.pow(k,2));
        }
    }
    else if (type == "sawtooth")
    {
        for(var k = 1; k < this.im.length; k++)
        {
            this.im[k] = (2.0*Math.pow(-1,k))/(Math.PI*k);
        }
    }
}