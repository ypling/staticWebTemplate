/**
 * Created by Haizhou on 4/24/2015.
 */
(function ($) {
    "use strict";
    // variable declare
    var navigationBarHeight = 70;
    var $document = $(document);

    // function define
    // layout mentors and fellows
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

    function checkContactUsForm() {
        var search_str = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        $("#errorName").css("display", "none");
        $("#errorEmailApply").css("display", "none");
        $("#errorEmailContact").css("display", "none");
        $("#contactName")
            .focus(function () {
                $(this).css("background-color", "rgba(255, 255, 255, 0.75)");
            })
            .blur(function () {
                $(this).css("background-color", "rgba(255, 255, 255, 0.95)");
                if ($(this).val().length < 4) {
                    $("#errorName").css("display", "block");
                }
                else {
                    $("#errorName").css("display", "none");
                }
            });
        $("#contactEmailContact")
            .focus(function () {
                $(this).css("background-color", "rgba(255, 255, 255, 0.75)");
            })
            .blur(function () {
                $(this).css("background-color", "rgba(255, 255, 255, 0.95)");
                var email_val = $(this).val();
                if (!search_str.test(email_val)) {
                    $("#errorEmailContact").css("display", "block");
                }
                else {
                    $("#errorEmailContact").css("display", "none");
                }
            });
    }

    function checkRegistrationForm() {
        var $radioBtn = $('input[name="academy_type"]');
        var $info = $radioBtn.closest('form').find('.radio-btn-help');
        var checkedRadioBtn = 'brilentBootcamp';
        var regForEdu = /.edu$/i;

        $radioBtn.on('change', function () {
            checkedRadioBtn = $(this).val();
            infoUpdate($info);
        });

        $('#email').on('change', function () {
            infoUpdate($info);
        });

        function infoUpdate(info) {
            var money = 0;
            info.empty();
            if (checkedRadioBtn === 'onlineAcademy') {
                money = regForEdu.test($('#email').val()) ? 199.00 : 299.00;
                info.append("Online Academy cost $299.00 for regular, $199.00 for Students." +
                "<br>*Student means email is ended with .edu.");
            } else {
                money = 0;
                info.append('Brilent Bootcamp is FREE!');
            }
            info.append("<br>Now you need pay: " + money);
        }
    }

    $document.ready(function () {

        // set jump
        $(".scroll-go-to").arctic_scroll();

        // init navigation bar
        $('body').scrollspy({target: '#navbar-example'});

        // register moving background image
        $('.cover').moveBackgroundImg(navigationBarHeight);

        // show and hide navigation bar
        $("#navbar-example").toggleNavigationBar(navigationBarHeight);

        //init mentors positions
        lineWrapAnimation('.mentor-container', '.mentor-show');

        //init fellows positions
        lineWrapAnimation('.fellow-container', '.fellow-show');

        $(window).resize(function () {
            lineWrapAnimation('.mentor-container', '.mentor-show');
            lineWrapAnimation('.fellow-container', '.fellow-show');
        });

        //contact form validation
        checkContactUsForm();
        checkRegistrationForm();

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
                $htmlBody.stop(true, false).animate({scrollTop: ($(target).offset().top + toMove)}, allOptions.speed, function () {
                    $("#bs-example-navbar-collapse-1").collapse('hide');
                });
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove}, allOptions.speed, function () {
                    $("#bs-example-navbar-collapse-1").collapse('hide');
                });
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(target).offset().top)}, allOptions.speed, function () {
                    $("#bs-example-navbar-collapse-1").collapse('hide');
                });
            }
        });

    };

    $.fn.toggleNavigationBar = function (height) {
        var $nav = $(this);
        $(window).scroll(function () {
            if ($(window).height() - ($(document).scrollTop()) <= height) {
                $nav.slideDown(300);
            }
            if ($(document).scrollTop() <= height) {
                $nav.slideUp(300);
            }
        });
    };

    $.fn.moveBackgroundImg = function (height) { //move background image base on window scroll offset.
        var $this = $(this);
        $(window).scroll(function () {
            var scrollOffset = $document.scrollTop();
            $this.each(function () {
                var element = $(this);
                var offset = element.offset().top - height - scrollOffset / 1.5;
                element.css('background-position', '50% ' + offset + "px");
            });
        });
    };
})(jQuery, 'smartresize');