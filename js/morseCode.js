// console.log("morseCode.js");
        // Create a model for the Morse Code interpreter.

// mike
var domm = '' ;

    var morseCode = (function(){
        //var morseCode = (function(dotDurationParm){
          this.init = function() {    // mike
            this.upDateDurations(DOT_DURATION);
            this.initData();
      //      console.log("(morseCode.js)(morseCode)(this.init) DOT_DURATION: " + DOT_DURATION + " SPACE_TIME:"+ SPACE_TIME);
         //   updateHTMLFields();
           };

           this.upDateDurations = function(dotTime) {    // mike

             this._dotDuration = dotTime;  // 

             // this.spaceTime = this._dotDuration * 7;
             SPACE_TIME = this._dotDuration * 7;
            // console.log("(morseCode.js)(morseCode)(upDateDurations) dotTime: " + dotTime + " SPACE_TIME:"+ SPACE_TIME);
            // Define the duration of the dot in milliseconds.
            
				    // Define the duration of the dash in milliseconds. The
            // dash is supposed to be 3x that of the dot.
            this._dashDuration = (this._dotDuration * 3);
        
				    // Define the pause duration. This is the time between
            // letters and is supposed to be 1x that of the dot.
            // ** mike ... supposed to be 3
            //  this._pauseDuration = (this._dotDuration * 1);
            this._pauseDuration = (this._dotDuration * 3);

            glb_dotDuration   =  this._dotDuration;
            glb_dashDuration  = this._dashDuration;
            glb_pauseDuration = this._pauseDuration;
            glb_WPM = WPMFACT / glb_dotDuration ;

            updateHTMLFields();
        };
          


          this.initData = function(){ 
            //console.log("this.initData()");
				    // Define the pattern map for the morse code patterns
            // as the relate the alpha-numeric characters that they
            // represent.
            this._patternMap = {
                ".-": "a",
                "-...": "b",
                "-.-.": "c",
                "-..": "d",
                ".": "e",
                "..-.": "f",
                "--.": "g",
                "....": "h",
                "..": "i",
                ".---": "j",
                "-.-": "k",
                ".-..": "l",
                "--": "m",
                "-.": "n",
                "---": "o",
                ".--.": "p",
                "--.-": "q",
                ".-.": "r",
                "...": "s",
                "-": "t",
                "..-": "u",
                "...-": "v",
                ".--": "w",
                "-..-": "x",
                "-.--": "y",
                "--..": "z",
                "-----": "0",
                ".----": "1",
                "..---": "2",
                "...--": "3",
                "....-": "4",
                ".....": "5",
                "-....": "6",
                "--...": "7",
                "---..": "8",
                "----.": "9",
                "...-.-": "#SK",
                "..--..":  "?",
				".-.-.":    "#AR",	  //AR ----- End of message
				".-...":    "#AS",   //AS ----- Stand by
				"-...-.-":  "#BK",  //BK ----- Invite receiving station to transmit
                "-...-":    "#BT",  //BT ----- Pause; Break For Text
                "-.-.-":    "#KA",  //KA ----- Beginning of message
                "-.--.":    "#KN",  //KN ----- end of transmission
                "-.-..-..": "#CL",  //CL ----- Going off the air (clear)
				"-.-.--.-": "#CQ",  //CQ ----- Calling any amateur radio station
				"-.--.":   "#KN",	//KN ----- Go only, invite a specific station to transmit
				"...-.-":  "#SK",  //SK ----- End of contact (sent before call)
				"...-.":    "#VE",   //VE ----- Understood (VE)
                "........": "#HH",    // error      
                "----": "F+",   // mike 
                "..--": "F-"    // mike
            };
            //  the current, transient sequence being evaluated.
            this._sequence = "";
            //  add the given value to the current sequence.
            // Throws InvalidTone if not a dot or dash.
          }; // initData
   
             //console.log("(morseCode.js)(morseCode 'body') this._dotDuration :" + this._dotDuration);

          this.addSequence = function( value ){
                // Check to make sure the value is valid.
                if ((value !== ".") && (value !== "-") ){
                    // Invalid value.
                    throw( new Error( "InvalidTone" ) );
                }
                // Add the given value to the end of the current
                // sequence value.
                this._sequence += value;
                // Return this object reference.
                return( this );
            };
            //  add a dash to the current sequence.
            this.dash = function(){
                // Reroute to the addSequence();
                return( this.addSequence( "-" ) );
            };
            //  add a dot to the current sequence.
            this.dot = function(){
                // Reroute to the addSequence();
                return( this.addSequence( "." ) );
            };
            //  get the alpha-numeric character set as an array of
            // sequence-character pairs.

            this.getAlphabet = function(){
                // Create the empty set.
                var characterSet = [];
                // Loop over the patterns to map them to a character
                // set item.
                for (var pattern in this._patternMap){
                    // Push it onto the set.
                    characterSet.push({
                        sequence: pattern,
                        character: this._patternMap[ pattern ]
                    });
                }
                // Sort the character set alphabetically.
                characterSet.sort(
                    function( a, b ){
                        return( a.character <= b.character ? -1 : 1 );
                    }
                );
                // Return the character set.
                return( characterSet );
            };
            //  get the dash duration.
            this.getDashDuration = function(){
                return( this._dashDuration );
            };
            //  get the dot duration.
            this.getDotDuration = function(){
                return( this._dotDuration );
            };
            //  get the pause duration.
            this.getPauseDuration = function(){
                return( this._pauseDuration );
            };
            //  reset the current sequence.
            this.resetSequence = function(){
                // Clear the sequence.
                this._sequence = "";
            };
            //  get the possible character matches based on the
            // current sequence.

            this.resolvePartial = function(){
                // Create an array to hold our possible characters.
                var potentialCharacters = [];
                // Loop over the pattern match to find partial matches.
                for (var pattern in this._patternMap){
                    // Check to see if the current sequence can be
                    // the start of the given pattern.
                    if (pattern.indexOf( this._sequence ) === 0){
                        // Add this character to the list.
                        potentialCharacters.push(this._patternMap[ pattern ]);
                    }
                }
                // Return the potential character matches.
                return( potentialCharacters.sort() );
            };

            //  get the alpha-numeric charater repsented by the
            // current sequence.  also also reset the internal
            // sequence value.
            //
            // Throws InvalidSequence if it cannot be mapped to a
            // valid alpha-numeric character.
            
             this.resolveSequence = function(){
                // Check to see if the current sequence is valid.
                if (!this._patternMap.hasOwnProperty( this._sequence )){
                    // The sequence cannot be matched.
                    throw( new Error( "InvalidSequence" ) );
                }
                // Get the alpha-numeric mapping.
                var character = this._patternMap[ this._sequence ];
                // mike
                console.log("character:"+character);

                if(character=="F+") {
                // console.log("(old) BeepFreq:" + BeepFreq);
                //  BeepFreq +=100;
                 // console.log("(new)BeepFreq:" + BeepFreq);
                 updateHTMLFields();
                 }

                if(character=="F-") {
                 //console.log("(old) BeepFreq:" + BeepFreq);
                 // BeepFreq -=100;
                 // console.log("(new)BeepFreq:" + BeepFreq);
                  updateHTMLFields();
                }

                // Reset the sequence.
                this._sequence = "";
                // Return the mapped character.
                return( character );
            };
            // ---------------------------------------------- //
            // ---------------------------------------------- //
            // Return this object reference.
            return( this );
        }).call( {} );

