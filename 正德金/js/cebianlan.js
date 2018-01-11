$(function(){
	
	  window.onscroll=function() {
       	var oDiv = document.getElementsByClassName('right_box')[0];
        var scroll = document.documentElement.scrollTop || document.body.scrollTop;
        if(scroll>400){
        	
        	oDiv.style.display='block';
	        var t = scroll + (document.documentElement.clientHeight - oDiv.offsetHeight) / 2;
	        starMove(Math.floor(t));
        }else{
        	oDiv.style.display='none';
        }
        
        
        
    }
    var timer=null;
   function starMove(t){
       var oDiv = document.getElementsByClassName('right_box')[0];

       clearInterval(timer);
       timer=setInterval(function(){

           var iSpeed=(t-oDiv.offsetTop)/10;
           iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
           if(oDiv.offsetTop==t){
               clearInterval(timer);
           }else{
               oDiv.style.top=oDiv.offsetTop+iSpeed+'px'
           }
       },30)
   }
	
	
	
	
	
	
})
