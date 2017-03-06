(function()
{

var mySynth = null;

var init = function()
{
    mySynth = new Synth();
};

document.addEventListener("DOMContentLoaded", function(event)
{
    init();
});

document.addEventListener("keydown", function(event)
{
    var charCode = event.keyCode || event.which;
    var charStr = String.fromCharCode(charCode);
    var freq = mySynth.keyboard(charStr);

    if(freq != 0)
        mySynth.playSound(freq);
});

document.addEventListener("keyup", function(event)
{
    var charCode = event.keyCode || event.which;
    var charStr = String.fromCharCode(charCode);
    var freq = mySynth.keyboard(charStr);

    if(freq != 0)
        mySynth.stopSound(freq);
});

})();