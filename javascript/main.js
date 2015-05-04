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
    function moveBackgroundImg(scrollOffset) { //move background image base on window scroll offset.
        movingBGImgs.each(function () {
            var element = $(this);
            var offset = element.offset().top - navigationBarHeight - scrollOffset / 1.5;
            element.css('background-position', '50% ' + offset + "px");
        });
    }

    function lineWrapAnimation(containerId, elementClass) {
        var elementWidth = $(elementClass).width();
        var elementHeight = $(elementClass).height();
        var numberForLine = Math.floor($(containerId).width() / elementWidth);
        var widthGap = ((($(containerId).width()) - (numberForLine * elementWidth)) / (numberForLine + 1));
        var max = 0;
        $(elementClass + ':visible').each(function (index) {
            var numberOfLine = Math.floor(index / numberForLine) + 1;
            if (numberOfLine > max) {
                max = numberOfLine;
            }
            $(this).css({
                left: index % numberForLine === 0 ? widthGap : index % numberForLine * (elementWidth + widthGap) + widthGap,
                top: Math.floor(index / numberForLine) === 0 ? 0 : Math.floor(index / numberForLine) * elementHeight
            })
        });
        $(containerId).css({height: elementHeight * max});
    }

    $document.ready(function () {

        // set jump
        $(".scroll-go-to").arctic_scroll();

        // init navigation bar
        $('body').scrollspy({target: '#navbar-example'});

        // register moving back ground image
        movingBGImgs = $('.cover');

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

        $(window).resize(function () {
            lineWrapAnimation('.mentor-container', '.mentor-show');
            lineWrapAnimation('.fellow-container', '.fellow-show');
        });

        // faq controller
        $('.panel-body').hide();
        $('.panel-heading').on('click', function () {
            var answer = $(this).siblings();
            if (answer.is(":hidden")) {
                answer.slideDown();
            } else {
                answer.slideUp();
            }
            $(this).parent().siblings().find('.panel-body').slideUp();
        });

        //init mentors positions
        lineWrapAnimation('.mentor-container', '.mentor-show');

        //init fellows positions
        lineWrapAnimation('.fellow-container', '.fellow-show');

        //contact form validation
        var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        $("#errorName").css("display", "none");
        $("#errorEmailApply").css("display", "none");
        $("#errorEmailContact").css("display", "none");
        $("#contactName").focus(function () {
            $(this).css("background-color", "#FFFFCC");
        });
        $("#contactName").blur(function () {
            $(this).css("background-color", "#D6D6FF");
            if ($(this).val().length < 4) {
                $("#errorName").css("display", "block");
            }
            else {
                $("#errorName").css("display", "none");
            }
        });
        $("#contactEmailApply").focus(function () {
            $(this).css("background-color", "#FFFFCC");
        });
        $("#contactEmailApply").blur(function () {
            $(this).css("background-color", "#D6D6FF");
            var email_val = $("#contactEmailApply").val();
            if (!search_str.test(email_val)) {
                $("#errorEmailApply").css("display", "block");
            }
            else {
                $("#errorEmailApply").css("display", "none");
            }
        });
        $("#contactEmailContact").focus(function () {
            $(this).css("background-color", "#FFFFCC");
        });
        $("#contactEmailContact").blur(function () {
            $(this).css("background-color", "#D6D6FF");
            var email_val = $(this).val();
            if (!search_str.test(email_val)) {
                $("#errorEmailContact").css("display", "block");
            }
            else {
                $("#errorEmailContact").css("display", "none");
            }
        });

        // set arcText for mentors' name
        $('h2.mentorsName').arctext({radius: 120, dir: -1});

        // set arcText for fellows' name
        //$('h2.fellowsName').arctext({radius: 55, dir: -1});
    });

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
                elem: $(this),
                speed: 1000
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