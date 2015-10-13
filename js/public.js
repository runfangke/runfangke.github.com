// JavaScript Document





$(function(){
	/*侧边栏*/
	$('#sidebar li .js_ht').mouseover(function(){
		$(this).siblings(".ht").stop().animate({"left":"-240px","opacity":"1"}, 500).show();
		$(this).closest("li").css("background","#492d22");
	})
	$('#sidebar li .js_ht').mouseout(function(){
		$(this).siblings(".ht").stop().animate({"left":"-300px","opacity":"0"}, 500).hide();
		$(this).closest("li").css("background","#875f50");
	})
	var top=($(window).height()-$("#sidebar").height())/2+$(window).scrollTop()+"px";
	$("#sidebar").css({'top':top});
	$("#sidebar li.first").hide();
	window.onscroll = function(){
		if($(document).scrollTop() > 100){
			$("#sidebar li.first").show();
		}else{
			$("#sidebar li.first").hide();
		}
	}
	$("#sidebar li.first").click(function(){
		$("#sidebar").animate({'top':top},600);
		$('html,body').animate({'scrollTop':0},600);
		$("#sidebar li.first").hide();
	})
	$("#sidebar ul li").hover(
		function(){
			$(this).find(".sidebox").stop().animate({"width":"135px"},200).css({"opacity":"1","filter":"Alpha(opacity=100)","background":"#492d22"});
			$(this).find(".sidebox i").attr({"class":$(this).find(".sidebox i").attr("class")+"_s"});
		},function(){
			$(this).find(".sidebox").stop().animate({"width":"62px"},200).css({"opacity":"1","filter":"Alpha(opacity=100)","background":"#875f50"});
			$(this).find(".sidebox i").stop().attr({"class":$(this).find(".sidebox i").attr("name")});
		});
	$("#sidebar ul li i.top").hover(function(){
		$(this).css("background","url('images/menu/toph.png') no-repeat");
	},function(){
		$(this).css("background","url('images/menu/top.png') no-repeat");
	});

	//img-show-box
	$(".imgShow1").hover(function(){
		$(".show-img-boxzz",this).animate({opacity:.7},200);
		$(".row1",this).show().animate({top: "42%"},300);
		$(".row2",this).show().animate({bottom: "42%"},300);
	},function(){
		$(".show-img-boxzz",this).animate({opacity:0},200);
		$(".row1",this).hide().animate({top: "0%"},200);
		$(".row2",this).hide().animate({bottom: "0%"},200);
	});
	$(".show-small-box").hover(function(){
		$(".show-img-boxzz",this).animate({opacity:.7},200);
		$(".row1",this).show().animate({top: "35%"},300);
		$(".row2",this).show().animate({bottom: "35%"},300);
	},function(){
		$(".show-img-boxzz",this).animate({opacity:0},200);
		$(".row1",this).hide().animate({top: "0%"},200);
		$(".row2",this).hide().animate({bottom: "0%"},200);
	});

	//二级菜单
	$("#menu>li").hover(function(){
		$(this).children("ul").slideDown(100);
	},function(){
		$(this).children("ul").slideUp(100);
	});
	//三级菜单
	$("#menu>li>ul>li").hover(function(){
		$(this).children("ul").slideDown(100);
	},function(){
		$(this).children("ul").slideUp(100);
	});
});
