
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
             var SPACETIME = 2000;
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
            dom.SPDword.text(vSPDword);  
            dom.SPDspace.text(SPACETIME); 
			dom.progTimeout.text(SPACETIME);  // tostring ?


            // Get the dot and dash durations (in milliseconds).
            var dotDuration = morseCode.getDotDuration();
            var dashDuration = morseCode.getDashDuration();
            var pauseDuration = morseCode.getPauseDuration();

            // Store the date/time for the keydown.
            var keyDownDate = null;
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
                    // Prevent any default action.
                    event.preventDefault();

                    // Check to see if there is a key-down date. If
                    // so, then exit - we only want the first press
                    // event to be registered.
                    if (keyDownDate){
                        // Don't process this event.
                        return;
                    }

                    // mike
                     playnoteDn(event.keyCode,FREQDOWN)

                    // Clear the resolution timer.
                    clearTimeout( resolveTimer );

                    // Clear the space timer.
                    clearTimeout( spaceTimer );

                    // Store the date for this key-down.
                    keyDownDate = new Date();
                }
            );

            $( document ).keyup(
                function( event ){
                // mike

                //console.log("(morse) keyup  event.keyCode : " + event.keyCode)


								mikev = event // expose event globally

                    // Prevent any default action.
                    event.preventDefault();

								    // Determine the keypress duration.
                    var keyPressDuration = ((new Date())- keyDownDate);

								    // Clear the key down date so subsequent key
                    // press events can be processed.
                    keyDownDate = null;

								    // Check to see if the duration indicates a dot
                    // or a dash.

										if (keyPressDuration <= dotDuration){
                        // Push a dot.
                        morseCode.dot();

												// mike
												playnoteUp(event.keyCode,FREQDOT)  // mike
                        //console.log("--- DOT -- FREQDOT:"+ FREQDOT)
                        console.log("--- DOT -- keyPressDuration:"+ keyPressDuration  + " dotDuration:" + dotDuration );
                        dom.dash.empty();
                        dom.dot.text('.');
                      //  console.log("dom.dot.text() :" + dom.dot.text() );

                    } else {
                        // Push a dash.
                        dom.dot.empty();
                        morseCode.dash();

                       // mike
                       playnoteUp(event.keyCode,FREQDASH) // mike
                       //console.log("--- DASH -- FREQDASH:"+ FREQDASH)
                       console.log("--- DASH -- keyPressDuration:"+ keyPressDuration  + " dashDuration:" + dashDuration );
                       dom.dot.empty();
                       dom.dash.text('-');
                    }
                    // Display the possible characters for the current
                    // sequence.

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
                                dom.characters.text(
                                    dom.characters.text() + character
                                );
                            } catch (e) {
                                // Reset the sequence - something
                                // went wrong with the user's input.
                                morseCode.resetSequence();
                            }
                            // Clear the possible matches.
                            dom.possibleCharacters.empty();
													 // mike
                            dom.dot.empty();
                            dom.dash.empty();

					        // Set a timer to add a new space to the
                            // message.

                            // domm.progress1.val(100)

									// zop

                                   //
                                 var timerId = 0 ;
								 var now = 0; 
                                 if(spcProgBarEnabled)
                                   timerId = setInterval(progressing(now),SPACETIME );

								spaceTimer = setTimeout(
                                function(){
                                    // Add a "space".
                                    dom.characters.text(
                                        dom.characters.text() + "__"
                                    );
                                },SPACETIME
                              //  3500
                            );
                        },
                        (pauseDuration * 3)
                    );
                }
            );
        })( jQuery, $( "div.output" ), morseCode );
