// console.log("(progress.js)");

// var progTimeout = 15;  // for SPACETIME 2000

 //var progTimeout = 20;  // for SPACETIME 2500

var wordTimeout = 8;  // for SPACETIME 2500
//var barr = '';
function wordProgressBarFun(al) {
//  console.log("(wordProgressBarFun) al:"+al);
  
//var spanProgTimeout = document.getElementById('progTimeout');
//spanProgTimeout.innerHTML = progTimeout;
//  var bar = document.getElementById('wordTimeOutBar');
   
   var bar = $('#wordTimeOutBar')[0];

//   barr =bar;
//   console.log("bar: "+ bar);

//  var status = document.getElementById('curr');
//  status.innerHTML = al+"%";

 $('#currWordTimeout').html(al+"%");   // jquery
  bar.value = al;
  //console.log("bar.value : "+ bar.value);
  al++;

 var update = setTimeout("wordProgressBarFun(" + al + ")",wordTimeout);

 //console.log("(wordProgressBarFun) progTimeout:" + progTimeout);

 if(al == 100){
  status.innerHTML = "100%";
  bar.value = 100;
  clearTimeout(update);
  //var spaceTimedOutMsg = document.getElementById('spaceTimedOutMsg');
  // spaceTimedOutMsg.innerHTML = "Space Timeout";
 $('#spaceTimedOutMsg').html("Space Timeout");

// var p = setInterval(uIPause(0),5);
 $('#spaceTimedOutMsg').html('');  // clear spaceTimer message 'Space Timeout'
 $('#wordTimeOutBar').val(0);
 $('#charTimeOutBar').val(0);

// console.log("setInterval(uIPause  p:"+p);
  
  }
 }
function uIPause(v){
 // console.log("uIPause v:" + v);
 v++; 
 var update = setTimeout("uIPause("+ v + ")",100);
  if(v == 100){
    clearTimeout(update);
 $('#spaceTimedOutMsg').html('');  // clear spaceTimer message 'Space Timeout'
 $('#wordTimeOutBar').val(0);
 $('#charTimeOutBar').val(0);
  console.log("uIPause DONE v:" + v);
 }
}

//////////////////////////////////////////

var wordTimeout = 20;
function charProgressBarFun(al) {
  //console.log("(charProgressBarFun)");

  //var bar = document.getElementById('charTimeOutBar');
   var bar = $('#charTimeOutBar')[0];
   $('#currCharTimeout').html(al+"%");   // jquery
   bar.value = al; 
   al++;
  
 // var  t = glb_dotDuration / 10;
 var update = setTimeout("charProgressBarFun("+al+")",1);

 //console.log("(wordProgressBarFun) progTimeout:" + progTimeout);

 if(al == 100){
  status.innerHTML = "100%";
  bar.value = 100;
  clearTimeout(update);
  //var spaceTimedOutMsg = document.getElementById('spaceTimedOutMsg');
  // spaceTimedOutMsg.innerHTML = "Space Timeout";
 $('#spaceTimedOutMsg').html("Space Timeout");
  }
 }

