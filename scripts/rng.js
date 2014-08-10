require(['ParkMiller'], function (rng) {
    'use strict'
    var res = {}
    var min = +Infinity, max = -Infinity

    compute()
    visual()

    function compute() {
        var n, i
        for (i = 0; i < 1e6; ++i) {
            inc(parseInt((10 * (n = rng.standardNormal())).toFixed(0), 10).toString())
            if (n < min) min = n
            if (n > max) max = n
        }
    }

    function inc(x) {
        if (!res[x]) res[x] = 1
        else ++res[x]
    }

    function visual() {
        var c = $id('container'), i, col, h
        for (i = -100; i <= 100; ++i) {
            col = document.createElement('div')
            col.id = 'col' + i
            col.className = 'col'
            if ((h = res[i.toString()]))
                col.style.height = Math.round(h / 100) + 'px'
            else col.className += ' nope'
            c.appendChild(col)
        }
        $txt('min', min)
        $txt('max', max)
    }

    function $id(id) {
        return document.getElementById(id)
    }

    function $txt(id, s) {
        $id(id).appendChild(document.createTextNode(s))
    }
})
