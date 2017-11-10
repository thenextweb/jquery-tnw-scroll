'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * TNW Scroll
 * Copyright © 2017, Alexander Griffioen <alexander@thenextweb.com>
 * Published under MIT license.
 */

var pluginName = 'tnwScroll';

var TNWScroll = function () {
    function TNWScroll(el, options) {
        _classCallCheck(this, TNWScroll);

        this.options = $.extend({}, this.defaults, options);
        this.$el = $(el);
        this.init();
    }

    _createClass(TNWScroll, [{
        key: 'init',
        value: function init() {
            this.direction = null;
            this.top = null;
            this.update();
        }
    }, {
        key: 'trigger',
        value: function trigger(direction, top, type) {
            $(window).trigger({
                direction: direction,
                top: top,
                type: type
            });
        }
    }, {
        key: 'update',
        value: function update() {
            var direction = void 0;
            var top = void 0;

            top = $(window).scrollTop();
            direction = top > this.top ? 1 : top < this.top ? -1 : this.direction;

            if (top != this.top) {
                this.trigger(direction, top, this.options.eventNameScroll);
            }

            if (direction != this.direction) {
                this.trigger(direction, top, this.options.eventNameDirectionChange);
            }

            this.direction = direction;
            this.top = top;

            window.requestAnimationFrame(this.update.bind(this));
        }
    }]);

    return TNWScroll;
}();

TNWScroll.prototype.defaults = {
    eventNameDirectionChange: 'tnw:directionChange',
    eventNameScroll: 'tnw:scroll'
};

$.fn[pluginName] = function (options) {
    return this.each(function () {
        var instance = $(this).data(pluginName);

        if (!instance) {
            $(this).data(pluginName, new TNWScroll(this, options));
        } else {
            if (typeof options === 'string') {
                instance[options]();
            }
        }
    });
};
