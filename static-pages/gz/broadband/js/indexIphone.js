var html = document.getElementsByTagName('html')[0];
var W = document.documentElement.clientWidth;
html.style.fontSize = W * 0.15625 + 'px';
window.onresize = function() {
    var html = document.getElementsByTagName('html')[0];
    var W = document.documentElement.clientWidth;
    html.style.fontSize = W * 0.15625 + 'px';
}

$("#details").click(function() {
    window.open('https://gzdx.me/dqxy');
})