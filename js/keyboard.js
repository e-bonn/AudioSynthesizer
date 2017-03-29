var initKeyboard = function(mySynth) {
  $('#key1-knob').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setOctave(0, Math.round(v)); }
    }
  );

  $('#key2-knob').trigger(
    'configure',
    {
      'change' : function(v) { mySynth.setOctave(1, Math.round(v)); }
    }
  );

  $('#c-key1').on(
    'click',
    function() {

    }
  );
}

var activateKey = function(charCode) {
  switch(charCode) {
    case 49: // Key 1
      $("#c-key1").addClass('activate');
      break;
    case 50: // Key 2
      $("#db-key1").addClass('activate');
      break;
    case 51: // Key 3
      $("#d-key1").addClass('activate');
      break;
    case 52: // Key 4
      $("#eb-key1").addClass('activate');
      break;
    case 53: // Key 5
      $("#e-key1").addClass('activate');
      break;
    case 54: // Key 6
      $("#f-key1").addClass('activate');
      break;
    case 55: // Key 7
      $("#gb-key1").addClass('activate');
      break;
    case 56: // Key 8
      $("#g-key1").addClass('activate');
      break;
    case 57: // Key 9
      $("#ab-key1").addClass('activate');
      break;
    case 48: // Key 0
      $("#a-key1").addClass('activate');
      break;
    case 189: // Key -
      $("#bb-key1").addClass('activate');
      break;
    case 187: // Key =
      $("#b-key1").addClass('activate');
      break;
    case 81: // Key Q
      $("#c-key2").addClass('activate');
      break;
    case 87: // Key W
      $("#db-key2").addClass('activate');
      break;
    case 69: // Key E
      $("#d-key2").addClass('activate');
      break;
    case 82: // Key R
      $("#eb-key2").addClass('activate');
      break;
    case 84: // Key T
      $("#e-key2").addClass('activate');
      break;
    case 89: // Key Y
      $("#f-key2").addClass('activate');
      break;
    case 85: // Key U
      $("#gb-key2").addClass('activate');
      break;
    case 73: // Key I
      $("#g-key2").addClass('activate');
      break;
    case 79: // Key O
      $("#ab-key2").addClass('activate');
      break;
    case 80: // Key P
      $("#a-key2").addClass('activate');
      break;
    case 219: // Key [
      $("#bb-key2").addClass('activate');
      break;
    case 221: // Key ]
      $("#b-key2").addClass('activate');
      break;
  }
}

var deactivateKey = function(charCode) {
  switch(charCode) {
    case 49: // Key 1
      $("#c-key1").removeClass('activate');
      break;
    case 50: // Key 2
      $("#db-key1").removeClass('activate');
      break;
    case 51: // Key 3
      $("#d-key1").removeClass('activate');
      break;
    case 52: // Key 4
      $("#eb-key1").removeClass('activate');
      break;
    case 53: // Key 5
      $("#e-key1").removeClass('activate');
      break;
    case 54: // Key 6
      $("#f-key1").removeClass('activate');
      break;
    case 55: // Key 7
      $("#gb-key1").removeClass('activate');
      break;
    case 56: // Key 8
      $("#g-key1").removeClass('activate');
      break;
    case 57: // Key 9
      $("#ab-key1").removeClass('activate');
      break;
    case 48: // Key 0
      $("#a-key1").removeClass('activate');
      break;
    case 189: // Key -
      $("#bb-key1").removeClass('activate');
      break;
    case 187: // Key =
      $("#b-key1").removeClass('activate');
      break;
    case 81: // Key Q
      $("#c-key2").removeClass('activate');
      break;
    case 87: // Key W
      $("#db-key2").removeClass('activate');
      break;
    case 69: // Key E
      $("#d-key2").removeClass('activate');
      break;
    case 82: // Key R
      $("#eb-key2").removeClass('activate');
      break;
    case 84: // Key T
      $("#e-key2").removeClass('activate');
      break;
    case 89: // Key Y
      $("#f-key2").removeClass('activate');
      break;
    case 85: // Key U
      $("#gb-key2").removeClass('activate');
      break;
    case 73: // Key I
      $("#g-key2").removeClass('activate');
      break;
    case 79: // Key O
      $("#ab-key2").removeClass('activate');
      break;
    case 80: // Key P
      $("#a-key2").removeClass('activate');
      break;
    case 219: // Key [
      $("#bb-key2").removeClass('activate');
      break;
    case 221: // Key ]
      $("#b-key2").removeClass('activate');
      break;
  }
}
