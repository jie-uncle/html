var current=0;
window.addEventListener('resize',function(){
    var h=document.documentElement.clientHeight;
    $('.content').css({"margin-top":(-current*h)+"px"});
},false);
$(function(){
    var imgArr=['img/bg_two.jpg','img/bg_three.jpg','img/bg_one.jpg']
    var current_img=0;
    $('.bg').css({background:'url('+imgArr[current_img%imgArr.length]+') no-repeat', 'background-size':'100% 100%'});
    setInterval(function(){
        $('.bg').css({animation:"fade 2s  linear"});
        setTimeout(function(){
            current_img+=1;
            $('.bg').css({background:'url('+imgArr[current_img%imgArr.length]+') no-repeat', 'background-size':'100% 100%' })
            setTimeout(function(){
                $('.bg').css({animation:""});
            },1000)
        },1000);
    },5000);
    $('.content>ul>li').click(function(){

        current=$(this).index();
      setcurrent(current);
    });

});
function setcurrent(i){
    var height=document.documentElement.clientHeight;
    $('.content>ul>li').removeClass('current').eq(i).addClass('current');
    $('.content').css({"margin-top":(-i*height)+"px"});
}
/***********************
 * 函数：判断滚轮滚动方向
 * 作者：walkingp
 * 参数：event
 * 返回：滚轮方向 1：向上 -1：向下
 *************************/
var gun=true;
var scrollFunc=function(e){
    e=e || window.event;
    var height=document.documentElement.clientHeight;
    var direct=Down=e.wheelDelta?e.wheelDelta<0:e.detail>0;//IE/Opera/Chrome ||Firefox
    if(direct){
        if(current<$('.page').length-1){
            if(gun){
                gun=false;
                current++;
                setTimeout(function(){
                    gun=true;
                },1000)
            }
        }
        setcurrent(current);
    }else{
        if(current>0){
            if(gun){
                gun=false;
                current--;
                setTimeout(function(){
                    gun=true;
                },1000)
            }
        }
        setcurrent(current);
    }
};
/*注册事件*/
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari
