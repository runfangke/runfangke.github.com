function box(ntag,ncontent,index,count)
{
	for(i=1; i<count+1; i++) {
      if (i==index) {
		  //document.getElementById(ntag+i).className="bbp";
		  $("#" + ntag + i).addClass("bbp");
		  //$("#" + ncontent + i).removeClass("bbp");
		  document.getElementById(ncontent+i).className="";
	  }
	  else {
		  //$("#" + ntag + i).removeClass("disnone");
		  $("#" + ncontent + i).addClass("disnone");
		  document.getElementById(ntag+i).className="";
		  //document.getElementById(ncontent+i).className="disnone";
	  }
    }
}

$(function(){
	$(".js_sysmallicon li a").hover(function(){
		$(this).parent().addClass("sy_smallicon_hover");
	},function(){
		$(this).parent().removeClass("sy_smallicon_hover");
	})
	$(".sy_smallicon_3pb").hide();
	$(".js_sysmallicon li a.sy_smallicon_3").hover(function(){
		$(this).find(".sy_smallicon_3pb").show();
	},function(){
		$(this).find(".sy_smallicon_3pb").hide();
	})
	$(".sy_smallicon_7pb").hide();
	$(".sy_smallicon_5pb").hide();
	$('.js_sysmallicon li .js_ht').mouseover(function(){
		$(this).siblings(".ht").stop().animate({"top":"-300px","opacity":"1"}, 500).show(); 
	})
	$('.js_sysmallicon li .js_ht').mouseout(function(){
		$(this).siblings(".ht").stop().animate({"top":"-400px","opacity":"0"}, 500).hide(); 
	})
	
})
var isClick=false;
$(document).ready(function(){
	$(".search_icon").focus(function(){
		if($(".search_inp").width()>0){
			isClick=true;
			topSearch();
		}else{
			$(".search_inp").val("");
			$(".search_inp").animate({width:"187px","opacity":"1"},"slow").show().focus();
			$(this).closest(".search").animate({width:"200px"},"slow").addClass("search_bor");
			var navwidth = "auto";
			var liwidth = navwidth/6;
			$("ul.nav li").animate({width:liwidth+"px"},"slow");
		}
		
	})
	$(".search_inp").blur(function(){
		setTimeout("searchInpBlur()",500);
	});
//动态生成导航栏目的宽度
$('input[type="button"]').bind('focus',function(){
		if(this.blur){ //如果支持 this.blur
			this.blur();
		};
	});
});
function topSearch(){
	$(".search_inp").focus();
	return;
}
function searchInpBlur(){
	if(!isClick){
	$(".search_inp").animate({width:"0","opacity":"0"},"slow");
	$(".search").animate({"width":"0"},"slow");
	var navwidth = "auto";
	var liwidth = navwidth/6;
	$("ul.nav li").animate({width:liwidth+"px"},"slow");
	}
	isClick=false;
}
/*导航*/
window.onload=function()
{

	var nav=document.getElementById('js_nav');
	var aLi=$("#js_nav").children();
	
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].onmouseover=function()
		{
			
			clearInterval(this.timer);  //想要关掉的是out的定时器
			var oDiv=this.children[0];
			var oH3=this.children[1];
			this.timer=setTimeout(function(){
				
				oDiv.style.display='block';	
				oH3.className='daohang_a daohanghover';
				
			},200);
				
		};	
		
		aLi[i].onmouseout=function()
		{
			clearInterval(this.timer);
			
			var oDiv=this.children[0];
			var oH3=this.children[1];
			this.timer=setTimeout(function(){
				oDiv.style.display='none';	
				oH3.className='daohang_a';
			},200);
				
		};	
	}
	
		
};

