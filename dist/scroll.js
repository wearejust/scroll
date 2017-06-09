/** 
* scroll.js 
* Adds a class when scrolling past selected elements 
* 
* @version 1.0.4 
* @author Emre Koc <emre.koc@wearejust.com> 
*/
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.init = init;
var $body = $('body');
var $window = $(window);
var documentHeight = void 0;
var items = [];
var next = void 0;
var resizeTimeout = void 0;
var scrollTimeout = void 0;
var windowHeight = void 0;
var windowHeightGapped = void 0;

var options = {
    active: 'active',
    delay: 200,
    delayHorizontal: 50,
    gap: 0.1,
    priority: 'scroll-priority',
    selector: '.scroll'
};

function init(opts) {
    options = _extends(options, opts || {});

    parse();
}

function parse(container) {
    if (!container) container = $body;
    var elements = container.filter(options.selector).add(container.find(options.selector));
    if (elements.length) {
        elements.removeClass(options.active);
        elements.each(function (index, item) {
            item = $(item);
            var prio = item.hasClass(options.priority);
            items.push({
                element: item,
                hold: parseInt(item.attr('data-scroll-hold') || 0),
                prio: prio,
                sort: prio ? 1 : 2
            });
        });

        $window.off('resize', resize);
        $window.off('scroll', scroll);
        $window.on('resize', resize);
        $window.on('scroll', scroll);

        $('img').on('load', resize);
        resizeCalculate();
    }
}

function resize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCalculate, 100);
}

function resizeCalculate() {
    windowHeight = $window.height();
    windowHeightGapped = windowHeight * (1 - options.gap);
    documentHeight = document.body.scrollHeight - windowHeight * 0.3;

    var i = void 0,
        item = void 0;
    for (i = 0; i < items.length; i++) {
        item = items[i];
        item.top = item.element.offset().top;
    }

    var keys = ['sort', 'top'];
    items.sort(function (a, b) {
        var i = 0;
        var aVal = a[keys[i]];
        var bVal = b[keys[i]];
        while (aVal == bVal && i < keys.length) {
            i++;
            aVal = a[keys[i]];
            bVal = b[keys[i]];
        }

        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
    });

    next = items[0];

    scroll();
}

function scroll(e) {
    if (!e) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
    }

    if (next && !scrollTimeout) {
        var top = $window.scrollTop();
        var bottom = top + windowHeightGapped;

        if (next.top <= bottom || top + windowHeight >= documentHeight) {
            next.element.addClass(options.active);
            items.shift();
            var item = items[0];

            if (!item) {
                $window.off('resize', resize);
                $window.off('scroll', scroll);
            } else {
                var delay = next.top < top ? 0 : next.top == item.top ? options.delayHorizontal : options.delay + next.hold;
                next = item;
                scrollTimeout = setTimeout(scroll, delay);
            }
        }
    }
}