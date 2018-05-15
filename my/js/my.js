$(function(){
	var scroll =0;
	var font_size;
	window.onscroll = function(e) {
		 font_size=parseInt($('html').css('font-size'));
		
		if($('.menu').hasClass('show')){
			return false;
		}
		scroll = document.documentElement.scrollTop || document.body.scrollTop;
		var c=parseFloat(scroll/((300/40)*font_size)*0.6);
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
			var h= window.screen.availHeight;
			html.style.width='100%';
			html.style.height=h+'px';
			html.style.overflow='hidden';
			document.body.scrollTop = document.documentElement.scrollTop = scroll+'px'	;
		}else{
			html.style.position='';
			html.style.height='auto';
			html.style.overflow='visible';
			scrollTo(0,scroll);
		}
		
					
		
	});
	$('html').click(function(e){
		if($('.menu').hasClass('show')){
			if(e.clientY>420/40*font_size){
				$('.menu').removeClass('show')
				html.style.position='';
				html.style.height='auto';
				html.style.overflow='visible';
				scrollTo(0,scroll);
			}
		}
		
	});
	
});

	
