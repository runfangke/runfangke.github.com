(function($) {
    $.fn.hoverDelay = function(options) {
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function() {
                $.noop();
            },
            outEvent: function() {
                $.noop();
            }
        };
        var sets = $.extend(defaults, options || {});
        var hoverTimer, outTimer, that = this;
        return $(this).each(function() {
            $(this).hover(function() {
                clearTimeout(outTimer);
                hoverTimer = setTimeout(function() {
                    sets.hoverEvent.apply(that)
                }, sets.hoverDuring);
            }, function() {
                clearTimeout(hoverTimer);
                outTimer = setTimeout(function() {
                    sets.outEvent.apply(that)
                }, sets.outDuring);
            });
        });
    }
})(jQuery);

function Marquee(target, l_btn, r_btn, p_w, c_n, c_T) {
    this.target = target, this.l_btn = l_btn, this.r_btn = r_btn, this.p_w = p_w, this.c_n = c_n, this.movement = null, this.c_T = c_T, this.init = function() {
        this.animate();
    }, this.animate = function(direction) {
        var that = this;
        var p_w = that.p_w;
        var c_n = that.c_n;
        var c_T = that.c_T;
        var target = that.target;
        var moveElems = $(that.target).children();
        var l_moveElems = moveElems.splice(0, c_n);
        var r_moveElems = moveElems.splice(moveElems.length - 1, c_n);
        $(that.l_btn).click(function() {
            $(target).prepend($(r_moveElems)).css({
                "left": "-" + (p_w * c_n) + "px"
            });
            $(target).animate({
                "left": "0px"
            }, c_T, function() {
                moveElems = $(target).children();
                l_moveElems = moveElems.splice(0, c_n);
                r_moveElems = moveElems.splice(moveElems.length - 1, c_n);
            });
        });
        $(that.r_btn).click(function() {
            $(target).animate({
                "left": "-" + (p_w * c_n) + "px"
            }, c_T, function() {
                $(target).append($(l_moveElems)).css({
                    "left": "0px"
                });
                moveElems = $(target).children();
                l_moveElems = moveElems.splice(0, c_n);
                r_moveElems = moveElems.splice(moveElems.length - 1, c_n);
            });
        });
    }
}

function complexMarquee(target, l_c, r_c, c_T, width) {
    this.target = target, this.l_c = l_c, this.r_c = r_c, this.movement = null, this.c_T = c_T, this.width = width, this.init = function() {
        var str = '<span class="dot">';
        for (var i = 0; i < $(this.target).find("li").length; i++) {
            if (i == 0) {
                str += '<span class="active"></span>';
            } else {
                str += '<span class="default"></span>';
            }
        }
        str += '</span>';
        $(this.target).parent().append(str);
        $(this.target).find("li").not($(this.target).find("li").eq(0)).css({
            "left": "-" + this.width + "px",
            "display": "block"
        });
        this.dotHoverBind($(this.target).parent().find(".dot span"));
        this.clickChange();
    }, this.animate = function(prev, curr) {
        var block = $(this.target).find("li");
        var dot = $(this.target).parent().find(".dot");
        var len = block.length;
        var tmp_curr = (curr + len) % len;
        $(dot).find("span").removeClass("active").addClass("default");
        $(dot).find("span").eq(tmp_curr).removeClass("default").addClass("active");
        var sign = "";
        if (prev < curr) {
            sign = "-";
            $(block).eq(tmp_curr).css({
                "left": this.width + "px"
            });
        } else {
            sign = "+";
            $(block).eq(tmp_curr).css({
                "left": "-" + this.width + "px"
            });
        }
        $(block).eq(prev).animate({
            left: sign + this.width + "px"
        }, c_T);
        $(block).eq(tmp_curr).animate({
            left: 0
        }, c_T);
    }, this.dotHoverBind = function(elems) {
        var that = this;
        $(elems).each(function() {
            var thatt = $(this);
            thatt.hoverDelay({
                hoverDuring: 100,
                hoverEvent: function() {
                    if ($(thatt).hasClass("active")) {
                        return;
                    } else {
                        var prev = $(".dot .active").prevAll().length;
                        var curr = $(thatt).prevAll().length;
                        that.animate(prev, curr)
                    }
                },
                outEvent: function() {}
            })
        })
    }, this.clickChange = function() {
        var that = this;
        $(".news .change").click(function() {
            if ($(this).hasClass(r_c)) {
                var prev = $(".dot .active").prevAll().length;
                var curr = prev + 1;
            } else {
                var prev = $(".dot .active").prevAll().length;
                var curr = prev - 1;
            }
            console.log(prev + " , " + curr);
            that.animate(prev, curr)
        });
    }
}

function AnimateBanner(parent, bg_d_T, i_d_T, o_d_T, c_T) {
    this.parent = parent, this.bg_d_T = bg_d_T, this.i_d_T = i_d_T, this.o_d_T = o_d_T, this.c_T = c_T, this.movement = null, this.init = function() {
        this.ifIE6Init();
        this.moveAuto();
        this.changePro();
        this.hoverBanner();
    }, this.ifIE6Init = function() {
        $("#banner .pr-info li .i-o").add("#banner .pr-info li .i-s").add("#banner .bg li").css({
            "opacity": "0"
        });
        $("#banner .pr-info li.weishi .i-o").add("#banner .pr-info li.weishi .i-s").add("#banner .bg .weishi").css({
            "opacity": "1"
        });
    }, this.animate = function(prev, curr) {
        var that = this;
        $("#sub-nav" + " ." + prev).find("a").removeClass("active");
        $("#sub-nav" + " ." + curr).find("a").addClass("active");
        if (navigator.userAgent.indexOf("MSIE 6.0") != -1) {
            $("#banner .bg" + " ." + prev).animate({
                "opacity": "0"
            }, that.bg_d_T);
            $("#banner .bg" + " ." + curr).animate({
                "opacity": "1"
            }, that.bg_d_T);
            $("#banner .pr-info" + " ." + prev).find(".i-s").css({
                "opacity": "0",
                "display": "none"
            });
            $("#banner .pr-info" + " ." + curr).find(".i-s").css({
                "opacity": "1",
                "display": "block"
            });
            $("#banner .pr-info" + " ." + prev).find(".i-o").css({
                "opacity": "0",
                "display": "none"
            });
            $("#banner .pr-info" + " ." + curr).find(".i-o").css({
                "opacity": "1",
                "display": "block"
            });
        } else {
            $("#banner .bg" + " ." + prev).animate({
                "opacity": "0"
            }, that.bg_d_T);
            $("#banner .bg" + " ." + curr).animate({
                "opacity": "1"
            }, that.bg_d_T);
            $("#banner .pr-info" + " ." + prev).find(".i-s").animate({
                "opacity": "0",
                "top": "40px"
            }, that.i_d_T, function() {
                $("#banner .pr-info .i-s").css({
                    "display": "none"
                }, {
                    "opacity": "0"
                });
                $("#banner .pr-info" + " ." + curr).find(".i-s").css({
                    "top": "-40px",
                    "display": "block"
                }).animate({
                    "opacity": "1",
                    "top": "0"
                }, that.i_d_T, function() {
                    if (!that.movement) {
                        that.movement = setInterval(that.autoMoveFunc(that.parent), that.c_T);
                    }
                });
            });
            $("#banner .pr-info" + " ." + prev).find(".i-o").css({
                "opacity": "0",
                "display": "none"
            });
            $("#banner .pr-info" + " ." + curr).find(".i-o").css({
                "opacity": "1",
                "display": "block"
            });
        }
    }, this.moveAuto = function() {
        var that = this;
        this.movement = setInterval(that.autoMoveFunc(that.parent), that.c_T);
    }, this.autoMoveFunc = function(parent) {
        var that = this;
        return function() {
            var prev = $("#sub-nav li").find(".active").parent().attr("class");
            var curr = $("#sub-nav li").find(".active").parent().next().length ? $("#sub-nav li").find(".active").parent().next().attr("class") : $("#sub-nav li").eq(0).attr("class");
            that.animate(prev, curr);
        }
    }, this.changePro = function() {
        var that = this;
        $("#sub-nav").find("li").click(function() {
            clearInterval(that.movement);
            if ($(this).find("a").hasClass("active")) {
                return;
            } else {
                var prev = $("#sub-nav li").find(".active").parent().attr("class");
                var curr = $(this).attr("class");
                that.animate(prev, curr)
            }
        });
    }
    this.hoverBanner = function() {
        var that = this;
        $("#banner .i-o").hover(function() {
            clearInterval(that.movement);
        }, function() {
            that.moveAuto();
        });
    }
}
anquan.index = {
    min_width: 1168,
    min_height: 636,
    win_height: $(window).height() < this.min_height ? this.min_height : $(window).height(),
    win_width: $(window).width() < this.min_width ? this.min_width : $(window).width(),
    funcExpMarquee: new Marquee($(".func-exp ul"), $(".func-exp .l-c"), $(".func-exp .r-c"), 361, 1, 1000),
    hotZtMarquee: new complexMarquee($(".news #hot-zt"), "l-c", "r-c", 1000, 490),
    bannerAction: new AnimateBanner($("#banner"), 500, 800, 800, 5800),
    init: function() {
        this.showCont();
        this.resize();
        this.posHeader();
        this.mediaquery();
        $(window).bind("resize", function() {
            anquan.index.resize();
            anquan.index.posHeader();
            anquan.index.mediaquery();
        });
        $(window).bind("scroll", function() {
            anquan.index.gotoTop();
            anquan.index.resize();
            anquan.index.posHeader();
        });
        this.openNavPanel($("#main-nav .pro a"), $("#main-nav .m-c-m"));
        this.openNavPanel($("#main-nav .community a"), $("#main-nav .m-c-c"));
        this.openVersionPanel();
        this.funcExpMarquee.init();
        this.hotZtMarquee.init();
        this.bannerAction.init();
        this.openCodePanel();
        this.downloadAct(800);
        this.scrollDown(1000);
        this.playAD(1000, 1000, 1500, 500);
    },
    playAD: function(open_T, close_T, stop_T, c_T) {
        $(".ad_xm").css({
            "display": "block"
        });
        $(".ad_xm .min").click(function(e) {
            if ($(e.target).hasClass("xm_min_download")) return;
            window.open('', '_blank');
        });
        $(".ad_xm .max").click(function(e) {
            if ($(e.target).hasClass("xm_max_download")) return;
            window.open('', '_blank');
        });
        $(".ad .max").animate({
            "height": "360px"
        }, open_T, function() {
            setTimeout(lastMove(close_T, c_T), stop_T);
        });

        function lastMove(close_T, c_T) {
            return function() {
                $(".ad .max").animate({
                    "height": "60px",
                    "opacity": "0"
                }, close_T, function() {
                    $(".ad .max").css({
                        "display": "none"
                    });
                    $(".ad .min").css({
                        "opacity": "1",
                        "height": "0px"
                    }).animate({
                        "height": "60px"
                    }, c_T);
                });
            }
        }
    },
    mediaquery: function() {
        if (navigator.userAgent.indexOf("MSIE 6.0") != -1 || navigator.userAgent.indexOf("MSIE 7.0") != -1 || navigator.userAgent.indexOf("MSIE 8.0") != -1) {
            var width = $(window).width();
            var pr_info = $("#banner .pr-info");
            var h2 = $("#banner .pr-info .i-s h2");
            var p = $("#banner .pr-info .i-s p");
            var i_o = $("#banner .pr-info li .i-o");
            if (width >= 1440 && width < 1680) {
                $(pr_info).css({
                    "top": "27%"
                });
                $(h2).css({
                    "font-size": "54px",
                    "line-height": "100px"
                });
                $(p).css({
                    "font-size": "16px",
                    "line-height": "30px",
                    "width": "710px"
                });
                $(i_o).css({
                    "padding-top": "24%"
                });
            } else if (width >= 1680 && width < 1920) {
                $(pr_info).css({
                    "top": "26%"
                });
                $(h2).css({
                    "font-size": "60px",
                    "line-height": "126px"
                });
                $(p).css({
                    "font-size": "18px",
                    "line-height": "34px",
                    "width": "800px"
                });
                $(i_o).css({
                    "padding-top": "33%"
                });
            } else if (width >= 1920) {
                $(pr_info).css({
                    "top": "24%"
                });
                $(h2).css({
                    "font-size": "72px",
                    "line-height": "160px"
                });
                $(p).css({
                    "font-size": "20px",
                    "line-height": "36px",
                    "width": "890px"
                });
                $(i_o).css({
                    "padding-top": "40%"
                });
            } else if (width < 1440) {
                $(pr_info).css({
                    "top": "22%"
                });
                $(h2).css({
                    "font-size": "48px",
                    "line-height": "86px"
                });
                $(p).css({
                    "font-size": "14px",
                    "line-height": "24px",
                    "width": "620px"
                });
                $(i_o).css({
                    "padding-top": "19%"
                });
            }
        }
    },
    showCont: function() {
        $("#content").add("#footer").css({
            "display": "block"
        });
    },
    resize: function() {
        var that = anquan.index;
        var scroll_len = $(window).scrollTop();
        if ($(window).height() < (that.min_height + 100)) {
            $("#banner .scroll").css({
                "display": "none"
            });
        } else {
            $("#banner .scroll").css({
                "display": "block"
            });
        }
        that.win_height = $(window).height() < that.min_height ? that.min_height : $(window).height();
        that.win_width = $(window).width() < that.min_width ? that.min_width : $(window).width();
        $("#home").css({
            "width": that.win_width + "px"
        });
        $("#banner").css({
            "height": that.win_height + "px"
        });
        $("#header").css({
            "width": that.win_width + "px"
        });
    },
    posHeader: function() {
        var scroll_len = $(window).scrollTop();
        var stop_len = $(window).scrollTop() - 80;
        var that = anquan.index;
        var s_T = 500;
        if (scroll_len >= 10 && $(window).width() < that.min_width) {
            $("#header").addClass("down");
            $("#header").css({
                "position": "absolute",
                "top": scroll_len + "px"
            });
        } else if (scroll_len >= 10 && $(window).width() >= that.min_width) {
            if ($("#header").hasClass("down")) {
                return;
            }
            $("#header").addClass("down");
            $("#header").css({
                "position": "fixed",
                "top": "-80px"
            }).animate({
                "top": "0"
            }, s_T);
        } else {
            $("#header").removeClass("down");
            $("#header").css({
                "position": "absolute",
                "top": "0"
            });
        }
    },
    openNavPanel: function(target, panel) {
        $(target).mouseenter(function() {
            $(this).addClass("hover");
            $(panel).css({
                "display": "block"
            });
        });
        $(target).mouseleave(function(e) {
            if (e.relatedTarget.nodeName != "A") {
                if (navigator.userAgent.indexOf("MSIE 6.0") == -1 || e.relatedTarget.nodeName != "LI") {
                    $(this).removeClass("hover");
                    $(panel).css({
                        "display": "none"
                    });
                }
            }
        });
        $(panel).mouseleave(function(e) {
            if (e.relatedTarget.nodeName != "A" || !$(e.relatedTarget).parent().hasClass("weishi")) {
                $(target).removeClass("hover");
                $(panel).css({
                    "display": "none"
                });
            }
        });
        $("body").not("#main-nav").hover(function() {
            $("#main-nav li a").removeClass("hover");
            $("#main-nav .m-c-p").css({
                "display": "none"
            });
        });
    },
    openVersionPanel: function() {
        var pro_e = $(".pr-info .m-v");
        var panel = $(".pr-info .m-v-panel");
        $(pro_e).hover(function() {
            $(this).next(".m-v-panel").css({
                "display": "block"
            });
        });
        $(panel).hover(function() {}, function() {
            $(this).css({
                "display": "none"
            });
        });
    },
    openCodePanel: function() {
        var pro_e = $(".interact .weixin");
        $(pro_e).hover(function() {
            $(this).find("span").css({
                "display": "block"
            });
        }, function() {
            $(this).find("span").css({
                "display": "none"
            });
        });
    },
    gotoTop: function() {
        if ($(document).scrollTop() == 0) {
            $(".goto").hide();
            return;
        }
        if (navigator.userAgent.indexOf("MSIE 6.0") != -1) {
            var scrollTop = $(window).scrollTop() + $(window).height() - 80;
            if (scrollTop < 0) {
                scrollTop = 0;
            };
            $(".goto").css({
                "top": scrollTop + "px"
            }).show();
        } else {
            $(".goto").css({
                "bottom": "0"
            }).show();
        }
    },
    downloadAct: function(c_T) {
        $("#banner .download").hover(function() {
            $("#banner .download span").css({
                "top": "-48px"
            }).animate({
                "top": "48px"
            }, c_T, function() {
                $("#banner .download span").css({
                    "top": "-14px"
                }).animate({
                    "top": "0"
                }, c_T / 4);
            })
        }, function() {});
    },
    scrollDown: function(c_T) {
        $(".scroll span").click(function() {
            var height = $(window).height();
            tmp_height = height - $(window).scrollTop();
            $("body").animate({
                "top": "-" + tmp_height + "px"
            }, c_T, function() {
                $("body").css({
                    "top": "0"
                });
                $(window).scrollTop(height);
                anquan.index.posHeader();
            });
        });
    }
};