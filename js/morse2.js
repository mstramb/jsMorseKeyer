console.log("morse2.js (characters length check) ");
     // mike

 var itw = 0 ; // intervalTimerWordProgressBar
 var itc = 0 ; // intervalTimerCharProgressBar 
 

/*
        function toggleProgBar () {
           spcProgBarEnabled = !spcProgBarEnabled;
           console.log("m4a2.html)(toggleProgBar) spcProgBarEnabled:"+spcProgBarEnabled )
        }
*/        

        // Initialize the alphabet display.
        (function( $, container, morseCode ){
            // Get the dom elements in this module.
 
            morseCode.init();  // mike

            var dom = {
                characters: container.find( "ul.characters" ),
                template: container.find( "script.template" )
            };

            // Get the the alphabet from the morse code model.
            var alphabet = morseCode.getAlphabet();

						// Loop over the alphabet to build the output.
            for (var i = 0 ; i < alphabet.length ; i++){
                // Get the current letter short-hand.
                var letter = alphabet[ i ];
                // Create a new instance of the template.
                var template = $( dom.template.html() );
                // Set the character.
                template.find( "span.character" ).text(
                    letter.character
                );
                // Set the sequence.
                template.find( "span.sequence" ).text(
                    letter.sequence
                );
                // Add the template to the output.
                dom.characters.append( template );
            }
        })( jQuery, $( "div.alphabet" ), morseCode );
        // -------------------------------------------------- //
        // -------------------------------------------------- //
        // Initialize the interpreter.


        (function( $, container, morseCode ){
            // Get the dom elements in this module.

            // jQuery..toggleProgBar
            /*
             this.toggleProgBar = function () {
              spcProgBarEnabled != spcProgBarEnabled;
              console.log("m4a2.html)(toggleProgBar) spcProgBarEnabled:"+spcProgBarEnabled )
           }
            */

            // mike
           //  var SPACETIME = 2000;
           // var SPACETIME = 2500;
            var vSPDchar  = 15;
            var vSPDword  = 15;
            var vSPDspace = 15;
            //var spcProgBarEnabled = true;  //zop


				var dom = {
                characters:         container.find( "span.characters" ),
                possibleCharacters: container.find( "span.possibleCharacters" ),
                dot:                container.find( "span.dot" ),
                dash:               container.find( "span.dash" ),
                SPDchar:            container.find( "span.SPDchar" ),
 			    SPDword:            container.find( "span.SPDword" ),
				SPDspace:           container.find( "span.SPDspace" ),
				progress1:          container.find( "progress.progress1" ),
				sptimecount:        container.find( "span.sptimecount" ),
                progTimeout:        container.find( "span.progTimeout" )
            };
            domm = dom; // mike debug

            //domm.progress1.val(100)

           

            dom.SPDchar.text(vSPDchar);  
           // dom.SPDword.text(vSPDword);  
            //dom.SPDspace.text(SPACETIME); 
			//dom.progTimeout.text(SPACETIME);  // tostring ?


            // Get the dot and dash durations (in milliseconds).
            //var dotDuration = morseCode.getDotDuration();
            //var dashDuration = morseCode.getDashDuration();
            //var pauseDuration = morseCode.getPauseDuration();

            //console.log()
          
            // Store the date/time for the keydown.
            //var keyDownDate = null; // moved to main.js for global access
            // Keep a timer for post-key resolution for characters.
            var resolveTimer = null;

            // Keep a timer for adding a new space to the message.
            var spaceTimer = null;

						// For this module, we are going to bind to any key click
            // to indicate an interaction with the interpreter. There
            // will be no other key interaction.


            // mikeProg1(dom.progress1);  // progress bar test

						////// ready to process keyboard input

            $( document ).keydown(
                function( event ){
                   //console.log("(morse2)(keydown) keyDownDate:"+keyDownDate + " keyDownLast:"+keyDownLast);
 
                     // mike
                 
                 /*           
                     $('#spaceTimedOutMsg').html('');  // clear spaceTimer message 'Space Timeout'
                     $('#wordTimeOutBar').val(0);
                     $('#charTimeOutBar').val(0);
                 */                

                    // Prevent any default action.
                    //event.preventDefault();          // mike disabled so input boxes etc still work

                    // Check to see if there is a key-down date. If
                    // so, then exit - we only want the first press
                    // event to be registered.
                    if (keyDownDate){
                        // Don't process this event.
                        //console.log('zzzzzzzzzzzzzzzzz op pppppppppppppppppppppppp');
                        keyDownLast = keyDownDate ;   // mike
                       // console.log("(morse2)(keydown) keyDownLast:"+keyDownLast);
                        return;
                    }

                    // mike
                     playnoteDn(event.keyCode,FREQDOWN)

                    // Clear the resolution timer.
                    clearTimeout( resolveTimer );

                    // Clear the space timer.
                    clearTimeout( spaceTimer );

                    // Store the date for this key-down.
                    
                    //console.log("keyDownLast:"+keyDownLast);

                    keyDownDate = new Date();
                    //console.log("(morse2.js) keyDownDate"+keyDownDate);
                   // mike1();   // test to see if 'keyDownDate' has a value
                }
            );

            $( document ).keyup(
                function( event ){
                // mike

				  var now = 0; 
                  if(spcProgBarEnabled) {
                   //timerId = setInterval(progressing(now),SPACETIME );
                   // timerWId = setInterval(wordProgressBarFun(now),SPACETIME );
                        
                      $('#wordTimedOutMsg').html(' ');
                      $('#charTimedOutMsg').html(' ');
                     //mike1("(morse2.js)keyup");   // test to see if 'keyDownDate' has a value 
                     itw =  setInterval(wordProgressBarFun(now),SPACE_TIME );
                      itc = setInterval(charProgressBarFun(now),glb_dotDuration);
                   
                  }   


                console.log("(morse) keyup  event.keyCode : " + event.keyCode + "(inputNoteLen) nll:"+nll);
  			  // mikev = event // expose event globally

                    // Prevent any default action.
                    // mike event.preventDefault();

								    // Determine the keypress duration.
                    var keyPressDuration = ((new Date())- keyDownDate);

								    // Clear the key down date so subsequent key
                    // press events can be processed.
                    keyDownDate = null;

								    // Check to see if the duration indicates a dot
                    // or a dash.

         // in main.js ... updated in morseCode.js()
         // glb_dotDuration   =  this._dotDuration;    
         // glb_dashDuration  = this._dashDuration;
         // glb_pauseDuration = this._pauseDuration;

//					if (keyPressDuration <= dotDuration){
					if (keyPressDuration <= glb_dotDuration){
                        // Push a dot.
                     morseCode.dot();

												// mike
												playnoteUp(event.keyCode,FREQDOT)  // mike
                        //console.log("--- DOT -- FREQDOT:"+ FREQDOT)
                   //     console.log("--- DOT -- keyPressDuration:"+ keyPressDuration  + " glb_dotDuration:" + glb_dotDuration );
                        dom.dash.empty();
                        dom.dot.text('.(dit)');
                      //  console.log("dom.dot.text() :" + dom.dot.text() );

                    } else {
                        // Push a dash.
                        dom.dot.empty();
                        morseCode.dash();

                       // mike
                       playnoteUp(event.keyCode,FREQDASH) // mike
                       //console.log("--- DASH -- FREQDASH:"+ FREQDASH)
                     //  console.log("--- DASH -- keyPressDuration:"+ keyPressDuration  + " glb_dashDuration:" + glb_dashDuration );
                       dom.dot.empty();
                       dom.dash.text('-(dah)');
                    }
                    // Display the possible characters for the current
                    // sequence.

                     // mike
                     dom.possibleCharacters.text(
                        morseCode.resolvePartial().join( " , " )
                     );

                    // Now that the key has been pressed, we need to
                    // wait a bit to see if we need to resolve the
                    // current sequence (if the user doesn't interact
                    // with the interpreter, we'll resolve).

                    resolveTimer = setTimeout(
                        function(){
                            // Try to resolve the sequence.
                           try {
                                // Get the character respresented by
                                // the current sequence.
                                var character = morseCode.resolveSequence();

                                // Add it to the output.
                                //console.log("dom.characters.text().length :"+dom.characters.text().length );
                                
                                $('#debug1').html(dom.characters.text().length);

                                if(dom.characters.text().length < MSGLEN)
                                 dom.characters.text(dom.characters.text() + character);
                                else {
                                    dom.characters.text('');
                                   // dom.characters.text(dom.characters.text() + "<p>");
                                  //console.log(">100 adding '<p>'");
                                  //console.log(dom.characters.text() );
                                  }
                                 //

                            }

							catch (e) {
                                // Reset the sequence - something
                                // went wrong with the user's input.
                               morseCode.resetSequence();
                            }


                            // Clear the possible matches.
                            //dom.possibleCharacters.empty();
                              dom.possibleCharacters.text(' ');
													 // mike
                            //dom.dot.empty();
                            //dom.dash.empty();

                            dom.dot.text(' ');
                            dom.dash.text(' ');
                            

					        // Set a timer to add a new space to the
                            // message.
                             /*
								 var now = 0; 
                                 if(spcProgBarEnabled) {
                                   //timerId = setInterval(progressing(now),SPACETIME );
                                    // timerWId = setInterval(wordProgressBarFun(now),SPACETIME );
                                     itw =  setInterval(wordProgressBarFun(now),SPACE_TIME );
                                     itc = setInterval(charProgressBarFun(now),glb_dotDuration);
                                }   
                              */
								spaceTimer = setTimeout(
                                function(){
                                    // Add a "space".
                                    dom.characters.text(
                                        dom.characters.text() + "__"
                                    );
                                },SPACE_TIME
                              //  3500
                            );
                        },(glb_pauseDuration) // pause between chars in real spec but adjusted for browser lag
                        //(pauseDuration * 3)
                    );
                }
            );
        })( jQuery, $( "div.output" ), morseCode );


