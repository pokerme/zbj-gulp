/**
 * Created by poker_one on 2015/2/26.
 */
$(function(){
    function hideNav(){
        $("#j-ui-header-bd-wrap,.ui-tools-bottom").hide();
    }
    function voiceAnimation(){
        var frame = [0, 1, 2];
        function animate(){
            if ( !frame.length ) {
                frame = [0, 1, 2];
            }
            var currentFrame = frame.shift();
            $("#j-voice").attr("class", "voice icon-zt-voice-" + currentFrame);
        }
        setInterval( animate, .7 * 1000 );
    }

    function sellerInfo(){
        $(".talk2-head")
            .hover(function(){
                $('.talk2-layer').animate({height: 140});
            },function(){
                $('.talk2-layer').animate({height: 35});
            });
    }
    function pageSlide(starget,prev,next,item){
        ZDK.define(function(require){
            require('module.slider');
            ZDK.module.slide({
                target:$(starget),
                item:'li',
                size:item,
                step:1,
                prev: prev,
                next: next,
                time:400,
                timeout:5000,
                path:false
            }).on("play");
        });
    }

    function showInfo(){
        var hoveritem = $(".spu-dbi-item");
        hoveritem.hover(function(){
            $(this).find('.spu-dbi-hidebox').fadeIn(150);
        },function(){
            $(this).find('.spu-dbi-hidebox').fadeOut(150);
        });
    }

    function changeColor(id){
        $(".step-title-words").find('span.left-block').addClass('icon-zt-time6').removeClass('icon-zt-talkleft');
        $(".step-title-words").find('span.center-block').css('background','#fdc47d');
        $(".step-title-words").find('span.right-block').addClass('icon-zt-time7').removeClass('icon-zt-talkright');

        $("#timeline"+id).parent().find('span').eq(0).addClass('icon-zt-talkleft').removeClass('icon-zt-time6');
        $("#timeline"+id).parent().find('span').eq(1).css('background','#ff8e00');
        $("#timeline"+id).parent().find('span').eq(2).addClass('icon-zt-talkright').removeClass('icon-zt-time7');
    }

    function changePosition(flags,dot,id){
        var timeFlag = $("#timeline-flag");
        var timeDot  = $("#timeline-dot");
        timeFlag.stop().animate({top:flags},1000,'swing');
        timeDot.stop().animate({top:dot},1000,'swing');
        timeFlag.empty().html($("#timeline"+id).attr('data-time'));
        timeDot.empty().html($("#timeline"+id).attr('data-day'));
    }

    function scrollTimeline(){
        var timeFlag = $("#timeline-flag");
        var timeDot  = $("#timeline-dot");
        var lineheight1 = $("#timeline1").offset().top;
        var lineheight2 = $("#timeline2").offset().top;
        var lineheight3 = $("#timeline3").offset().top;
        var lineheight4 = $("#timeline4").offset().top;
        var lineheight5 = $("#timeline5").offset().top;
        $(window).scroll(function(){
            var ScrollHeight = $(document).scrollTop();
            if(ScrollHeight>lineheight1-200&&ScrollHeight<lineheight2){
                changePosition(385,378,2);
                changeColor(2);

            }else if(ScrollHeight>=lineheight2&&ScrollHeight<lineheight3){
                changePosition(848,839,3);
                changeColor(3);
            }
            else if(ScrollHeight>=lineheight3&&ScrollHeight<lineheight4){
                changePosition(1337,1328,4);
                changeColor(4);
            }else if(ScrollHeight>=lineheight4&&ScrollHeight<lineheight5){
                changePosition(1786,1779,5);
                changeColor(5);
            }else if(ScrollHeight<=lineheight1-200){
                changePosition(8,0,1);
                changeColor(1);
            }else{
                timeFlag.stop().animate({top:1786},1000,'swing');
                timeDot.stop().animate({top:1779},1000,'swing');
                timeFlag.empty().html($("#timeline5").attr('data-time'));
                changePosition(1786,1779,5);
                changeColor(5);
            }

            if(ScrollHeight<500){
                $(".spu-leftmenu").fadeOut(200);
            }else{
                $(".spu-leftmenu").fadeIn(200);
            }

        });

        $(window).one('scroll',function(){
            var ScrollHeight = $(document).scrollTop();
            if(ScrollHeight>=$(".icon-zt-time1").offset().top-400){
                $(".icon-zt-time1").addClass('rock');
                setTimeout(function(){
                    $(".icon-zt-time1").removeClass('rock');
                },800);
            }
        });
    }

    function bindAddFav(){
        $(".icon-zt-collect").click(function(){
            var title = $("title").html();
            var url = window.location.href;
            addFavorite(title,url);
        });
    }

    function addFavorite(title,url){
        try{
            window.external.addFavorite(url,title);
        }catch(e){
            try{
                window.sidebar.addPanel(title,url,"");
            }catch(e){
                ZDK.Tips('抱歉，您所使用的浏览器无法完成此操作。加入收藏失败，请使用Ctrl+D进行添加',3000,'error');
            }
        }
    }

    function showpicDes(){
        $(".step-one-slide .step-one-item,.spu-show-imgbig").click(function(){
            var title = $(this).find("img").attr("data-title");
            var imgurl = $(this).find("img").attr("data-img");
            var des = $(this).find("img").attr("data-des");
            $(".spu-layer-title").empty().html(title);
            $(".spu-layer-img").attr("src",imgurl);
            $(".spu-layer-des").empty().html(des);
            $(".spu-fix-layer").show();
        });
        $(".spu-fix-layer").click(function(){
            $(".spu-fix-layer").hide();
        });
    }

    function lazyLoadImg(){
        $("img.lazyload").lazyload({
            effect : "fadeIn",
            threshold: 500,
            load: function(){
                $(this).removeClass('lazyload');
            }
        });
    }

    lazyLoadImg();

    showpicDes();
    bindAddFav();
    scrollTimeline();
    showInfo();
    pageSlide('#slide1','#prev1','#next1',3);
    pageSlide('#slide2','#prev2','#next2',3);
    pageSlide('#slide3','#prev3','#next3',3);
    pageSlide('#slide4','#prev4','#next4',4);

    hideNav();
    voiceAnimation();
    sellerInfo();
})