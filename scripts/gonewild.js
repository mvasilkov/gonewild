mocha.setup('bdd')

require(['test/RectangleIntersectGrid', 'test/ParkMiller'], function () {
    'use strict'

    mocha.checkLeaks()
    mocha.run()
})
