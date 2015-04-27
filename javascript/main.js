/**
 * Created by Haizhou on 4/24/2015.
 */
(function ($) {
    "use strict";
    //variable declare
    var navigationBarHeight = 70;
    var $document = $(document);
    var movingBGImgs;
    //function define
    function registerMovingBGImg(selectorStr){
        movingBGImgs = $(selectorStr);
    }
    function moveBackgroundImg(scrollOffset) { //move background image base on window scroll offset.
        movingBGImgs.each(function(){
            var element = $(this);
            var offset = element.offset().top-scrollOffset/2;
            element.css('background-position','50% '+offset+"px");
        });
    }

    $document.ready(function () {

        // set jump
        $(".scroll-go-to").arctic_scroll();

        // init navigation bar
        $('body').scrollspy({target: '#navbar-example'});
        
        // register moving back ground image
        registerMovingBGImg('.cover');

        // show and hide navigation bar
        $(window).scroll(function () {
            var $nav = $("#navbar-example");
            if ($(window).height() - ($(document).scrollTop()) <= navigationBarHeight) {
                $nav.slideDown(300);
            }
            if ($(document).scrollTop() <= navigationBarHeight) {
                $nav.slideUp(300);
            }
            //Moving background image slower than window
            moveBackgroundImg($document.scrollTop());
        });
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
                elem: $(this),
                speed: 500
            },

            allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                target = ($this.attr('data-target')) ? $this.attr('data-target') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(target).offset().top + toMove)}, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove}, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(target).offset().top)}, allOptions.speed);
            }
        });

    };
})(jQuery, 'smartresize');

