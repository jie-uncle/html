function isMobile(){
                var ua = navigator.userAgent.toLowerCase();
                var StringPhoneReg = "\\b(ip(hone|od)|android|opera m(ob|in)i"
            + "|windows (phone|ce)|blackberry"
            + "|s(ymbian|eries60|amsung)|p(laybook|alm|rofile/midp"
            + "|laystation portable)|nokia|fennec|htc[-_]"
            + "|mobile|up.browser|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";
                var StringTableReg = "\\b(ipad|tablet|(Nexus 7)|up.browser"
            + "|[1-4][0-9]{2}x[1-4][0-9]{2})\\b";

            console.log(ua);
            var isIphone = ua.match(StringPhoneReg),
                isTable = ua.match(StringTableReg),
                isMobile = isIphone || isTable;

                if(isMobile) {

                    window.location.href="my.html";
                    return true;
                }else {
                    return false;
                }
            }
  isMobile();
  
var current=0;
window.addEventListener('resize',function(){
    var h=document.documentElement.clientHeight;
    $('.content').css({"margin-top":(-current*h)+"px"});
},false);
$(function(){
//  var imgArr=['img/bg_two.jpg']
//  var current_img=0;
//  $('.bg').css({background:'url('+imgArr[current_img%imgArr.length]+') no-repeat', 'background-size':'100% 100%'});
//  setInterval(function(){
//      $('.bg').css({animation:"fade 2s  linear"});
//      setTimeout(function(){
//          current_img+=1;
//          $('.bg').css({background:'url('+imgArr[current_img%imgArr.length]+') no-repeat', 'background-size':'100% 100%' })
//          setTimeout(function(){
//              $('.bg').css({animation:""});
//          },1000)
//      },1000);
//  },5000);
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
 * �����жϹ��ֹ�������
 * ���ߣ�walkingp
 * ����event
 * ���أ����ַ��� 1������ -1������
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
/*ע���¼�*/
if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}//W3C
window.onmousewheel=document.onmousewheel=scrollFunc;//IE/Opera/Chrome/Safari
