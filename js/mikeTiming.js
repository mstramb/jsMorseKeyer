
var morseElemTime = {};

var tlen = {};
var pats = '';

var xx = '' ;
function timingInit() {
 pats = morseCode._patternMap;
 var dot = glb_dotDuration;

var tlen = {'.':dot,'-':dot*3};

// console.log("(mikeTiming.js)(timingInit)  pats:"+pats + " glb_dotDuration:" + glb_dotDuration + " dot:"+dot);

for(var key in pats) {
  //x = pats[']
   xx = '.-.-';
  var ls = 0;

   ls = key.length;

  //console.log("pats[x]: " + x + " ls:" + ls);
  //console.log("pats[x]: " + x + " ls:" + ls);

// get total length of elements in msecs for current wpm
  var tot = 0;
  var tl = 0;
  var esp = 0;  // element spacing, one dot len between elems
   //console.log("key: " + key + " ls:"+ls + " val:"+pats[key]);
  
   for(var i=0; i<ls; i++) {
       dd = key.substr(i,1);
//     console.log("x.substr(i,1) :"+ xx.substr(i,1));
       
       tl = tlen[dd];
       //esp += dot;
       tot += tlen[dd];
      //console.log("ls:" + ls + " i:"  + i + " " + pats[key] + " : " + dd + " tl:" + tl + " tot:" + tot + " esp:"+esp);
  //console.log("dd: " + dd + " tl:" + tl + " tot:" + tot);
    }
      esp = (ls-1) * dot;
      tot += esp
  // console.log("--");
    
 morseElemTime[pats[key]] = tot;
    console.log(pats[key] + " : " + key + " tot:" + tot + " esp:" + esp + "  morseElemTime[pats[key]]:" +  morseElemTime[pats[key]]) ;

 //} // for(var x in pats)
}
 // console.log("morseElemTime: " +morseElemTime);
}
