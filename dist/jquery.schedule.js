/*
 ;(function($){
 $.fn.extend({
 pluginname: function(options) {
 this.defaultOptions = {};

 var settings = $.extend({}, this.defaultOptions, options);

 return this.each(function() {
 var $this = $(this);
 });
 }
 });
 })(jQuery);
 */


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


$('body').on('click', ".wrapper", function (event) {
    console.log(event);

    var top = Math.round(event.offsetY / 20);

    $('<div class="selection"><div class="placeholder"><span>' + periodeInit(top) + '</span></div></div>')
        .css('top', top * 20)
        .attr('id', event.timeStamp)
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
    }).appendTo($(this));

});


for (var i = 0; i < 24; i++) {
    var time = i;
    if(i < 10) {
        time = "0" + time;
    }
    $('<div class="line"><span>' + time + '</span></div>').appendTo(".time");
}
