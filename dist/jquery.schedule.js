;(function ($, window, document, undefined) {
    "use strict";

    // Create the defaults once
    var pluginName = "jqs",
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {

            var $this = this;

            $(this.element)
                .addClass("jqs")
                .on('click', ".jqs-wrapper", function (event) {
                    console.log(event);

                    if ($(event.target).hasClass("jqs-select") || $(event.target).parents(".jqs-select").length > 0) {
                        return false;
                    }

                    var top = Math.round(event.offsetY / 20);

                    $('<div class="jqs-select"><div class="jqs-select-placeholder"><span>' + $this.periodeInit(top) + '</span></div></div>')
                        .css('top', top * 20)
                        .attr('id', event.timeStamp)
                        .appendTo($(this))
                        .draggable({
                            grid: [0, 20],
                            containment: "parent",
                            drag: function (event, ui) {
                                $('span', ui.helper).text($this.periodeDrag(ui));
                            }
                        }).resizable({
                            grid: [0, 20],
                            containment: "parent",
                            handles: "n, s",
                            resize: function (event, ui) {
                                $('span', ui.helper).text($this.periodeResize(ui));
                            }
                        });

                }).on('click', ".jqs-remove", function (event) {

                });

            this.create();
        },

        create: function () {

            $('<table class="jqs-table"><tr></tr></table>').appendTo(".jqs");

            for (var i = 0; i < 7; i++) {
                $('<td><div class="jqs-wrapper"></div></td>').appendTo(".jqs-table tr");
            }

            $('<div class="jqs-grid"></div>').appendTo(".jqs");

            for (var j = 0; j < 24; j++) {
                var time = j;
                if (j < 10) {
                    time = '0' + time;
                }
                time += ':00';

                $('<div class="jqs-grid-line"><span>' + time + '</span></div>').appendTo(".jqs-grid");
            }
        },

        /**
         *
         * @param top
         * @returns {string}
         */
        periodeInit: function (top) {
            return this.formatTime(top) + " - " + this.formatTime(top + 1);
        },

        /**
         *
         * @param ui
         * @returns {string}
         */
        periodeDrag: function (ui) {
            var start = ui.position.top / 20;
            var end = ($(ui.helper).height() + ui.position.top) / 20;

            return this.formatTime(start) + " - " + this.formatTime(end);
        },

        /**
         *
         * @param ui
         * @returns {string}
         */
        periodeResize: function (ui) {
            var start = ui.position.top / 20;
            var end = (ui.size.height + ui.position.top) / 20;

            return this.formatTime(start) + " - " + this.formatTime(end);
        },

        /**
         *
         * @param time
         * @returns {number}
         */
        formatTime: function (time) {
            var hour = Math.floor(time / 2);
            if (hour < 10) {
                hour = "0" + hour;
            }

            if (time % 2 === 0) {
                hour += ":00";
            } else {
                hour += ":30";
            }

            return hour;
        },

        valid: function (current) {
            var currentStart = current.position().top;
            var currentEnd = current.position().top + current.height();

            var start = 0;
            var end = 0;
            $(".selection", $(current).parent()).each(function (index, element) {
                element = $(element);
                if (current.attr('id') !== element.attr('id')) {
                    start = element.position().top;
                    end = element.position().top + element.height();

                    console.log(start);
                    console.log(end);
                }
            });
        }

    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);


var $this = this;
var test = function () {

};

/*
 function periodeInit(top) {
 return formatTime(top) + " - " + formatTime(top + 1);
 }

 function periodeDrag(ui) {
 var start = ui.position.top / 20;
 var end = ($(ui.helper).height() + ui.position.top) / 20;

 return formatTime(start) + " - " + formatTime(end);
 }

 function periodeResize(ui) {
 var start = ui.position.top / 20;
 var end = (ui.size.height + ui.position.top) / 20;

 return formatTime(start) + " - " + formatTime(end);
 }

 function formatTime(time) {
 var hour = Math.floor(time / 2);
 if (hour < 10) {
 hour = "0" + hour;
 }

 if (time % 2 === 0) {
 hour += ":00";
 } else {
 hour += ":30";
 }

 return hour;
 }

 function valid(current) {
 var currentStart = current.position().top;
 var currentEnd = current.position().top + current.height();

 var start = 0;
 var end = 0;
 $(".selection", $(current).parent()).each(function (index, element) {
 element = $(element);
 if (current.attr('id') !== element.attr('id')) {
 start = element.position().top;
 end = element.position().top + element.height();

 console.log(start);
 console.log(end);
 }
 });
 }

 $(".jquery-schedule").on('click', ".wrapper", function (event) {
 console.log(event);

 if ($(event.target).hasClass("selection") || $(event.target).parents(".selection").length > 0) {
 return false;
 }

 var top = Math.round(event.offsetY / 20);

 var element = $('<div class="selection"><div class="placeholder"><span>' + periodeInit(top) + '</span></div></div>')
 .css('top', top * 20)
 .attr('id', event.timeStamp)
 .appendTo($(this))
 .draggable({
 grid: [0, 20],
 containment: "parent",
 drag: function (event, ui) {
 $('span', ui.helper).text(periodeDrag(ui));
 }
 }).resizable({
 grid: [0, 20],
 containment: "parent",
 handles: "n, s",
 resize: function (event, ui) {
 $('span', ui.helper).text(periodeResize(ui));
 }
 })
 }).on('click', ".wrapper", function (event) {

 });


 for (var i = 0; i < 24; i++) {
 var time = i;
 if (i < 10) {
 time = '0' + time;
 }
 time += ':00';

 $('<div class="line"><span>' + time + '</span></div>').appendTo(".time");
 }


 */