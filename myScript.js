$(document).ready(function(){
  $( "#includeAbout" ).load( "./about.html" );
  $( "#includeResume" ).load( "./resume.html" );
  $( "#includeProjects" ).load( "./projects.html" );
});

function buttonHandler(numChoice) {
    //decided to just use jQuery instead cause bootstrap is already using it
    var divType = [
      // document.getElementById("aboutDiv"),
      // document.getElementById("projectsDiv"),
      // document.getElementById("resumeDiv"),
      // document.getElementById("contactDiv")
      "#aboutDiv",
      "#projectsDiv",
      "#resumeDiv",
      "#contactDiv"
    ];
    divType.forEach(function(e) {
      $(e).css("display","none");
    });
    if ($(divType[numChoice]).css("display") !== "block") {
      $(divType[numChoice]).slideDown(420);
    } else {
      $(divType[numChoice]).css("display","none");
    }
  }