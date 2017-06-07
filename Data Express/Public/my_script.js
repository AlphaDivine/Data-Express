

var canvas =document.getElementById('my_canvas')
var ctx = canvas.getContext('2d');


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