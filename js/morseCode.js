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

            glb_wordTimedOutVal = this._dotDuration * 7; 
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
                "-": "t",
                ".": "e",

                ".-": "a",
                "-.": "n",
                "..": "i",
                "--": "m",

                "...": "s",
                "..-": "u",
                ".-.": "r",
                ".--": "w",
                "-..": "d",
                "-.-": "k",
                "--.": "g",
                "---": "o",

                "....": "h",     // 0
                "...-": "v",     // 1
                "..-.": "f",     // 2
                "..--": "!IM",   // 3  
                ".-..": "l",     // 4 
                ".-.-": "#AA",   // 5
                ".--.": "p",     // 6
                ".---": "j",     // 7
                "-...": "b",     // 8
                "-..-": "x",     // 9
                "-.-.": "c",     // 10
                "-.--": "y",     // 11
                "--..": "z",     // 12
                "--.-": "q",     // 13
                "---.": "!OE",   // 14
                "----": "!MM",   // 15   F+

                // --- 5 ----
                ".....":    "5",    // 0
                "....-":    "4",    // 1         
                "...-.":    "#VE",  // 2 VE ----- Understood (VE)                                
                "...--":    "3",    // 3
                "..-..":    "#ID",  // 4
                "...-.-":   "!SK",  // 5 
                "...--.":   "!SG",  // 6
                "..---":    "2",    // 7
				".-...":    "#AS",  // 08 AS ----- Stand by
				".-..-":    "!RA",  // 09 invalid !KA
				".-.-.":    "#AR",	// 10 AR ----- End of message
                ".-.--":    "!AW",	// 11 invalid AW
				".--..":    "!WI",	// 12 invalid WI
				".--.-":    "!WA",	// 13 invalid WA
				".---.":    "!JE",	// 14 invalid JE
                ".----":    "1",    // 15
                "-....":    "6",    // 16
                "-...-":    "#BT",  // 17 BT ----- Pause; Break For Text
                  // invalid 18-20
				"-..-.":    "!NR",	// 18 
				"-..--":    "!NW",	// 19 
				"-.-..":    "!ND",	// 20 
                "-.-.-":    "#KA",  // 21 KA ----- Beginning of message
                "-.--.":    "#KN",  // 22 KN ----- end of transmission
                "-.---":    "!NO",	// 23 
                "--...":    "7",	// 24 
                  // invalid 25-27
                "--..-":    "!GA",	// 25
                "--.-.":    "!GN",	// 26
                "--.--":    "!GM",	// 27
                "---..":    "8",    // 28
                "---.-":    "!OA",  // 29
                "----.":    "9",    // 30
                "-----":    "0",    // 31
				
                // 6's
                "..--..":   "?",    // IMI
                ".-.-.-":   ".",    // AAA
                "--..--":   ",",    // GW
                "-...-":    "=",    // BT
                ".-.-.":    "+",    // AR
                "-....-":   "-",    // THT
                "-.-.-":    ";",    // NK
                "-..-.":    "/",    // DN
                "---...":   ":",    // OS
				"...-.-":   "#SK",   //SK ----- End of contact (sent before call)

                "-...-.-":  "#BK",  //BK ----- Invite receiving station to transmit

                // ---- 8 ----
                "........": "#HH",   // 00 error      
                "-.-..-..": "#CL",  //    CL ----- Going off the air (clear)
				"-.-.--.-": "#CQ"  //    CQ ----- Calling any amateur radio station

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
                this.lastSequence = this._sequence; // mike
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
                this.lastSequence = "";
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

            // zop          

             this.InvalidSequence = function(seq){
              //console.log("(morseCode.js)(InvalidSequence) seq:"+seq);
              return("!");
              }

             this.resolveSequence = function(){
                // Check to see if the current sequence is valid.
                if (!this._patternMap.hasOwnProperty( this._sequence )){
                    // The sequence cannot be matched.
                //    throw( new Error( "InvalidSequence" ) );
                 //throw( new this.InvalidSequence(this._sequence)); // mike
                //throw(this.InvalidSequence(this._sequence)); // mike
                this._sequence = "";
                return('!'); // mike
                }
               // console.log("(morseCode.js)(this.resolveSequence) (after throw(this.InvalidSequence");
                // Get the alpha-numeric mapping.
                // console.log("(morseCode.js) this._sequence:"+ this._sequence);
                var character = this._patternMap[ this._sequence ];
                // mike
                //console.log("(morseCode.js)(this.resolveSequence) character:"+character);

                /*
                 if(character=="F+") {
                // console.log("(old) BeepFreq:" + BeepFreq);
                // BeepFreq +=100;
                 // console.log("(new)BeepFreq:" + BeepFreq);
                // updateHTMLFields();
                 }

                if(character=="F-") {
                 //console.log("(old) BeepFreq:" + BeepFreq);
                 // BeepFreq -=100;
                 // console.log("(new)BeepFreq:" + BeepFreq);
                //  updateHTMLFields();
                }
                */

                // Reset the sequence.
                //this.lastSequence = this._sequence;
                this._sequence = "";
                // Return the mapped character.
                return( character );
            };
            // ---------------------------------------------- //
            // ---------------------------------------------- //
            // Return this object reference.
            return( this );
        }).call( {} );

