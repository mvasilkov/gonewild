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

        it('seed', function () {
            assert.strictEqual(rng.s, 1)
            rng.uniform()
            assert.strictEqual(rng.s, 16807)

            var retval
            assert.strictEqual(isNaN(rng.cache), true)
            rng.standardNormal()
            assert.strictEqual(isNaN(rng.cache), false)
            retval = rng.seed(1)
            assert.strictEqual(isNaN(rng.cache), true)
            assert.strictEqual(retval, rng)
        })

        it('uniform', function () {
            sample(uniform)
        })

        it('standardNormal', function () {
            sample(rng.standardNormal.bind(rng))
        })

        it('bernoulli', function () {
            assert.isBoolean(rng.bernoulli(0.5))
            assert.isTrue(rng.bernoulli(1))
            assert.isFalse(rng.bernoulli(0))
        })
    })
})
