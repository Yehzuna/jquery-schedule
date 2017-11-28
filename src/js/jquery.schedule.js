;(function ($, window, document, undefined) {
    "use strict";

    // Defaults options
    var defaults = {
            mode: "edit", // read
            hour: 24, // 12
            periodDuration: 15, // 15/30/60
            data: [],
            days: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            onInit: function () {},
            onAddPeriod: function () {},
            onRemovePeriod: function () {},
            onPeriodClicked: function () {}
        },
        pluginName = "jqs",
        invalidPeriod = "Invalid period.",
        invalidPosition = "Invalid position.";

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this.init();
    }

    $.extend(Plugin.prototype, {
        /**
         * Plugin instance seed
         */
        seed: Math.random().toString(36).substr(2),

        /**
         * Period addition counter
         */
        counter: 0,

        /**
         * Period interval multiplier
         */
        periodInterval: 0,

        /**
         * Period max height
         */
        periodHeight: 0,

        /**
         * Period position max step
         */
        periodPosition: 0,

        /**
         * Generate id for a period
         * @returns {string}
         */
        uniqId: function () {
            this.counter++;

            return pluginName + "_" + this.seed + "_" + this.counter;
        },

        /**
         * Plugin init
         */
        init: function () {
            var $this = this;

            if ($.inArray(this.settings.periodDuration, [15, 30, 60]) === -1) {
                throw new Error("Invalid periodDuration");
            }

            this.periodInterval = 60 / this.settings.periodDuration;
            this.periodHeight = 24 * this.periodInterval;
            this.periodPosition = 40 / this.periodInterval;

            $(this.element).addClass("jqs").addClass("jqs-interval-" + this.settings.periodDuration);

            if (this.settings.mode === "edit") {
                // add a new period
                var position = 0;
                $(this.element).on("mousedown", ".jqs-day", function (event) {
                    position = Math.floor(event.offsetY / $this.periodPosition);
                });

                $(this.element).on("mouseup", ".jqs-day", function (event) {
                    console.log(event.target);

                    if (!$(event.target).hasClass("jqs-period") && $(event.target).parents(".jqs-period").length === 0) {
                        var height = Math.round(event.offsetY / $this.periodPosition) - position;
                        if (height <= 0) {
                            height = 1;
                        }

                        $this.add($(this), position, height);
                    }
                });

                // delete a period
                $(this.element).on("click", ".jqs-remove", function () {
                    var period = $(this).parents(".jqs-period");
                    if (!$this.settings.onRemovePeriod.call(this, period, $this.element)) {
                        period.remove();
                    }
                });
            }

            this.create();
            this.generate();

            this.settings.onInit.call(this, this.element);
        },

        /**
         * Generate schedule structure
         */
        create: function () {
            $("<table class='jqs-table'><tr></tr></table>").appendTo($(this.element));

            for (var i = 0; i < 7; i++) {
                $("<td><div class='jqs-day'></div></td>").appendTo($(".jqs-table tr", this.element));
            }

            $("<div class='jqs-grid'><div class='jqs-grid-head'></div></div>").appendTo($(this.element));

            for (var j = 0; j < 25; j++) {
                $("<div class='jqs-grid-line'><div class='jqs-grid-hour'>" + this.formatHour(j) + "</div></div>").appendTo($(".jqs-grid", this.element));
            }

            for (var k = 0; k < 7; k++) {
                $("<div class='jqs-grid-day'>" + this.settings.days[k] + "</div>").appendTo($(".jqs-grid-head", this.element));
            }
        },

        /**
         * Generate periods from data option
         */
        generate: function () {
            if (this.settings.data.length > 0) {
                var $this = this;

                $.each(this.settings.data, function (index, data) {
                    $.each(data.periods, function (index, period) {

                        var parent = $(".jqs-day", $this.element).eq(data.day);
                        var position = $this.positionFormat(period[0]);
                        var height = $this.positionFormat(period[1]);
                        if (height === 0) {
                            height = $this.periodHeight;
                        }

                        $this.add(parent, position, height - position);
                    });
                });
            }
        },

        /**
         * Add a period to a day
         * @param parent
         * @param {int} position
         * @param {int} height
         * @param data
         */
        add: function (parent, position, height, data) {

            if (height <= 0 || position >= this.periodHeight) {
                console.error(invalidPeriod);

                return false;
            }

            var title = (data && data.title) ? data.title : "";

            // new period
            var periodTitle = "<div class='jqs-period-title'>" + title + "</div>";
            var periodTime = "<div class='jqs-period-time'>" + this.periodInit(position, position + height) + "</div>";
            var period = $("<div class='jqs-period'><div class='jqs-period-container'>" + periodTitle + periodTime + "</div></div>")
                .css({
                    "top": position * this.periodPosition,
                    "height": height * this.periodPosition
                })
                .attr("id", this.uniqId())
                .attr("title", title)
                .appendTo(parent);

            if (data) {
                if (data.backgroundColor) $(".jqs-period-container", period).css("background-color", data.backgroundColor);
                if (data.borderColor) $(".jqs-period-container", period).css("border-color", data.borderColor);
            }

            // period validation
            if (!this.isValid(period)) {
                console.error(invalidPeriod, this.periodInit(position, position + height));

                $(period).remove();

                return false;
            }

            if (this.settings.mode === "edit") {
                var $this = this;

                period.draggable({
                    grid: [0, this.periodPosition],
                    containment: "parent",
                    drag: function (event, ui) {
                        $(".jqs-period-time", ui.helper).text($this.periodDrag(ui));
                    },
                    stop: function (event, ui) {
                        if (!$this.isValid($(ui.helper))) {
                            console.error(invalidPosition);

                            $(ui.helper).css("top", Math.round(ui.originalPosition.top));
                        }
                    }
                }).resizable({
                    grid: [0, this.periodPosition],
                    containment: "parent",
                    handles: "n, s",
                    resize: function (event, ui) {
                        $(".jqs-period-time", ui.helper).text($this.periodResize(ui));

                        console.log(ui.height);
                    },
                    stop: function (event, ui) {
                        if (!$this.isValid($(ui.helper))) {
                            console.error(invalidPosition);

                            $(ui.helper).css({
                                "height": Math.round(ui.originalSize.height),
                                "top": Math.round(ui.originalPosition.top)
                            });
                        }
                    }
                }).click(function (event) {
                    $this.settings.onPeriodClicked.call(this, event, period, $this.element);
                    $this.openOptions(event, period);
                });
            }

            this.settings.onAddPeriod.call(this, period, this.element);

            return true;
        },

        /**
         *
         * @param event
         * @param period
         */
        openOptions: function (event, period) {
            var title = $("jqs-period-title", period).html();

            var colors = [
                ["rgba(82, 155, 255, 0.5)", "rgba(82, 155, 255, 1)"],
                ["rgba(0, 0, 255, 0.5)", "rgba(0, 0, 255, 1)"],
                ["rgba(0, 255, 0, 0.5)", "rgba(0, 255, 0, 1)"]
            ];

            var titleInput = "<div class='jqs-title'><input type='text' value='" + title + "'></div>";

            var colorInput = "<div class='jqs-period-colors'>";
            $.each(colors, function (index, color) {
                colorInput += "<button class='jqs-color' style='background-color: " + color[0] + "; border-color: " + color[1] + "'></button>";
            });
            colorInput += "</div>";

            var remove = "<button class='jqs-remove'>Remove</button>";
            $("<div class='jqs-options'>" + titleInput + colorInput + remove + "</div>").appendTo(this.element);


            $(".jqs-options .jqs-color").click(function () {
                $(".jqs-period-container", period).css({
                    "background-color": $(this).css("background-color"),
                    "border-color": $(this).css("border-top-color")
                });
            });

            $(".jqs-options .jqs-title input").keyup(function () {
                $(".jqs-period-title", period).html($(this).val());
                period.attr('title', $(this).val());
            });

            $(".jqs-options .jqs-remove").click(function () {
                period.remove();
                $(".jqs-options").remove();
            });
        },

        /**
         *
         */
        closeOptions: function () {

        },

        /**
         * Return a readable period string from a period position
         * @param start
         * @param end
         * @returns {string}
         */
        periodInit: function (start, end) {
            return this.periodFormat(start) + " - " + this.periodFormat(end);
        },

        /**
         * Return a readable period string from a drag event
         * @param ui
         * @returns {string}
         */
        periodDrag: function (ui) {
            var start = Math.round(ui.position.top / this.periodPosition);
            var end = Math.round(($(ui.helper).height() + ui.position.top) / this.periodPosition);

            return this.periodFormat(start) + " - " + this.periodFormat(end);
        },

        /**
         * Return a readable period string from a resize event
         * @param ui
         * @returns {string}
         */
        periodResize: function (ui) {
            var start = Math.round(ui.position.top / this.periodPosition);
            var end = Math.round((ui.size.height + ui.position.top) / this.periodPosition);

            return this.periodFormat(start) + " - " + this.periodFormat(end);
        },

        /**
         * Return an object with all period data
         * @param period
         * @returns {[*,*]}
         */
        periodData: function (period) {
            var start = Math.round(period.position().top / this.periodPosition);
            var end = Math.round((period.height() + period.position().top) / this.periodPosition);

            return {
                start: this.periodFormat(start),
                end: this.periodFormat(end),
                title: $(".jqs-period-title", period).html(),
                backgroundColor: $(".jqs-period-container", period).css("background-color"),
                borderColor: $(".jqs-period-container", period).css("border-top-color")
            };
        },

        /**
         * Return a readable hour from a position
         * @param position
         * @returns {number}
         */
        periodFormat: function (position) {
            if (position >= this.periodHeight) {
                position = 0;
            }

            var hour = Math.floor(position / this.periodInterval);
            var mn = (position / this.periodInterval - hour) * 60;

            if (this.settings.hour === 12) {
                var time = hour;
                var ind = "";

                if (hour >= 12) {
                    ind = "p";
                }
                if (hour > 12) {
                    time = hour - 12;
                }
                if (hour === 0 || hour === 24) {
                    ind = "";
                    time = 12;
                }
                if (mn !== 0) {
                    time += ":" + mn;
                }

                return time + ind;
            }

            if (hour < 10) {
                hour = "0" + hour;
            }
            if (mn < 10) {
                mn = "0" + mn;
            }

            return hour + ":" + mn;
        },

        /**
         * Return a position from a readable hour
         * @param time
         * @returns {number}
         */
        positionFormat: function (time) {
            var split = time.split(":");
            var hour = parseInt(split[0]);
            var mn = parseInt(split[1]);

            if (this.settings.hour === 12) {
                var matches = time.match(/([0-1]?[0-9]):?([0-5][0-9])?\s?(am|pm|p)?/);
                var ind = matches[3];
                if (!ind) {
                    ind = "am";
                }

                hour = parseInt(matches[1]);
                mn = parseInt(matches[2]);

                if (!mn) {
                    mn = 0;
                }

                if (hour === 12 && ind === "am") {
                    hour = 0;
                }
                if (hour === 12 && (ind === "pm" || ind === "p")) {
                    ind = "am";
                }
                if (ind === "pm" || ind === "p") {
                    hour += 12;
                }
            }

            var position = 0;
            position += hour * this.periodInterval;
            position += mn / 60 * this.periodInterval;

            if (Math.floor(position) !== position) {
                return -1;
            }

            return position;
        },

        /**
         * Return a hour to readable format (Grid structure)
         * @param hour
         * @returns {string}
         */
        formatHour: function (hour) {
            if (this.settings.hour === 12) {
                switch (hour) {
                    case 0:
                    case 24:
                        hour = "12am";
                        break;
                    case 12:
                        hour = "12pm";
                        break;
                    default:
                        if (hour > 12) {
                            hour = (hour - 12) + "pm";
                        } else {
                            hour += "am";
                        }
                }
            } else {
                if (hour >= 24) {
                    hour = 0;
                }

                if (hour < 10) {
                    hour = "0" + hour;
                }
                hour += ":00";
            }

            return hour;
        },

        /**
         * Check if a period is valid
         * @param current
         * @returns {boolean}
         */
        isValid: function (current) {
            var currentStart = Math.round(current.position().top);
            var currentEnd = Math.round(current.position().top + current.height());

            var start = 0;
            var end = 0;
            var check = true;
            $(".jqs-period", $(current).parent()).each(function (index, period) {
                if (current.attr("id") !== $(period).attr("id")) {
                    start = Math.round($(period).position().top);
                    end = Math.round($(period).position().top + $(period).height());

                    if (start > currentStart && start < currentEnd) {
                        check = false;
                    }

                    if (end > currentStart && end < currentEnd) {
                        check = false;
                    }

                    if (start < currentStart && end > currentEnd) {
                        check = false;
                    }

                    if (start === currentStart || end === currentEnd) {
                        check = false;
                    }
                }
            });

            return check;
        },

        /**
         * Export data to JSON string
         * @returns {string}
         */
        export: function () {
            var $this = this;
            var data = [];

            $(".jqs-day", $this.element).each(function (index, day) {
                var periods = [];
                $(".jqs-period", day).each(function (index, period) {
                    periods.push($this.periodData($(period)));
                });

                data.push({
                    day: index,
                    periods: periods
                });
            });

            return JSON.stringify(data);
        },

        /**
         * Import data on plugin init
         * @param args
         * @returns {Array}
         */
        import: function (args) {
            var $this = this;
            var dataImport = args[1];
            var ret = [];
            $.each(dataImport, function (index, data) {
                $.each(data.periods, function (index, period) {
                    var parent = $(".jqs-day", $this.element).eq(data.day);
                    var position = $this.positionFormat(period.start);
                    var height = $this.positionFormat(period.end);

                    if (height === 0) {
                        height = $this.periodHeight;
                    }

                    var status = true;
                    if (!$this.add(parent, position, height - position, period)) {
                        status = false;
                    }

                    ret.push({
                        day: data.day,
                        period: [
                            $this.periodFormat(position),
                            $this.periodFormat(height)
                        ],
                        status: status
                    });
                });
            });

            return JSON.stringify(ret);
        },

        /**
         * Remove all periods
         */
        reset: function () {
            $(".jqs-period", this.element).remove();
        }
    });

    $.fn[pluginName] = function (options) {
        var ret = false;
        var args = Array.prototype.slice.call(arguments);
        var loop = this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            } else if ($.isFunction(Plugin.prototype[options])) {
                ret = $.data(this, "plugin_" + pluginName)[options](args);
            }
        });

        if (ret) {
            return ret;
        }

        return loop;
    };
})(jQuery, window, document);
