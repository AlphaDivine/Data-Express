

var canvas =document.getElementById('my_canvas')
var ctx = canvas.getContext('2d');
var gHeight=100;
var gWidth=100;
var unitSpacing=10;
var border=1;
var scalar=1;
var spaceCount = border;

function drawBox(){
    my_canvas.fillStyle = ('1,0,85');
    my_canvas.fillRect(border * scalar, border * scalar, gHeight * scalar, gWidth * scalar);
}
drawBox();

function drawLucky(my_arr, color){
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0,0)
    for(var i=1; i<my_arr.length; i++){
        ctx.lineTo(i*30, 200-my_arr[i] * 2)
}
ctx.stoke();
}
drawLucky(my_arr, '#9g6')