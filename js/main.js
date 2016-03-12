// console.log("- main.js -")
     // mike
        var mikev = '' ;
        var FREQDOWN = 440.0;
        var FREQUP   = 340.0;
        var FREQDOT  = 900.0;
        var FREQDASH = 300.0;
        var tcount = 0;
        var BeepFreq = 1000;
        var spcProgBarEnabled = true;  //zop
        
        var SPACE_TIME = 0;
        var DOT_DURATION = 200;
        var DASH_DURATION = 0;   // calculated from dot_duration

   //var dotDuration = morseCode.getDotDuration();
   //var dashDuration = morseCode.getDashDuration();
   //var pauseDuration = morseCode.getPauseDuration();

   var glb_dotDuration =  0;
   var glb_dashDuration = 0;
   var glb_pauseDuration = 0;

   //const
  var glb_WPM = 0;
  const WPMFACT = 1200;

function updateHTMLFields(){
  console.log("updateHTMLFields glb_WPM:" + glb_WPM);
  $('#dspWpm').html(glb_WPM);
}
  function toggleSpcProgBar() {
           console.log("(main.js)(toggleSpcProgBar)");
           spcProgBarEnabled = !spcProgBarEnabled;
        }

$(document).ready(function() {
//   console.log("(jquery ready");

  $('#foo').bind('click', function(event) {   // '#' is id
    alert('The mouse cursor is at ('
      + event.pageX + ', ' + event.pageY + ')');
  });

  $('#freqInput').bind('input',inputFreqHandler);

  $('#dotTimeInput').bind('input',inputDotTimeHandler);

  $('#curDotTime').html(DOT_DURATION);
  $('#curDashTime').html(DASH_DURATION);
  $('#curSpaceTime').html(SPACE_TIME);

}); 

function inputFreqHandler () {
 console.log("(inputFreqHandler)")
  data = document.getElementById('freqInput').value;
  BeepFreq = parseInt(data);
 $('#curBeepFreq ').html(BeepFreq);
  var t = BeepFreq + 300;
  console.log("BeepFreq :" +  BeepFreq + " BeepFreq + 300 :" + t);
}

function inputDotTimeHandler () {
 console.log("(inputDotTimeHandler)")
  data = document.getElementById('dotTimeInput').value;
  //DOT_DURATION = parseInt(data);
  var newDotDuration = parseInt(data);
 
//$('#curDotTime').html(DOT_DURATION);

$('#curDotTime').html(newDotDuration);

  var t = DOT_DURATION + 300;
  console.log("DOT_DURATION :" +  DOT_DURATION + " DOT_DURATION + 300 :" + t);

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
console.log("inputDotTimeHandler cstm:"+ cstm + " SPACE_TIME:" + SPACE_TIME);

}



