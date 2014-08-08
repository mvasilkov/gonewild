mocha.setup('bdd')

require(['test/RectangleIntersectGrid'], function () {
    'use strict'

    mocha.checkLeaks()
    mocha.run()
})
