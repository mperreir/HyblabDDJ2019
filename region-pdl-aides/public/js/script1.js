$(document).ready(function() {
    var jssor_1_options = {
        $Idle: 2000,
        $SlideEasing: $Jease$.$InOutSine,
        $DragOrientation: 3,
        $ArrowNavigatorOptions: {
            $Class: $JssorArrowNavigator$
        },
        $BulletNavigatorOptions: {
            $Class: $JssorBulletNavigator$
        }
    };

    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    //make sure to clear margin of the slider container element
    jssor_1_slider.$Elmt.style.margin = "";

    function LoadFactory() {
        jssor_1_slider.$CurrentIndex();
        let slideIndex = jssor_1_slider.$CurrentIndex();
        if (window.console) console.log(slideIndex);
        if (slideIndex == 1) {
            $("#logo").loadgo({
                direction: "bt"
            });
            mainDemo();
        }
    }
    LoadFactory();
    jssor_1_slider.$On($JssorSlider$.$EVT_PARK, LoadFactory);

    /*#region responsive code begin*/

    /*
          parameters to scale jssor slider to fill parent container

          MAX_WIDTH
              prevent slider from scaling too wide
          MAX_HEIGHT
              prevent slider from scaling too high, default value is original height
          MAX_BLEEDING
              prevent slider from bleeding outside too much, default value is 1
              0: contain mode, allow up to 0% to bleed outside, the slider will be all inside parent container
              1: cover mode, allow up to 100% to bleed outside, the slider will cover full area of parent container
              0.1: flex mode, allow up to 10% to bleed outside, this is better way to make full window slider, especially for mobile devices
      */

    var MAX_WIDTH = 1920;
    var MAX_HEIGHT = 1080;
    var MAX_BLEEDING = 1;

    function ScaleSlider() {
        var containerElement = jssor_1_slider.$Elmt.parentNode;
        var containerWidth = containerElement.clientWidth;

        if (containerWidth) {
            var originalWidth = jssor_1_slider.$OriginalWidth();
            var originalHeight = jssor_1_slider.$OriginalHeight();

            var containerHeight = containerElement.clientHeight || originalHeight;

            var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
            var expectedHeight = Math.min(
                MAX_HEIGHT || containerHeight,
                containerHeight
            );

            //scale the slider to expected size
            jssor_1_slider.$ScaleSize(expectedWidth, expectedHeight, MAX_BLEEDING);

            //position slider at center in vertical orientation
            jssor_1_slider.$Elmt.style.top =
                (containerHeight - expectedHeight) / 2 + "px";

            //position slider at center in horizontal orientation
            jssor_1_slider.$Elmt.style.left =
                (containerWidth - expectedWidth) / 2 + "px";
        } else {
            window.setTimeout(ScaleSlider, 30);
        }
    }

    function OnOrientationChange() {
        ScaleSlider();
        window.setTimeout(ScaleSlider, 800);
    }

    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", OnOrientationChange);
    /*#endregion responsive code end*/

    $("#btnGosec2").on("click", function(event) {
        event.preventDefault();
        jssor_1_slider.$PlayTo(1);
    });

    var array = [
        "Picardie",
        "Haute-Normandie",
        "Basse-Normandie",
        "Ile de France",
        "Bretagne",
        "Champagne Ardenne",
        "Alsace",
        "Pays de la Loire",
        "Centre",
        "Bourgogne",
        "Rhône Alpe",
        "Aquitaine",
        "Provence Alpe Cote d'Azur",
        "Corse",
        "Midi-Pyrenne",
        "Languedoc Roussillon",
        "Lorraine",
        "Poitou Charente",
        "Limousin",
        "Auvergne",
        "Nord Pas de Calais",
        "Franche Comté"
    ];
    $("#francemap").vectorMap({
        map: "france_fr",
        hoverOpacity: 0.5,
        hoverColor: false,
        backgroundColor: "#f7f7f7",
        colors: couleurs,
        borderColor: "#000000",
        selectedRegions: ["Bretagne"],
        selectedColor: "#FFDA00",
        enableZoom: false,
        showTooltip: true
    });
    $("#francemap2").vectorMap({
        map: "france_fr",
        hoverOpacity: 0.5,
        hoverColor: false,
        backgroundColor: "#f7f7f7",
        colors: couleurs,
        borderColor: "#000000",
        selectedColor: "#FFDA00",
        enableZoom: false,
        showTooltip: true
    });

    $("#francemap3").vectorMap({
        map: "france_fr",
        hoverOpacity: 0.5,
        hoverColor: false,
        backgroundColor: "transparent",
        colors: couleurs,
        borderColor: "#000000",
        selectedColor: "#FFDA00",
        enableZoom: false,
        showTooltip: true,
        onRegionClick: function(event, code) {
            var name = array[code - 1];
            console.log(name);
            console.log(code);

            if (code == 8) {
                jssor_1_slider.$PlayTo(6);
            }
        }
    });

    $("path#jqvmap1_8").click();
    $("path#jqvmap2_8").click();

    var factoryInterval;
    function mainDemo() {
        var p = 0;
        $("#logo").loadgo("resetprogress"); // reset progress to start again
        factoryInterval = window.setInterval(function() {
            if ($("#logo").loadgo("getprogress") == 100) {
                // When progress completes, we have to clear the interval
                window.clearInterval(factoryInterval);
            } else {
                var prog = p * 10;
                //var prog = 100;
                result = prog * 0.21;
                //$("#count").html(Math.floor(result));
                $("#count").html(Math.floor(result) + " 000 000 €");
                $("#logo").loadgo("setprogress", prog);
                p++;
            }
        }, 150);
    }
});