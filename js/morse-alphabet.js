console.log("(morse-alphabet.js)");
        
        // Initialize the alphabet display.
        // (function( $, container, morseCode ){
     function initMorseAlphabet( $, container, morseCode ){

            // Get the dom elements in this module.
            var dom = {
                characters: container.find( "ul.characters" ),
                template: container.find( "script.template" )
            };
            console.log("characters: " + characters);

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
        }
        //})( jQuery, $( "div.alphabet" ), morseCode );

