console.log('- main.js - v1.03');

     // mike
 var nll = 0;

        var mikev = '' ;
        var FREQDOWN = 440.0;
        var FREQUP   = 340.0;
        var FREQDOT  = 900.0;
        var FREQDASH = 300.0;
        var tcount = 0;
        var BeepFreq = 1000;
        var spcProgBarEnabled = true;  //zop
        
        var SPACE_TIME = 0;
        var DOT_DURATION = 150;  // 250
        var DASH_DURATION = 0;   // calculated from dot_duration

        var MSGLEN = 100;   // to truncate / erase the message

        var MASTERGAIN = 0.2        

   //var
// dotDuration = morseCode.getDotDuration();

   //var dashDuration = morseCode.getDashDuration();
   //var pauseDuration = morseCode.getPauseDuration();

   var glb_dotDuration =  0;
   var glb_dashDuration = 0;
   var glb_pauseDuration = 0;

   var glb_wordTimedOutVal = 0;
   var glb_charTimedOutVal = 0;

   //const
  var glb_WPM = 0;
  const WPMFACT = 1200;

  var keyDownDate = 0;  // keydown start time , global so progress functions can access
  var keyDownLast = 0;

function updateHTMLFields(){
  //console.log('updateHTMLFields glb_WPM:' + glb_WPM);
  $('#dspWpm').html(glb_WPM);

 
// $('#curCharTime').val(glb_dotDuration);
$('#curCharTime').text(glb_dotDuration);

$('#freqInput').val(BeepFreq);
//$('#dotTimeInput').val(DOT_DURATION);

$('#curDotTime').val(glb_dotDuration);

var gsval = $('#gainSlider').val();
console.log('updateHTMLFields gsval:' + gsval);

$('#curGainSlider').text(gsval);
  
console.log('updateHTMLFields gsval:' + gsval + "curGainSlider.val()" + $('#curGainSlider').val() );
}
  function toggleSpcProgBar() {
           console.log('(main.js)(toggleSpcProgBar)');
           spcProgBarEnabled = !spcProgBarEnabled;
        }

$(document).ready(function() {
//   console.log('(jquery ready');
  $('#foo').bind('click', function(event) {   // '#' is id
    alert('The mouse cursor is at ('
      + event.pageX + ', ' + event.pageY + ')');
  });

  $('#dotTimeInput').val(DOT_DURATION);

  $('#freqInput').bind('input',inputFreqHandler);
  $('#dotTimeInput').bind('input',inputDotTimeHandler);

  $('#noteInput').bind('input',inputNoteHandler);

  $('#volumeInput').bind('input',inputVolumeHandler);
  
  $('#gainSlider').bind('input',inputVolumeSliderHandler);


  $('#curDotTime').html(DOT_DURATION);
  $('#curDashTime').html(DASH_DURATION);
  $('#curSpaceTime').html(SPACE_TIME);

 updateHTMLFields();

}); 

function inputVolumeSliderHandler(){
  var newGain = document.getElementById('gainSlider').value;
 console.log('(inputVolumeSliderHandler) newGain:' + newGain);
  setGain(newGain);
  updateHTMLFields();
}
function inputVolumeHandler () {
 console.log('(inputVolumeHandler)')
  var newGain = document.getElementById('volumeInput').value;
  setGain(newGain);
}

function inputNoteHandler () {
 // data = $('#noteInput').val(); 
 var noteInput = $('#noteInput').val().toUpperCase(); 
   // data = document.getElementById('freqInput').value;

nll = noteInput.length;
console.log('(inputNoteHandler) noteInput:'+ noteInput + ' BeepFreq: ' + BeepFreq + ' noteInput.length'+ noteInput.length);
if(noteInput.length === 2){
 BeepFreq = noteTab[noteInput];
 updateHTMLFields();
}  
else
  console.log("inputNoteHandler -- input not 2 chars"); 

// sole.log('(inputNoteHandler) noteInput:'+ noteInput + " BeepFreq:" + BeepFreq);

 //$('#curBeepFreq ').html(BeepFreq);
  //var t = BeepFreq + 300.25;

}

function inputFreqHandler () {
 console.log('(inputFreqHandler)')
  data = document.getElementById('freqInput').value;
  //BeepFreq = parseInt(data);
BeepFreq = parseFloat(data);

 $('#curBeepFreq ').html(BeepFreq);
  var t = BeepFreq + 300.25;
  console.log('BeepFreq :' +  BeepFreq + ' BeepFreq + 300 :' + t);
}

function inputDotTimeHandler () {
 //console.log('(inputDotTimeHandler)')
  data = document.getElementById('dotTimeInput').value;
  //DOT_DURATION = parseInt(data);
  var newDotDuration = parseInt(data);
 
//$('#curDotTime').html(DOT_DURATION);

$('#curDotTime').html(newDotDuration);

  var t = DOT_DURATION + 300;
  // console.log('DOT_DURATION :' +  DOT_DURATION + ' DOT_DURATION + 300 :' + t);

  morseCode.upDateDurations(newDotDuration);

   var glb_dotDuration =  0;
   var glb_dashDuration = 0;
   var glb_pauseDuration = 0;

/*
 $('#curDotTime').html(DOT_DURATION);
 $('#curDashTime').html(DASH_DURATION);
 $('#curSpaceTime').html(SPACE_TIME);
*/

 $('#curDotTime').html(glb_dotDuration);
 $('#curDashTime').html(glb_dashDuration);
 $('#curSpaceTime').html(SPACE_TIME);

var cstm = $('#curSpaceTime').html();
// console.log('inputDotTimeHandler cstm:'+ cstm + ' SPACE_TIME:' + SPACE_TIME);

}



