//layout of slider
$(document).ready(function(){
    $('.single-slider').jRange({
        from: 0, //滑动范围的最小值，数字，如0
        to: 24, //滑动范围的最大值，数字，如100
        step: 1,//步长值，每次滑动大小
        scale: ["0h","6h","12h","18h","24h"],//滑动条下方的尺度标签，数组类型，如[0,50,100]
        format: '%s',//数值格式
        width: '50%', //滑动条宽度
        showLabels: true,// 是否显示滑动条下方的尺寸标签
        showScale: true,//是否显示滑块上方的数值标签
        theme: "theme-blue"
    });
});

//les donnees des NO2
var myr=new Array(5.74,5.57,5.32,5.09,5.11,5.43,6.96,7.96,7.97,6.67,5.91,5.49,5,5.08,5.08,5.86,9.07,10.78,10.13,8.99,8.47,7.82,6.75,6.10,5.74);
var myt=new Array(21.89,18.67,17.53,20.17,24.2,34.39,43.64,47.9,50.62,46.81,43.91,38.42,35.59,37.37,38.92,43.75,50.74,55.66,53.93,46.13,37.29,33.84,30.24,25.8,21.89);
var myu=new Array(14.22,12.87,11.79,12.43,13.33,16.87,23.41,28.46,29.27,23.54,19.45,15.79,12.37,12.35,13.03,16.48,23.1,30.45,32.12,29.32,24.15,20.71,18.71,16.39,14.22);

//pour rural
var val = document.getElementById("demo");
var t=document.getElementById("demo2");
var aa = $("#myRange").val();
val.innerHTML =myr[aa];
t.innerHTML=aa;

//urban
var val2=document.getElementById("demo21");
var t2=document.getElementById("demo22");
var aa2=$("#myRange2").val();
val2.innerHTML=myu[aa2];
t2.innerHTML=aa2;

//pour traffic
var val3=document.getElementById("demo31");
var t3=document.getElementById("demo32");
var aa3=$("#myRange3").val();
val3.innerHTML=myt[aa3];
t3.innerHTML=aa3;


function ran(){

    var aa = $("#myRange").val();
    val.innerHTML =myr[aa];
    t.innerHTML=aa;

//changer le up and down of the progress
    var oDiv = document.getElementById("bar");
    oDiv.style.width =100*(1-myr[aa]/100) + "%";

    if(aa>0){
        $('#indication_jauge_r').hide();
    }

//changer la nuit et le journee
    if(aa>=19||aa<8){
        $("#r").css({
            "background": "url(./img/NuitRural4fevrier.png) no-repeat center",
            "height": "100%",
            "background-size": "cover"
        });

        $(".theme-blue .back-bar ").css({
           "height": "15px",//改变高度
            "border-radius": "2px",
            "background-color":"#dadc38",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)",
        });
        $(".theme-blue .back-bar .selected-bar ").css({
            "border-radius": "5px",
            "background-color":"#dadc38",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb1d1f9', endColorstr='#ff64a8f9', GradientType=0)",
        });

        $(".h1-r").css({
            "color": "#E1F131"
        });

        $("#h2-r").css({
            "color": "#E1F131"
        });

        $("#h3-r").css({
            "color": "#E1F131"
        });
    }
    if(aa>8&&aa<19){
        $("#r").css({
            "background": "url(./img/RuralJour31janvier@2x.png) no-repeat center",
            "height": "100%",
            "background-size": "cover"
        });
        $(".theme-blue .back-bar ").css({
            "height": "15px",//改变高度
            "border-radius": "2px",
            "background-color":"#1c4649",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)",
        });
        $(".theme-blue .back-bar .selected-bar ").css({
            "border-radius": "5px",
            "background-color":"#1c4649",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb1d1f9', endColorstr='#ff64a8f9', GradientType=0)",
        });
        $(".h1-r").css({
            "color": "#AC0759"
        });

        $("#h2-r").css({
            "color": "#AC0759"
        });

        $("#h3-r").css({
            "color": "#AC0759"
        });
    }

    if(aa>=7&&aa<9){
        $("#7-8-r").show();
        $("#17-r").hide();
        $("#autres-r-jour").hide();
        $("#autres-r-nuit").hide();
    }

    if(aa>=9&&aa<17){
        $("#7-8-r").hide();
        $("#17-r").hide();
        $("#autres-r-jour").show();
        $("#autres-r-nuit").hide();
    }

    if(aa>=17&&aa<18){
        $("#7-8-r").hide();
        $("#17-r").show();
        $("#autres-r-jour").hide();
        $("#autres-r-nuit").hide();
    }

    if(aa>=18&&aa<19){
        $("#7-8-r").hide();
        $("#17-r").hide();
        $("#autres-r-jour").hide();
        $("#autres-r-nuit").hide();
    }

    if(aa>=19||aa<7){
        $("#7-8-r").hide();
        $("#17-r").hide();
        $("#autres-r-jour").hide();
        $("#autres-r-nuit").show();
    }

}

function ran2(){

    var aa2 = $("#myRange2").val();
    val2.innerHTML =myu[aa2];
    t2.innerHTML=aa2;

//changer le up and down of the progress
    var oDiv2 = document.getElementById("bar2");
    oDiv2.style.width =100*(1-myu[aa2]/100) + "%";

    if(aa2>0){
        $('#indication_jauge_ur').hide();
    }

    if(aa2>=19||aa2<8){
        $("#ur").css({
            "background": "url(./img/UrbainNuit29janvier@2x.png) no-repeat center",
            "height": "100%",
            "background-size": "cover"
        });

        $(".theme-blue .back-bar ").css({
            "height": "15px",//改变高度
            "border-radius": "2px",
            "background-color":"#dadc38",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)",
        });
        $(".theme-blue .back-bar .selected-bar ").css({
            "border-radius": "5px",
            "background-color":"#dadc38",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb1d1f9', endColorstr='#ff64a8f9', GradientType=0)",
        });

        $(".h1-ur").css({
            "color": "#E1F131"
        });

        $("#h2-ur").css({
            "color": "#E1F131"
        });

        $("#h3-ur").css({
            "color": "#E1F131"
        });
    }

    if(aa2>8&&aa2<19){
        $("#ur").css({
            "background": "url(./img/urban_jb.png) no-repeat center",
            "height": "100%",
            "background-size": "cover"
        });
        $(".theme-blue .back-bar ").css({
            "height": "15px",//改变高度
            "border-radius": "2px",
            "background-color":"#1c4649",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)",
        });
        $(".theme-blue .back-bar .selected-bar ").css({
            "border-radius": "5px",
            "background-color":"#1c4649",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb1d1f9', endColorstr='#ff64a8f9', GradientType=0)",
        });

        $(".h1-ur").css({
            "color": "#AC0759"
        });

        $("#h2-ur").css({
            "color": "#AC0759"
        });

        $("#h3-ur").css({
            "color": "#AC0759"
        });
    }

    if(aa2>=0&&aa2<5){
        $("#0-4-ur").show();
        $("#5-6-ur").hide();
        $("#7-8-ur").hide();
        $("#9-10-11-ur").hide();
        $("#12-14-ur").hide();
        $("#15-16-ur").hide();
        $("#17-18-ur").hide();
        $("#19-23-ur").hide();
    }
    if(aa2>=5&&aa2<7){
        $("#0-4-ur").hide();
        $("#5-6-ur").show();
        $("#7-8-ur").hide();
        $("#9-10-11-ur").hide();
        $("#12-14-ur").hide();
        $("#15-16-ur").hide();
        $("#17-18-ur").hide();
        $("#19-23-ur").hide();
    }
    if(aa2>=7&&aa2<9){
        $("#0-4-ur").hide();
        $("#5-6-ur").hide();
        $("#7-8-ur").show();
        $("#9-10-11-ur").hide();
        $("#12-14-ur").hide();
        $("#15-16-ur").hide();
        $("#17-18-ur").hide();
        $("#19-23-ur").hide();
    }
    if(aa2>=9&&aa2<12){
        $("#0-4-ur").hide();
        $("#5-6-ur").hide();
        $("#7-8-ur").hide();
        $("#9-10-11-ur").show();
        $("#12-14-ur").hide();
        $("#15-16-ur").hide();
        $("#17-18-ur").hide();
        $("#19-23-ur").hide();
    }
    if(aa2>=12&&aa2<15){
        $("#0-4-ur").hide();
        $("#5-6-ur").hide();
        $("#7-8-ur").hide();
        $("#9-10-11-ur").hide();
        $("#12-14-ur").show();
        $("#15-16-ur").hide();
        $("#17-18-ur").hide();
        $("#19-23-ur").hide();
    }
    if(aa2>=15&&aa2<17){
        $("#0-4-ur").hide();
        $("#5-6-ur").hide();
        $("#7-8-ur").hide();
        $("#9-10-11-ur").hide();
        $("#12-14-ur").hide();
        $("#15-16-ur").show();
        $("#17-18-ur").hide();
        $("#19-23-ur").hide();
    }
    if(aa2>=17&&aa2<19){
        $("#0-4-ur").hide();
        $("#5-6-ur").hide();
        $("#7-8-ur").hide();
        $("#9-10-11-ur").hide();
        $("#12-14-ur").hide();
        $("#15-16-ur").hide();
        $("#17-18-ur").show();
        $("#19-23-ur").hide();
    }
    if(aa2>=19&&aa2<24){
        $("#0-4-ur").hide();
        $("#5-6-ur").hide();
        $("#7-8-ur").hide();
        $("#9-10-11-ur").hide();
        $("#12-14-ur").hide();
        $("#15-16-ur").hide();
        $("#17-18-ur").hide();
        $("#19-23-ur").show();
    }
}

function ran3(){

    var aa3 = $("#myRange3").val();
    val3.innerHTML =myt[aa3];
    t3.innerHTML=aa3;

//changer le up and down of the progress
    var oDiv3 = document.getElementById("bar3");
    oDiv3.style.width =100*(1-myt[aa3]/100) + "%";

    if(aa3>0){
        $('#indication_jauge_tr').hide();
    }

    if(aa3>=19||aa3<8){
        $("#tr").css({
            "background": "url(./img/TraficNuit4fevrier.png) no-repeat center",
            "height": "100%",
            "background-size": "cover"
        });

        $(".theme-blue .back-bar ").css({
            "height": "15px",//改变高度
            "border-radius": "2px",
            "background-color":"#dadc38",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)",
        });
        $(".theme-blue .back-bar .selected-bar ").css({
            "border-radius": "5px",
            "background-color":"#dadc38",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb1d1f9', endColorstr='#ff64a8f9', GradientType=0)",
        });

        $(".h1-tr").css({
            "color": "#E1F131"
        });

        $("#h2-tr").css({
            "color": "#E1F131"
        });

        $("#h3-tr").css({
            "color": "#E1F131"
        });
    }
    if(aa3>8&&aa3<19){
        $("#tr").css({
            "background": "url(./img/TraficJour29janvier@2x.png) no-repeat center",
            "height": "100%",
            "background-size": "cover"
        });
        $(".theme-blue .back-bar ").css({
            "height": "15px",//改变高度
            "border-radius": "2px",
            "background-color":"#1c4649",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffeeeeee', endColorstr='#ffdddddd', GradientType=0)",
        });
        $(".theme-blue .back-bar .selected-bar ").css({
            "border-radius": "5px",
            "background-color":"#1c4649",
            "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffb1d1f9', endColorstr='#ff64a8f9', GradientType=0)",
        });

        $(".h1-tr").css({
            "color": "#AC0759"
        });

        $("#h2-tr").css({
            "color": "#AC0759"
        });

        $("#h3-tr").css({
            "color": "#AC0759"
        });
    }

    if(aa3>=0&&aa3<4){
        $("#0-1-2-3-tr").show();
        $("#4-7-tr").hide();
        $("#8-tr").hide();
        $("#9-12-tr").hide();
        $("#13-16-tr").hide();
        $("#17-18-tr").hide();
        $("#19-23-tr").hide();
    }
    if(aa3>=4&&aa3<8){
        $("#0-1-2-3-tr").hide();
        $("#4-7-tr").show();
        $("#8-tr").hide();
        $("#9-12-tr").hide();
        $("#13-16-tr").hide();
        $("#17-18-tr").hide();
        $("#19-23-tr").hide();
    }
    if(aa3>=8&&aa3<9){
        $("#0-1-2-3-tr").hide();
        $("#4-7-tr").hide();
        $("#8-tr").show();
        $("#9-12-tr").hide();
        $("#13-16-tr").hide();
        $("#17-18-tr").hide();
        $("#19-23-tr").hide();
    }
    if(aa3>=9&&aa3<13){
        $("#0-1-2-3-tr").hide();
        $("#4-7-tr").hide();
        $("#8-tr").hide();
        $("#9-12-tr").show();
        $("#13-16-tr").hide();
        $("#17-18-tr").hide();
        $("#19-23-tr").hide();
    }
    if(aa3>=13&&aa3<17){
        $("#0-1-2-3-tr").hide();
        $("#4-7-tr").hide();
        $("#8-tr").hide();
        $("#9-12-tr").hide();
        $("#13-16-tr").show();
        $("#17-18-tr").hide();
        $("#19-23-tr").hide();
    }
    if(aa3>=17&&aa3<19){
        $("#0-1-2-3-tr").hide();
        $("#4-7-tr").hide();
        $("#8-tr").hide();
        $("#9-12-tr").hide();
        $("#13-16-tr").hide();
        $("#17-18-tr").show();
        $("#19-23-tr").hide();
    }
    if(aa3>=19&&aa3<24){
        $("#0-1-2-3-tr").hide();
        $("#4-7-tr").hide();
        $("#8-tr").hide();
        $("#9-12-tr").hide();
        $("#13-16-tr").hide();
        $("#17-18-tr").hide();
        $("#19-23-tr").show();
    }
}
