// console.log("(mike-morse-webAudio.js)" )
window.AudioContext = window.AudioContext || window.webkitAudioContext;

  // var freq = new Uint8Array(36);
  
  var context = new AudioContext();

 var masterGain = 0;

 function setGain(gain){
   console.log("(setGain) gain"+gain );
   masterGain.gain.value = gain;   // 0.5
  }

// setFreq(BeepFreq);

            masterGain = context.createGain();
            nodes = [];

//            masterGain.gain.value = 0.3;
       //     masterGain.gain.value = 0.3;   // 0.5
  //   masterGain.gain.value = MASTERGAIN;   // 0.5

       setGain(MASTERGAIN);

            masterGain.connect(context.destination);

     //     playnoteUp(event.keyCode)
     //     playnoteDn(event.keyCode)


     var oscillator = '';
     //var BeepFreq = 1000;          
            playnoteDn = function (key, frequency) {
            //console.log("(mike-morse1.js)(playnoteDn) key:" + key + " frequency" + freq )
          //console.log("(mike-morse1.js)(playnoteDn) frequency" + freq )
           //console.log("(mike-morse1.js)(playnoteDn) key:" + key)

                oscillator = context.createOscillator();

                // oscillator.type = 'square';
                oscillator.type = 'sine';

               // oscillator.frequency.value = frequency;

                oscillator.frequency.value = BeepFreq;  // BeepFreq in main.js
                oscillator.connect(masterGain);
                oscillator.start(0);

                nodes.push(oscillator);
            };

						// mike
            playnoteUp = function (note, frequency) {
						    //console.log("(mike-morse1.js)(playnoteUp) note:"+note + " frequency:" + frequency);
						    oscillator.stop();
					     }

            playnoteUp2 = function (note, frequency) {
            //console.log("(mike-morse1.js)(keyboard.keyUp) note:" + note + " frequency" + frequency )
                var new_nodes = [];

                for (var i = 0; i < nodes.length; i++) {
                    if (Math.round(nodes[i].frequency.value) === Math.round(frequency)) {
                        nodes[i].stop(0);
                        nodes[i].disconnect();
                    } else {
                        new_nodes.push(nodes[i]);
                    }
                }

                nodes = new_nodes;
            };
