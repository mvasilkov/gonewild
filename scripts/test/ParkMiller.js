define(['vendor/chai', 'ParkMiller'], function (chai, ParkMiller) {
    'use strict'
    var assert = chai.assert

    describe('ParkMiller', function () {
        var rng
        beforeEach(function () { rng = new ParkMiller.constructor })

        it('uniform', function () {
            assert.strictEqual(rng.s, 1)
            assert.closeTo(rng.uniform(), 0.5, 0.5)
            assert.strictEqual(rng.s, 16807)

            var n, sample = new Set, i
            for (i = 0; i < 20; ++i) {
                sample.add(n = rng.uniform())
                assert.closeTo(n, 0.5, 0.5)
            }
            assert.strictEqual(sample.size, 20)
        })
    })
})
