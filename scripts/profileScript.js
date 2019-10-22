$(document).ready(function(){
  $( "#includeAbout" ).load( "./about/about.html" );
  $( "#includeResume" ).load( "./resume/resume.html" );
  $( "#includeProjects" ).load( "./projects/projects.html" );
});

function buttonHandler(numChoice) {
    var divType = [
      "#aboutDiv",
      "#projectsDiv",
      "#resumeDiv"
    ];
    divType.forEach(function(e) {
      $(e).css("display","none");
    });
    if ($(divType[numChoice]).css("display") !== "block") {
      $(divType[numChoice]).slideDown(280);
    } else {
      $(divType[numChoice]).css("display","none");
    }
  }