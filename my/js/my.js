$(function(){
	var scroll =0;
	window.onscroll = function(e) {
		var a=$('html').css('font-size');
		var b=parseInt(a);
		
         scroll = document.documentElement.scrollTop || document.body.scrollTop;
         console.log(scroll);
		var c=parseFloat(scroll/((300/40)*b)*0.6);
		if(c<=0.6){
			$('.fixedNav').css({'background':'rgba(0,0,0,'+c+')'});
			$('.menu').css({'background':'rgba(0,0,0,'+c+')'})
		}
	}
	var html=document.getElementsByTagName('html')[0];
	$('.down_menu').click(function(){

		$('.menu').toggleClass('show');
		if($('.menu').hasClass('show')){
			html.style.position='fixed';
			 

			html.style.top=-scroll+'px';
			html.style.left='0';
			var h=window.screen.height;

			html.style.width='100%';
			html.style.height=h+'px';
			html.style.overflow='hidden';
		}else{
			html.style.position='';
			scrollTo(0,scroll);
			html.style.height='auto';
			html.style.overflow='visible';
		}
		
	});
	
});

	
