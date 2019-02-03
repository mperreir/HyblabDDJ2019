function Slider(){
    var swiper = new Swiper('.swiper-container', {
      
        direction:'vertical', 
        keyboard: {
          enabled: true,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          
        },
      });
}

function showButton() {
    var down = document.getElementById("up");
    var down = document.getElementById("down");
  
    if(up.style.visibility == "visible"){
      up.style.visibility = "hidden";
      down.style.visibility = "hidden";
    } else{
    up.style.visibility = "visible";
    down.style.visibility = "visible";
    }
  }

  function showAnswer(val){
    var dq = document.getElementById("dq"+val+"");
    dq.style.visibility="visible";
    var tq = document.getElementById("tq"+val+"");
    tq.style.visibility="visible";
    var q = document.getElementById("q"+val+"");
    q.src="img/q"+val+".svg";
    

  }