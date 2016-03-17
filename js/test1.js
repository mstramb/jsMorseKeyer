console.log("test1.js");

var str1 = "this is a simple one line string";

var str2 = "this string is on multiple  \
           lines in the  \
           source code ";


$(document).ready(function() {
//   console.log("(jquery ready");

/*
  $('#foo').bind('click', function(event) {   // '#' is id
    alert('The mouse cursor is at ('
      + event.pageX + ', ' + event.pageY + ')');
  });
*/

  $('#testSpan1').html(str1);

  $('#testSpan2').html(str2);
  

}); 

