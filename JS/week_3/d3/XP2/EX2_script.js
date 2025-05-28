let timer;
function clearInter(){
  clearInterval(timer);
}

function myMove() {
  let elem = document.getElementById("animate");
  let pos = 0;
  timer = setInterval(function() {
    if (pos ==  350) {
      clearInterval(timer);
    }
    else {
      pos++;
      elem.style.left = pos + "px";
    }
  }, 1);
}
