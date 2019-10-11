function buttonHandler(numChoice) {
    //definitely not the most efficient way to do it
    var divType = [
      document.getElementById("aboutDiv"),
      document.getElementById("projectsDiv"),
      document.getElementById("resumeDiv"),
      document.getElementById("contactDiv")
    ]
    for(var i = 0; i<4; i++){
       if(i!==numChoice){
         divType[i].style.display = "none";
       }
    }
    if (divType[numChoice].style.display === "none") {
      divType[numChoice].style.display = "block";
    } else {
      divType[numChoice].style.display = "none";
    }
  }