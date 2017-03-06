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
    mySynth.playSound(233);
});

document.addEventListener("keyup", function(event)
{
    mySynth.stopSound(233);
});

})();