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
    // Main octave C4 - C5
    mySynth.playSound(mySynth.keyboard(charStr));
});

document.addEventListener("keyup", function(event)
{
    var charCode = event.keyCode || event.which;
    var charStr = String.fromCharCode(charCode);
    // Main octave C4 - C5
    mySynth.stopSound(mySynth.keyboard(charStr));
});

})();