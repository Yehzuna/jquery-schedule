;(function ($, window, document, undefined) {
    "use strict";

    // Defaults options
    var pluginName = "jqs",
        defaults = {
            debug: false,
            mode: "edit", // read
            confirm: true,
            hour: 24,
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
            invalidPeriod: "Invalid period.",
            invalidPosition: "Invalid position.",
            removePeriod: "Remove this period ?",
            dialogYes: "Yes",
            dialogNo: "No"
        };

    // Plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        /**
         * Plugin init
         */
        init: function () {
            var $this = this;

            $(this.element).addClass("jqs");

            if (this.settings.mode === "edit") {
                // bind event
                $(this.element).on('click', ".jqs-wrapper", function (event) {
                    // add a new selection
                    if ($(event.target).hasClass("jqs-period") || $(event.target).parents(".jqs-period").length > 0) {
                        return false;
                    }

                    var position = Math.round(event.offsetY / 20);
                    if (position >= 48) {
                        position = 47;
                    }

                    $this.add($(this), "id_" + event.timeStamp, position, 1);
                });

                // delete a selection
                if ($this.settings.confirm) {
                    $(this.element).on('click', ".jqs-remove", function () {
                        var element = $(this).parents(".jqs-period");
                        $this.dialogOpen($this.settings.removePeriod, function () {
                            element.remove();
                        });
                    });
                } else {
                    $(this.element).on('click', ".jqs-remove", function () {
                        $(this).parents(".jqs-period").remove();
                    });
                }
            }

            this.create();

            this.generate();
        },

        /**
         * Create html structure
         */
        create: function () {

            $('<table class="jqs-table"><tr></tr></table>').appendTo($(this.element));

            for (var i = 0; i < 7; i++) {
                $('<td><div class="jqs-wrapper"></div></td>').appendTo($(".jqs-table tr", this.element));
            }

            $('<div class="jqs-grid"><div class="jqs-grid-head"></div></div>').appendTo($(this.element));

            for (var j = 0; j < 25; j++) {
                $('<div class="jqs-grid-line"><div class="jqs-grid-hour">' + this.formatHour(j) + '</div></div>').appendTo($(".jqs-grid", this.element));
            }

            for (var k = 0; k < 7; k++) {
                $('<div class="jqs-grid-day">' + this.settings.days[k] + '</div>').appendTo($(".jqs-grid-head", this.element));
            }
        },

        /**
         * Generate the period selections
         */
        generate: function () {

            if (this.settings.data.length > 0) {
                var $this = this;

                $.each(this.settings.data, function (index, data) {

                    $.each(data.periods, function (index, period) {
                        var element = $(".jqs-wrapper", $this.element).eq(data.day);
                        var position = $this.positionFormat(period[0]);
                        var height = $this.positionFormat(period[1]);

                        if (height === 0) {
                            height = 48;
                        }

                        var id = "id_" + index + data.day + position + height;
                        $this.add(element, id, position, height - position);
                    });
                });
            }
        },

        /**
         * Add a period selection to wrapper day
         * @param parent
         * @param id
         * @param position
         * @param height
         */
        add: function (parent, id, position, height) {
            if (height <= 0) {
                if (this.settings.debug) {
                    console.error(this.settings.invalidPeriod);
                }

                return false;
            }

            // remove button
            var remove = "";
            if (this.settings.mode === "edit") {
                remove = '<div class="jqs-remove"></div>';
            }

            // new element
            var period = '<div class="jqs-period-title">' + this.periodInit(position, position + height) + '</div>';
            var element = $('<div class="jqs-period"><div class="jqs-period-container">' + remove + period + '</div></div>')
                .css({
                    'top': position * 20,
                    'height': height * 20
                })
                .attr('id', id)
                .appendTo(parent);

            if (!this.isValid(element)) {
                if (this.settings.debug) {
                    console.error(this.settings.invalidPeriod, this.periodInit(position, position + height));
                }

                $(element).remove();

                return false;
            }

            if (this.settings.mode === "edit") {
                var $this = this;

                element.draggable({
                    grid: [0, 20],
                    containment: "parent",
                    drag: function (event, ui) {
                        $(".jqs-period-title", ui.helper).text($this.periodDrag(ui));
                    },
                    stop: function (event, ui) {
                        //console.log(ui);

                        if (!$this.isValid($(ui.helper))) {
                            if ($this.settings.debug) {
                                console.error($this.settings.invalidPosition);
                            }

                            $(ui.helper).css('top', Math.round(ui.originalPosition.top));
                        }
                    }
                }).resizable({
                    grid: [0, 20],
                    containment: "parent",
                    handles: "n, s",
                    resize: function (event, ui) {
                        $(".jqs-period-title", ui.helper).text($this.periodResize(ui));
                    },
                    stop: function (event, ui) {
                        //console.log(ui);

                        if (!$this.isValid($(ui.helper))) {
                            if ($this.settings.debug) {
                                console.error($this.settings.invalidPosition);
                            }

                            $(ui.helper).css({
                                'height': Math.round(ui.originalSize.height),
                                'top': Math.round(ui.originalPosition.top)
                            });
                        }
                    }
                });
            }

            return true;
        },

        /**
         * Return a readable period string from an element position
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
            var start = Math.round(ui.position.top / 20);
            var end = Math.round(($(ui.helper).height() + ui.position.top) / 20);

            return this.periodFormat(start) + " - " + this.periodFormat(end);
        },

        /**
         * Return a readable period string from a resize event
         * @param ui
         * @returns {string}
         */
        periodResize: function (ui) {
            var start = Math.round(ui.position.top / 20);
            var end = Math.round((ui.size.height + ui.position.top) / 20);

            return this.periodFormat(start) + " - " + this.periodFormat(end);
        },

        /**
         * Return an array with a readable period from an element
         * @param element
         * @returns {[*,*]}
         */
        periodData: function (element) {
            var start = Math.round(element.position().top / 20);
            var end = Math.round((element.height() + element.position().top) / 20);

            return [this.periodFormat(start), this.periodFormat(end)];
        },

        /**
         * Return a readable hour from a position
         * @param position
         * @returns {number}
         */
        periodFormat: function (position) {
            var hour = 0;

            if (this.settings.hour === 12) {
                var calc = Math.floor(position / 2);

                var min = ":30";
                if (position % 2 === 0) {
                    min = "";
                }

                hour = calc + min + "am";
                if (calc > 12) {
                    hour = (calc - 12) + min + "pm";
                }

                if (calc === 0 || calc === 24) {
                    hour = 12 + min + "am";
                }

                if (calc === 12) {
                    hour = 12 + min + "pm";
                }
            } else {

                if (position >= 48) {
                    position = 0;
                }

                hour = Math.floor(position / 2);
                if (hour < 10) {
                    hour = "0" + hour;
                }

                if (position % 2 === 0) {
                    hour += ":00";
                } else {
                    hour += ":30";
                }
            }

            return hour;
        },

        /**
         * Return a position from a readable hour
         * @param hour
         * @returns {number}
         */
        positionFormat: function (hour) {
            var position = 0;

            if (this.settings.hour === 12) {
                var matches = hour.match(/([0-1]?[0-9]):?([0-5][0-9])?\s?(am|pm)/);
                //console.log(matches);

                var h = parseInt(matches[1]);
                var m = parseInt(matches[2]);
                var time = matches[3];

                if (h === 12 && time === "am") {
                    h = 0;
                }
                if (h === 12 && time === "pm") {
                    time = "am";
                }
                if (time === "pm") {
                    h += 12;
                }

                position = h * 2;
                if (m === 30) {
                    position++;
                }

            } else {
                var split = hour.split(":");

                position = parseInt(split[0]) * 2;
                if (parseInt(split[1]) === 30) {
                    position++;
                }
            }

            return position;
        },

        /**
         * Return a hour to readable format
         * @param hour
         * @returns {string}
         */
        formatHour: function (hour) {
            if (this.settings.hour === 12) {
                switch (hour) {
                    case 0:
                    case 24:
                        hour = "12 am";
                        break;
                    case 12:
                        hour = "12 pm";
                        break;
                    default:
                        if (hour > 12) {
                            hour = (hour - 12) + " pm";
                        } else {
                            hour += " am";
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
            $(".jqs-period", $(current).parent()).each(function (index, element) {
                element = $(element);
                if (current.attr('id') !== element.attr('id')) {
                    start = Math.round(element.position().top);
                    end = Math.round(element.position().top + element.height());

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

            $(".jqs-wrapper", $this.element).each(function (index, element) {
                var day = {
                    day: index,
                    periods: []
                };

                $(".jqs-period", element).each(function (index, selection) {
                    day.periods.push($this.periodData($(selection)));
                });

                data.push(day);
            });

            return JSON.stringify(data);
        },

        /**
         * Import data programmatically
         * @param args options
         */
        import: function (args) {
            var $this = this;
            var dataImport = args[1];
            $.each(dataImport, function (index, data) {
                $.each(data.periods, function (index, period) {
                    var element = $(".jqs-wrapper", $this.element).eq(data.day);
                    var position = $this.positionFormat(period[0]);
                    var height = $this.positionFormat(period[1]);

                    if (height === 0) {
                        height = 48;
                    }

                    var id = 'id_' + Date.now();
                    $this.add(element, id, position, height - position);
                });
            });
        },

        /**
         * Remove all periods
         */
        remove: function () {
            $(".jqs-period", this.element).each(function (index, element) {
                $(element).remove();
            });
        },

        /**
         * Open a confirmation dialog
         * @param text
         * @param success
         */
        dialogOpen: function (text, success) {
            var $this = this;

            $this.dialogClose();

            var overlay = $('<div class="jqs-dialog-overlay">');
            var height = $(this.element).prop('scrollHeight');
            overlay.css('height', height);

            var content = '<div class="jqs-dialog-txt">' + text + '</div>' +
                '<div class="jqs-dialog-no">' + $this.settings.dialogNo + '</div>' +
                '<div class="jqs-dialog-yes">' + $this.settings.dialogYes + '</div>';
            var dialog = $('<div class="jqs-dialog-container"><div class="jqs-dialog">' + content + '</div></div>');
            var scroll = $(this.element).scrollTop();
            dialog.css('top', scroll);

            $(this.element).append(overlay).append(dialog);

            $(".jqs-dialog-yes", dialog).click(function () {
                success();
                $this.dialogClose();
            });

            $(".jqs-dialog-no", dialog).click(function () {
                $this.dialogClose();
            });
        },

        /**
         * Close a dialog
         */
        dialogClose: function () {
            $(".jqs-dialog-overlay, .jqs-dialog-container").remove();
        }
    });

    $.fn[pluginName] = function (options) {
        var ret = false;
        var args = Array.prototype.slice.call(arguments);
        var loop = this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            } else if ($.isFunction(Plugin.prototype[options])) {
                ret = $.data(this, 'plugin_' + pluginName)[options](args);
            }
        });

        if (ret) {
            return ret;
        }

        return loop;
    };
})(jQuery, window, document);
