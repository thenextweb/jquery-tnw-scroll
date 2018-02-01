/**
 * TNW Scroll
 * Copyright © 2017, Alexander Griffioen <alexander@thenextweb.com>
 * Published under MIT license.
 */

const pluginName = "tnwScroll"

class TNWScroll {
    constructor(el, options) {
        this.options = $.extend({}, this.defaults, options)
        this.$el = $(el)
        this.init()
    }

    init() {
        this.direction = 0
        this.top = 0
        this.update()
    }

    trigger(direction, top, type) {
        $(window).trigger({
            direction: direction,
            top: top,
            type: type
        })
    }

    update() {
        let direction
        let top

        top = $(window).scrollTop()
        direction = (top > this.top) ? 1 : ((top < this.top) ? -1 : 0)

        if (top != this.top) {
            this.trigger(direction, top, this.options.eventNameScroll)
        }

        if (direction != this.direction) {
            this.trigger(direction, top, this.options.eventNameDirectionChange)
        }

        this.direction = direction
        this.top = top

        window.requestAnimationFrame(this.update.bind(this))
    }
}

TNWScroll.prototype.defaults = {
    eventNameDirectionChange: "tnw:directionChange",
    eventNameScroll: "tnw:scroll"
}

$.fn[pluginName] = function (options) {
    return this.each(function () {
        let instance = $(this).data(`plugin_${pluginName}`)

        if (!instance) {
            $(this).data(`plugin_${pluginName}`, new TNWScroll(this, options))
        } else {
            if (typeof options === "string") {
                instance[options]()
            }
        }
    })
}