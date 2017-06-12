;(function ($, window, document, undefined) {
    "use strict";

    // Create the defaults once
    var pluginName = "jqs",
        defaults = {
            mode: "read",
            display: "full", //compact
            data: [],
            hour: "24",
            days: [
                "Lundi",
                "Mardi",
                "Mercredi",
                "Jeudi",
                "Vendredi",
                "Samedi",
                "Dimanche"
            ]
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

            $(this.element).addClass("jqs");

            if (this.settings.mode === "edit") {
                // bind event
                $(this.element).on('click', ".jqs-wrapper", function (event) {
                    if ($(event.target).hasClass("jqs-select") || $(event.target).parents(".jqs-select").length > 0) {
                        return false;
                    }

                    var position = Math.round(event.offsetY / 20);
                    if (position >= 48) {
                        position = 47;
                    }

                    $this.add($(this), "id_" + event.timeStamp, position);

                }).on('click', ".jqs-remove", function (event) {

                });
            }

            this.create();

            if (this.settings.data.length > 0) {

                $.each(this.settings.data, function (index, data) {
                    //console.log(data);

                    $.each(data.periods, function (index, period) {
                        var element = $(".jqs-wrapper", $this.element).eq(data.day);
                        var position = $this.positionFormat(period[0]);
                        var height = $this.positionFormat(period[1]);

                        if (height === 0) {
                            height = 48;
                        }

                        //console.log(position);
                        //console.log(height);

                        if (position <= height) {
                            var id = "id_" + index + data.day + position + height;
                            $this.add(element, id, position, height - position);
                        } else {
                            console.error("Invalid period", $this.periodInit(position, position + (height - position)));
                        }
                    });
                });
            }
        },

        /**
         *
         */
        create: function () {
            $('<table class="jqs-table"><tr></tr></table>').appendTo($(this.element));

            for (var i = 0; i < 7; i++) {
                $('<td><div class="jqs-wrapper"></div></td>').appendTo($(".jqs-table tr", this.element));
            }

            $('<div class="jqs-grid"><div class="jqs-grid-head"></div></div>').appendTo($(this.element));

            for (var j = 0; j < 25; j++) {
                $('<div class="jqs-grid-line"><span>' + this.formatHour(j) + '</span></div>').appendTo($(".jqs-grid", this.element));
            }

            for (var k = 0; k < 7; k++) {
                $('<div class="jqs-grid-day">' + this.settings.days[k] + '</div>').appendTo($(".jqs-grid-head", this.element));
            }
        },

        /**
         *
         * @param parent
         * @param id
         * @param position
         * @param height
         */
        add: function (parent, id, position, height) {
            if (!height) {
                height = 1;
            }

            var element = $('<div class="jqs-select"><div class="jqs-select-placeholder"><span>' + this.periodInit(position, position + height) + '</span></div></div>')
                .css('top', position * 20)
                .css('height', height * 20)
                .attr('id', id)
                .appendTo(parent);

            if(!this.isValid(element)) {
                console.error("Invalid Period", this.periodInit(position, position + height));

                $(element).remove();
                return false;
            }

            if (this.settings.mode === "edit") {
                var $this = this;

                element.draggable({
                    grid: [0, 20],
                    containment: "parent",
                    drag: function (event, ui) {
                        $('span', ui.helper).text($this.periodDrag(ui));
                    }
                }).resizable({
                    grid: [0, 20],
                    containment: "parent",
                    handles: "n, s",
                    resize: function (event, ui) {
                        $('span', ui.helper).text($this.periodResize(ui));
                    }
                });
            }
        },

        /**
         *
         * @param start
         * @param end
         * @returns {string}
         */
        periodInit: function (start, end) {
            return this.periodFormat(start) + " - " + this.periodFormat(end);
        },

        /**
         *
         * @param ui
         * @returns {string}
         */
        periodDrag: function (ui) {
            var start = ui.position.top / 20;
            var end = ($(ui.helper).height() + ui.position.top) / 20;

            return this.periodFormat(start) + " - " + this.periodFormat(end);
        },

        /**
         *
         * @param ui
         * @returns {string}
         */
        periodResize: function (ui) {
            var start = ui.position.top / 20;
            var end = (ui.size.height + ui.position.top) / 20;

            return this.periodFormat(start) + " - " + this.periodFormat(end);
        },

        /**
         *
         * @param position
         * @returns {number}
         */
        periodFormat: function (position) {
            if (position >= 48) {
                position = 0;
            }

            var hour = Math.floor(position / 2);
            if (hour < 10) {
                hour = "0" + hour;
            }

            if (position % 2 === 0) {
                hour += ":00";
            } else {
                hour += ":30";
            }

            return hour;
        },

        /**
         *
         * @param hour
         * @returns {number}
         */
        positionFormat: function (hour) {
            var split = hour.split(":");
            var position = parseInt(split[0]) * 2;

            if (parseInt(split[1]) === 30) {
                position++;
            }

            return position;
        },

        /**
         *
         * @param hour
         * @returns {string}
         */
        formatHour: function (hour) {
            if (hour >= 24) {
                hour = 0;
            }

            if (hour < 10) {
                hour = "0" + hour;
            }
            hour += ":00";

            return hour;
        },

        /**
         *
         * @param current
         */
        isValid: function (current) {
            var currentStart = current.position().top;
            var currentEnd = current.position().top + current.height();

            var start = 0;
            var end = 0;
            var check = true;
            $(".jqs-select", $(current).parent()).each(function (index, element) {
                element = $(element);
                if (current.attr('id') !== element.attr('id')) {
                    start = element.position().top;
                    end = element.position().top + element.height();

                    if (start > currentStart && start < currentEnd) {
                        check = false;
                    }

                    if (end > currentStart && end < currentEnd) {
                        check = false;
                    }

                    if (start < currentStart && end > currentEnd) {
                        check = false;
                    }

                    if (start === currentStart && end === currentEnd) {
                        check = false;
                    }

                    console.log(currentStart, currentEnd, start, end);
                }
            });

            return check;
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
