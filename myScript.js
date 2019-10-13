$(document).ready(function(){
  $( "#includeAbout" ).load( "./about.html" );
  $( "#includeResume" ).load( "./resume.html" );
  $( "#includeProjects" ).load( "./projects.html" );
});


function buttonHandler(numChoice) {
    //definitely not the most efficient way to do it
    var divType = [
      document.getElementById("aboutDiv"),
      document.getElementById("projectsDiv"),
      document.getElementById("resumeDiv"),
      document.getElementById("contactDiv")
    ]
    for(var i = 0; i<4; i++){
       //if(i!==numChoice){
         divType[i].style.display = "none";
       //}
    }//quick fix on initial double click problem
    if (divType[numChoice].style.display !== "block") {
      divType[numChoice].style.display = "block";
    } else {
      divType[numChoice].style.display = "none";
    }
  }