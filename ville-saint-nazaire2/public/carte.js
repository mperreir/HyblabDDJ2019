function doalert(checkboxElem) {
  var el = document.getElementById('cartevide');
  if((ch1.checked) && !(ch2.checked) && !(ch3.checked) && !(ch4.checked)){ //ch1
     el.src ="https://www.google.com/maps/d/u/0/embed?mid=1jfXevWNoSK0OggibiH_nyTKcmUu7PFkP"; //Services
  }
  else if ((ch1.checked) && (ch2.checked) && !(ch3.checked) && !(ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1HLMG7-cqwLXjfX1vZbdKH1hvpmt8K5N8"; //Services vélos +Abris vélos
  }else if ((ch1.checked) && !(ch2.checked) && (ch3.checked) && !(ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1MMG3fIngl65CnwnpalC741WLT71sRSvr";
  }else if ((ch1.checked) && !(ch2.checked) && !(ch3.checked) && (ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1ykcT2QsqDIDFu8k3vFUync_UHQ6d3tn2";//Services vélo + voies vertes
  }else if ((ch1.checked) && (ch2.checked) && (ch3.checked) && !(ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1PpxKVNw-d4pXheSPBruuWts5VtpZk6bE";//Services vélo + Abris vélos + Voies partagées
  }else if ((ch1.checked) && (ch2.checked) && !(ch3.checked) && (ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1bmVXCgC0IGc2YPoso6S3ZeqxZ5j9ctHr";//Services vélo + Abris vélos + Voies Vertes
  }else if ((ch1.checked) && !(ch2.checked) && !(ch3.checked) && !(ch4.checked)){
    el.src = "https://www.google.com/maps/d/u/0/embed?mid=1jjUqhetr6DisCJulpbG3RRivmI62lYxp" ;
  }else if (!(ch1.checked) && (ch2.checked) && !(ch3.checked) && !(ch4.checked)){//ch2
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1bSkv8yCMLNnOh5YPenFCjEWQtzAwjfVA"; //Abris vélos
  }else if (!(ch1.checked) && (ch2.checked) && (ch3.checked) && !(ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1BYDQNxLcicl5PbNf749W83eXJSKBfAe-"; //Abris vélos +Voies partagées
  }else if (!(ch1.checked) && (ch2.checked) && !(ch3.checked) && (ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1vHlEBgIPZePWrH0HSQhhy08shLHAD-zV"; //Abris vélos + Voies Vertes
  }else if (!(ch1.checked) && (ch2.checked) && (ch3.checked) && (ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1tvJYN61h-Rmxu-iuR58UnREufZdGTD_I"; //Abris vélos + Voies partagées + voies vertes
  }else if (!(ch1.checked) && !(ch2.checked) && (ch3.checked) && !(ch4.checked)){ //ch3
    el.src = src="https://www.google.com/maps/d/u/0/embed?mid=1AD5jakWXWFCV1f9Jvjneu02S-NKpI5Fu";//Voies Partagées
  }else if (!(ch1.checked) && !(ch2.checked) && (ch3.checked) && (ch4.checked)){
    el.src = src="https://www.google.com/maps/d/u/0/embed?mid=1AD5jakWXWFCV1f9Jvjneu02S-NKpI5Fu";//Voies Partagées + Voies Vertes
  }else if (!(ch1.checked) && !(ch2.checked) && !(ch3.checked) && (ch4.checked)){ //ch4
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1Mua3nLCFTtRnzZiFs678H8Yb4EQcdyHz";//Voies Vertes
  }else if ((ch1.checked) && (ch2.checked) && (ch3.checked) && (ch4.checked)){
    el.src ="https://www.google.com/maps/d/u/0/embed?mid=1g0_Oyjzz4TCYelU29tsf_T1x_E2xBa5b"; // TOUT
  }else {
    el.src = "https://www.google.com/maps/d/u/0/embed?mid=1kKfvGigW_zeD2NAA4Dq7jN2Qb0h5N8fu" ; //Carte de St Nazaire
  }

}
