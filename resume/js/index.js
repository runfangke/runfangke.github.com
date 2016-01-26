/**
 * Created by JaYa on 2015/12/31.
 */
define(['jquery'],function($){

    function intval(v) {
        v = parseInt(v); //解析一个字符串，并返回一个整数
        return isNaN(v) ? 0 : v;//如果是NaN则返回0，否则返回V
    }
    function getPos(e) {
        var l = 0;
        var t = 0;
        var w = intval(e.style.width); //获取对象的宽度
        var h = intval(e.style.height);//获取对象的高度
        var wb = e.offsetWidth; //对象可见宽度
        var hb = e.offsetHeight;
        while (e.offsetParent) {
            l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
            t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
            e = e.offsetParent;
        }
        l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
        t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
        return {
            x: l,
            y: t,
            w: w,
            h: h,
            wb: wb,
            hb: hb
        };
    }
    function getScroll() {
        var t, l, w, h;
        if (document.documentElement && document.documentElement.scrollTop) {
            t = document.documentElement.scrollTop;
            l = document.documentElement.scrollLeft;
            w = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
        } else if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
        }
        return {
            t: t,
            l: l,
            w: w,
            h: h
        };
    }

   return {
       bannerFit: function(ele){
           var width = $(window).width();
           var height = $(window).height();
           var $ele = $(ele);

           return $ele.css({
               width: width,
               height: height
           });
       },
       navbarAnimate: function(ele){
           var $ele = $(ele);

           if ($(document).scrollTop() > 0){
               $ele.addClass("navbar-second");
           } else {
               $ele.removeClass("navbar-second");
           }
       },
       scroller: function(el, duration,scrollTopHeight){
           var scrollTopHeight = $(scrollTopHeight).height();
           if (typeof el != "object") {
               el = document.getElementById(el);
           }
           if (!el) return;
           var z = this;
           z.el = el;
           z.p = getPos(el);
           z.s = getScroll();
           z.clear = function() {
               window.clearInterval(z.timer);
               z.timer = null
           };
           z.t = (new Date).getTime();
           z.step = function() {
               var t = (new Date).getTime();
               var p = (t - z.t) / duration;
               if (t >= duration + z.t) {
                   z.clear();
                   window.setTimeout(function() {
                       z.scroll(z.p.y, z.p.x)
                   }, 13);
               } else {
                   st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
                   sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
                   z.scroll(st, sl);
               }
           };
           z.scroll = function(t, l) {
               window.scrollTo(l, t - scrollTopHeight)
           };
           z.timer = window.setInterval(function() {
               z.step();
           }, 13);
       }
   }
});