let $body = $('body');
let $window = $(window);
let documentHeight;
let items = [];
let next;
let resizeTimeout;
let scrollTimeout;
let windowHeight;
let windowHeightGapped;

let options = {
    active: 'active',
    gap: 0.1,
    priority: 'scroll-priority',
    selector: '.scroll'
};

export function init(opts) {
    options = Object.assign(options, opts || {});

    parse();
}

function parse(container) {
    if (!container) container = $body;
    let elements = container.filter(options.selector).add(container.find(options.selector));
    if (elements.length) {
        elements.removeClass(options.active);
        elements.each(function(index, item) {
            item = $(item);
            let prio = item.hasClass(options.priority);
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

    let i, item;
    for (i=0; i<items.length; i++) {
        item = items[i];
        item.top = item.element.offset().top;

    }

    let keys = ['sort', 'top'];
    items.sort(function(a, b) {
        let i = 0;
        let aVal = a[keys[i]];
        let bVal = b[keys[i]];
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
        let top = $window.scrollTop();
        let bottom = top + windowHeightGapped;

        if (next.top <= bottom || top + windowHeight >= documentHeight) {
            next.element.addClass(options.active);
            items.shift();
            let item = items[0];

            if (!item) {
                $window.off('resize', resize);
                $window.off('scroll', scroll);

            } else {
                let delay = (next.top < top || next.top == item.top) ? 0 : (200 + next.hold);
                next = item;
                scrollTimeout = setTimeout(scroll, delay);
            }
        }
    }
}