define(['vendor/chai', 'ParkMiller'], function (chai, ParkMiller) {
    'use strict'
    var assert = chai.assert

    describe('ParkMiller', function () {
        var rng
        beforeEach(function () { rng = new ParkMiller.constructor })

        function uniform() {
            var f = rng.uniform()
            assert.closeTo(f, 0.5, 0.5)
            return f
        }

        function sample(fn) {
            var xs = new Set, i
            for (i = 0; i < 100; ++i) xs.add(fn())
            assert.strictEqual(xs.size, 100)
        }

        it('uniform', function () {
            assert.strictEqual(rng.s, 1)
            rng.uniform()
            assert.strictEqual(rng.s, 16807)

            sample(uniform)
        })

        it('standardNormal', function () {
            sample(rng.standardNormal.bind(rng))
        })
    })
})
