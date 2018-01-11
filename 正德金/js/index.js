$(function(){
	var index = 0;
	var dist = $('.banner_wrap img').width();
	var timer = null;
	$(".arrow_right").click(function(){
		clearInterval(timer);
		var n=judge(false,index);
		$(".banner").stop();
		$(".banner").animate({left:-(dist*n)+'px'},2000,function(){
			$(".banner_nav li").removeClass("current").eq(index).addClass("current");
		});
		
		timer = setInterval(toLeft,4000);
	});
	
	$(".arrow_left").click(function(){
		clearInterval(timer);
		var n=judge(true,index);
		$(".banner").stop();
		$(".banner").animate({left:-(dist*n)+'px'},2000,function(){
		$(".banner_nav li").removeClass("current").eq(index).addClass("current");
			
		});
		timer = setInterval(toLeft,4000);
	});
	
	$(".banner_nav li").click(function(){
		clearInterval(timer);
		index = $(this).index();
		$(".banner").animate({left:-(dist*index)+'px'},2000);
		$(".banner_nav li").removeClass("current").eq(index).addClass("current");
		timer = setInterval(toLeft,4000);
	});
	
	clearInterval(timer);
	timer = setInterval(toLeft,4000);
	
	function toLeft(){
		$(".banner").animate({left:-(dist*judge(false,index))+'px'},2000,function(){
			$(".banner_nav li").removeClass("current").eq(index).addClass("current");
		});
		
	}
	
	function judge(isLeft,i){
		if(isLeft){
			if(index <= 0){
				index = $(".banner img").length-1;
			}else{
				index = --i;
			}
		}else{
			if(index >= $(".banner img").length-1){
				index = 0;
			}else{
				index = ++i;
			}
		}
		return index;
	}
})
