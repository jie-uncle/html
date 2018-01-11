window.onload=function(){
//	轮播图
	var time=5000,animation_time=800;
	var imgs=document.getElementsByClassName('screen_img_sc');
	var imgBanners=document.getElementsByClassName('img_banner');
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	var img_nav_time;
	var img_time;
	var timeout;
	var current=imgs.length-1;
	var end=current-1;
	imgs[current].style.display='block';
	start();
function start(){
		img_time=setInterval(img_move,time);
	timeout=setTimeout(function(){
		img_nav_time=setInterval(img_nav_move,time);
	},animation_time)
	
	}

	function img_move(){
		
		if(end<current){
			imgs[end].style.display='block';
		}
		imgBanners[imgs.length-current-1].className='img_banner';
		imgBanners[imgs.length-end-1].className="img_banner img_activity";
		imgs[current].style.animation='lucency_out '+animation_time+'ms linear';
	}
	function img_nav_move (){
			if(end>current){
				imgs[end].style.display='block';
			}
			imgs[current].style.display='none';
			imgs[current].style.animation='';
			current=end;
			if(current==0){
				end=imgs.length-1;
			}else{
				end=current-1;
			}
		}
	
	for(var i=0;i<imgBanners.length;i++){
		imgBanners[i].onclick=function(){
			
			clearInterval(img_nav_time);
			clearInterval(img_time);
			var num=cha(this);
			end=imgBanners.length-num-1;
			img_move();
			timeout=setTimeout(function(){
				img_nav_move();
				start();
			},animation_time);
			
			return false;
		}
	}
	var isclick=true;
		left.onclick=function(){
			if(isclick===false){
				return false;
			}
			isclick=false;
			clearInterval(img_nav_time);
			clearInterval(img_time);
			clearTimeout(timeout);
			if(current==imgs.length-1){
				end=0;
			}else{
				end=current+1;
			}
			img_move();
			timeout=setTimeout(function(){
				img_nav_move();
				start();
				isclick=true;
			},animation_time);
			return false;
		}
		right.onclick=function(){
			if(isclick===false){
				return false;
			}
			isclick=false;
			clearInterval(img_nav_time);
			clearInterval(img_time);
			clearTimeout(timeout);
			if(current==0){
				end=imgs.length-1;
			}else{
				end=current-1;
			}
			img_move();
			timeout=setTimeout(function(){
				img_nav_move();
				start();
				isclick=true;
			},animation_time);
			return false;
		}
		

	function cha (el){
 for (var i=0; imgBanners[i]; i++){
 if (imgBanners[i] === el){
  return i;
 }
 }
 return -1;
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//	推荐位
var $left=$('.xiaomiStar .left');	
var $right=$('.xiaomiStar .right');
var $left_span=$('.xiaomiStar .left>span');
var $right_span=$('.xiaomiStar .right>span');
var $xiaomiStar_ul=$('.xiaomiStar ul');
var isleft=true,left_hover=false,right_hover=true;
var left_right_timer;
Move();
function Move(){
	left_right_timer=setInterval(function(){
		if(isleft){
			ToRight();
		}else{
			ToLeft();
		}
		
	},6000);
}

	$left.hover(function(){
		if(left_hover){
			$left_span.addClass('hover');
		}
	},function(){
		$left_span.removeClass('hover');
	});
	$right.hover(function(){
		if(right_hover){
			$right_span.addClass('hover');
		}
	},function(){
		$right_span.removeClass('hover');
	});
	
	$left.click(function(){
		if(!isleft){
			clearInterval(left_right_timer);
			ToLeft();
			Move();
		}
		return false;
	});
	$right.click(function(){
		if(isleft){
			clearInterval(left_right_timer);
			ToRight();
			Move();
		}
		return false;
	});
	function ToRight(){
		$xiaomiStar_ul.css({'margin-left':'-1226px'});
			$right_span.addClass('activity');
			$left_span.removeClass();
			right_hover=false;
			left_hover=true;
			$right.css({'cursor':'default'});
			$left.css({'cursor':'pointer'});
			isleft=false;
	}
	function ToLeft(){
		$xiaomiStar_ul.css({'margin-left':'0px'});
			$left_span.addClass('activity');
			$right_span.removeClass();
			$left.css({'cursor':'default'});
			$right.css({'cursor':'pointer'});
			left_hover=false;
			right_hover=true;
			isleft=true;
	}
	
	
	
	
	
	
	
	
	
	
	
//	产品
	$('.product_content>div.Home>ul>li').mouseover(function(){
		var n=$(this).index();
		$('.product_content>div.Home>ul>li').siblings().removeClass('activity').eq(n).addClass('activity');
	});
	$('.product_content>div.zhineng>ul>li').mouseover(function(){
		var n=$(this).index();
		$('.product_content>div.zhineng>ul>li').siblings().removeClass('activity').eq(n).addClass('activity');
	});
	
	
	
	
	
	
	
	
	
	
//	底部产品推荐
	var $bottom_left=$('.recommend_foryou .left');	
	var $bottom_right=$('.recommend_foryou .right');
	var $bottom_left_span=$('.recommend_foryou .left>span');
	var $bottom_right_span=$('.recommend_foryou .right>span');
	var $bottom_recommend_foryou_ul=$('.recommend_foryou ul');
	var bottom_isleft=true,bottom_isright=false,bottom_left_hover=false,bottom_right_hover=true;
	
	$bottom_left.click(
		function(){
			moveDiv(false);
			return false;
		}
	);
	$bottom_right.click(
		function(){
			moveDiv(true);
			return false;
		}
	);
	
	var num=0;
	function moveDiv(right){
		if(right){
			if(num==3){
				return;
			}
			num++;
			bottom_isright=false;
			bottom_isleft=false;
			$bottom_left_span.removeClass();
			$bottom_right_span.removeClass();
			$bottom_right.css({'cursor':'pointer'});
			$bottom_left.css({'cursor':'pointer'});
			if(num>=3){
				$bottom_right_span.addClass('activity');
				$bottom_right.css({'cursor':'default'});
				bottom_isright=true;
			}
			
			$bottom_recommend_foryou_ul.css({'margin-left':-num*1226+'px'});
		}else{
			if(num==0){
				return;
			}
			num--;
			bottom_isright=false;
			bottom_isleft=false;
			$bottom_left_span.removeClass();
			$bottom_right_span.removeClass();
			$bottom_right.css({'cursor':'pointer'});
			$bottom_left.css({'cursor':'pointer'});
			if(num<=0){
				$bottom_left_span.addClass('activity');
				$bottom_left.css({'cursor':'default'});
				bottom_isleft=true;
			}
			$bottom_recommend_foryou_ul.css({'margin-left':-num*1226+'px'});
		}
		
	}
	
	$bottom_left.hover(function(){
		if(!bottom_isleft){
			$bottom_left_span.addClass('hover');
		}
	},function(){
		$bottom_left_span.removeClass('hover');
	});
	$bottom_right.hover(function(){
		if(!bottom_isright){
			$bottom_right_span.addClass('hover');
		}
	},function(){
		$bottom_right_span.removeClass('hover');
	});
	
	
	
	var current_tushu=0;
	var current_zhuti=0;
	var current_youxi=0;
	var current_yingyong=0;
	var w=$('.product_content>.content_botton>ul>li>ul>li')[0].offsetWidth;
	
	$('.product_content>.content_botton>ul>li.tushu>div.right').click(function(){
		Move_left_or_right('tushu',current_tushu,true);
		return false;
	}
		);
	
	$('.product_content>.content_botton>ul>li.tushu>div.left').click(function(){
		Move_left_or_right('tushu',current_tushu,false);
		return false;
	}
	);
	$('.product_content>.content_botton>ul>li.zhuti>div.right').click(function(){
		Move_left_or_right('zhuti',current_zhuti,true);
		return false;
	}
		);
	
	$('.product_content>.content_botton>ul>li.zhuti>div.left').click(function(){
		Move_left_or_right('zhuti',current_zhuti,false);
		return false;
	}
	);
	$('.product_content>.content_botton>ul>li.youxi>div.right').click(function(){
		Move_left_or_right('youxi',current_youxi,true);
		return false;
	}
		);
	
	$('.product_content>.content_botton>ul>li.youxi>div.left').click(function(){
		Move_left_or_right('youxi',current_youxi,false);
		return false;
	}
	);
	$('.product_content>.content_botton>ul>li.yingyong>div.right').click(function(){
		Move_left_or_right('yingyong',current_yingyong,true);
		return false;
	}
		);
	
	$('.product_content>.content_botton>ul>li.yingyong>div.left').click(function(){
		Move_left_or_right('yingyong',current_yingyong,false);
		return false;
	}
	);
	
	function Move_left_or_right(classname,a,right){
		console.log(current_tushu)
		if(right){
			if(a==$('.product_content>.content_botton>ul>li.'+classname+'>ul:nth-of-type(2)>li').length-1){
			}else{
				a++;
			if(a<=$('.product_content>.content_botton>ul>li.'+classname+'>ul:nth-of-type(2)>li').length-1){
				$('.product_content>.content_botton>ul>li.'+classname+'>ul:nth-of-type(1)').animate({'margin-left':(-a*w)+"px"},500);
				$('.product_content>.content_botton>ul>li.'+classname+'>ul:nth-of-type(2)>li').siblings().removeClass('activity').eq(a).addClass('activity');
			}
			}
		}else{
			if(a==0){
				
			}else{
				a--;
				if(a>=0){
					$('.product_content>.content_botton>ul>li.'+classname+'>ul:nth-of-type(1)').animate({'margin-left':(-a*w)+"px"},500);
					$('.product_content>.content_botton>ul>li.'+classname+'>ul:nth-of-type(2)>li').siblings().removeClass('activity').eq(a).addClass('activity');
				}
			}
		}
		switch (classname){
			case 'tushu':
				current_tushu=a;
				break;
			case 'zhuti':
				current_zhuti=a;
				break;
			case 'youxi':
				current_youxi=a;
				break;
			case 'yingyong':
				current_yingyong=a;
				break;
			
		}
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
