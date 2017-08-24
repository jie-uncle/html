var pages=document.getElementsByClassName('page');
var current =0,next=0;
var dir =true;
var downnum,upnum;

document.body.addEventListener('touchstart',function(e){
	downnum=e.touches[0].pageX;
});
document.body.addEventListener('touchmove',function(e){
	upnum=e.touches[0].pageX;
});
document.body.addEventListener('touchend',function(e){
	isDir();
	
});

function isDir(){
	//屏蔽误碰的问题
	if(Math.abs(downnum-upnum) > 30){
		//判断触摸的方向
		downnum-upnum > 0?dir = true : dir = false;
		downnum==0;
		upnum==	0;
		pageMove();
		
	}
}
function pageMove(){
	if(dir){
		next=current+1;
		next >= pages.length ? next = 0 : 0;
		pages[current].className='page page'+current+' toTop';
		pages[next].className='page page'+next+'  frombottom';
		current=next;
		
	}else{
		next=current-1;
		next < 0 ? next = pages.length - 1 : 0;
		pages[current].className='page page'+current+' toBottom';
		pages[next].className='page page'+next+'  fromTop';
		current=next;
	}
		
	
}
