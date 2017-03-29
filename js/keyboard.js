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

  $('.key, .black-key').on(
    'mousedown',
    function() {
      var charCode = keyIdToCharCode(this.id);
      if (charCode !== 0) {
        var freq = mySynth.keyboard(charCode);
        if (freq != 0) {
          $('.oscillator').addClass('disable');
          $('.effects').addClass('disable');
          $('.key-knobs').addClass('disable');
          heldKeys[charCode + 500] = true;
          activateKey(charCode);
          mySynth.playSound(freq);
        }
      }
    }
  );

  $('.key, .black-key').on(
    'mouseup mouseleave',
    function(e) {
      var charCode = keyIdToCharCode(this.id);
      if (charCode !== 0) {
        delete heldKeys[charCode + 500];
        if (heldKeys[charCode] === undefined && heldKeys[charCode + 500] === undefined) {
          deactivateKey(charCode);
          var freq = mySynth.keyboard(charCode);
          mySynth.stopSound(freq);
          if (Object.keys(heldKeys).length === 0) {
            $('.oscillator').removeClass('disable');
            $('.effects').removeClass('disable');
            $('.key-knobs').removeClass('disable');
          }
        }
      }
    }
  );
}

var keyIdToCharCode = function(keyId) {
  switch(keyId) {
    case 'c-key1':
      return 49;
    case 'db-key1':
      return 50;
    case 'd-key1':
      return 51;
    case 'eb-key1':
      return 52;
    case 'e-key1':
      return 53;
    case 'f-key1':
      return 54;
    case 'gb-key1':
      return 55;
    case 'g-key1':
      return 56;
    case 'ab-key1':
      return 57;
    case 'a-key1':
      return 48;
    case 'bb-key1':
      return 189;
    case 'b-key1':
      return 187;
    case 'c-key2':
      return 81;
    case 'db-key2':
      return 87;
    case 'd-key2':
      return 69;
    case 'eb-key2':
      return 82;
    case 'e-key2':
      return 84;
    case 'f-key2':
      return 89;
    case 'gb-key2':
      return 85;
    case 'g-key2':
      return 73;
    case 'ab-key2':
      return 79;
    case 'a-key2':
      return 80;
    case 'bb-key2':
      return 219;
    case 'b-key2':
      return 221;
    default:
      return 0;
  }
}

var charCodeToKeyId = function(charCode) {
  switch(charCode) {
    case 49: // Key 1
      return 'c-key1';
    case 50: // Key 2
      return 'db-key1';
    case 51: // Key 3
      return 'd-key1';
    case 52: // Key 4
      return 'eb-key1';
    case 53: // Key 5
      return 'e-key1';
    case 54: // Key 6
      return 'f-key1';
    case 55: // Key 7
      return 'gb-key1';
    case 56: // Key 8
      return 'g-key1';
    case 57: // Key 9
      return 'ab-key1';
    case 48: // Key 0
      return 'a-key1';
    case 189: // Key -
      return 'bb-key1';
    case 187: // Key =
      return 'b-key1';
    case 81: // Key Q
      return 'c-key2';
    case 87: // Key W
      return 'db-key2';
    case 69: // Key E
      return 'd-key2';
    case 82: // Key R
      return 'eb-key2';
    case 84: // Key T
      return 'e-key2';
    case 89: // Key Y
      return 'f-key2';
    case 85: // Key U
      return 'gb-key2';
    case 73: // Key I
      return 'g-key2';
    case 79: // Key O
      return 'ab-key2';
    case 80: // Key P
      return 'a-key2';
    case 219: // Key [
      return 'bb-key2';
    case 221: // Key ]
      return 'b-key2';
    default:
      return '';
  }
}

var activateKey = function(charCode) {
  var keyId = charCodeToKeyId(charCode);
  if (keyId !== '') {
    $('#' + keyId).addClass('activate');
  }
}

var deactivateKey = function(charCode) {
  var keyId = charCodeToKeyId(charCode);
  if (keyId !== '') {
    $('#' + keyId).removeClass('activate');
  }
}
