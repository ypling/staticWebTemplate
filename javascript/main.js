/**
 * Created by Haizhou on 4/24/2015.
 */
(function ($) {
    "use strict";
    var $document = $(document);
    $document.ready(function () {
        $(".scroll-go-to").arctic_scroll();
        $('body').scrollspy({target: '#navbar-example'});
        $(window).scroll(function () {
            var $nav = $("#navbar-example");
            if ($(window).height() - ($(document).scrollTop()) <= 70) {
                $nav.slideDown(300);
            }
            if ($(document).scrollTop() <= 70) {
                $nav.slideUp(300);
            }
        })
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

