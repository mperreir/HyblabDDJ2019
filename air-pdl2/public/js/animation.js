
function my() {
    var box = document.getElementById('box');
    var inter=setInterval(function () {
        var xSpeed = 8;
        var x = parseInt(box.style.left) + xSpeed;
        //给动画设置边界
        box.style.left = x + 'px';
        if (x > 1500) {     box.style.left = 0 + 'px';clearInterval(inter);}
    }, 1);


}