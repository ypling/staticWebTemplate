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
            var offset = element.offset().top - navigationBarHeight - scrollOffset / 2;
            element.css('background-position', '50% ' + offset + "px");
        });
    }

    function checkName(tempName) {
        return tempName.length > 2 ? true : false;
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

        // validation
        var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        $("#errorName").css("display", "none");
        $("#errorEmail").css("display", "none");
        $("#contactName").focus(function () {
            $("#contactName").css("background-color", "#FFFFCC");
        });
        $("#contactName").blur(function () {
            $("#contactName").css("background-color", "#D6D6FF");
            if ($("#contactName").val().length < 4) {
                $("#errorName").css("display", "block");
            }
            else {
                $("#errorName").css("display", "none");
            }
        });
        $("#contactEmail").focus(function () {
            $("#contactEmail").css("background-color", "#FFFFCC");
        });
        $("#contactEmail").blur(function () {
            $("#contactEmail").css("background-color", "#D6D6FF");
            var email_val = $("#contactEmail").val();
            if (!search_str.test(email_val)) {
                $("#errorEmail").css("display", "block");
            }
            else {
                $("#errorEmail").css("display", "none");
            }
        });

        // set arcText for employees' name
        var $text = $('h2.name');
        $text.arctext({radius: 120, dir: -1});

        // set employee filter
        $(".filter li").employeeFilter();

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

    $.fn.employeeFilter = function () {
        var filterArea = $(this).closest('section');
        var employeeCell = filterArea.find('div.emp');
        $(this).on('click', function () {
            var $this = $(this);
            var needShowClass = $this.attr("class") ? $this.attr("class") : "all";
            if (needShowClass !== "all") {
                employeeCell.parent().hide();
                filterArea.find("div." + needShowClass).show();
            } else {
                employeeCell.parent().show();
            }
        });
        employeeCell.on('mouseenter',function(){

        });
        employeeCell.on('mouseleave',function(){

        });
    };

})(jQuery, 'smartresize');

