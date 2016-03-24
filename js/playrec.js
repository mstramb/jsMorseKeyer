console.log("(playrec.js)");

var noteval = [130.81,138.59,146.83,155.56,164.81,174.61,185.00,196.0,207.65,220.0,233.08,246.94,261.63] ;
        var noteNam = ['C3',  'C3#', 'D3',  'D3#', 'E3',  'F3', 'F3#', 'G3','G3#','A3','A3#','B3','C4'];

        var noteTab = {'C3':130.81,
					   'C3#':138.59,
                       'D3':146.83,
                       'D3#':155.56,
				       'E3':164.81,
                       'F3':174.61,
                       'F3#':185.00,
                       'G3':196.0,
                       'G3#':207.65,
                       'A3':220.0,
                       'A3#':233.08,
                       'B3':246.94,
                       'C4':261.63
                      };

        var charNoteTab = {'C'  : 'C3',
					       'C#' : 'C3#',
                           'D'  : 'D3',
                           'D#' : 'D3#',
				           'E'  : 'E3',
                           'F'  : 'F3',
                           'F#' : 'F3#',
                           'G'  : 'G3',
                           'G#' : 'G3#',
                           'A'  : 'A3',
                           'A#' : 'A#',
                           'B'  : 'B3',
                           'C4' : 'C4'
                          };

var recording = false
            playing   = false;
             
        var recordArray = {};

          
var NoteEvent = function () {
  this.noteFreq = 0;
  this.charName = '';
}

//<button  id="butRecStart" 
function recStart(){
 if(recording) {
   console.log("(playrec.js)(recStart) already recording:"+recording);
   return false;
  }
 else 
  recording = true;
}

// button id="butRecStop
function recStop(){
 if(!recording) {
   console.log("(playrec.js)(recStart) not recording:"+recording);
   return false;
  }
  else
   recording = false;
}

// <button  id="butPlayStart"
function playStart(){
 if(playing) {
   console.log("(playrec.js)(playStart) already playing:"+playing);
   return false;
  }
  else
   playing = true;
}

// button  id="butPlayStop" style="width:50px;height:50px"  onclick="playStop()">P-Stop</button>
function playStop(){
 if(!playing) {
   console.log("(playrec.js)(playStop) not playing"+playing);
   return false;
  }
  else
   playing = false;
}


 
