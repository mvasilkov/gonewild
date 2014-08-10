define('ParkMiller', function () {
    'use strict'

    function ParkMiller() {
        this.s = 1
        this.cache = NaN
    }

    ParkMiller.prototype.seed = function seed(a) {
        if (a > 1) (this.s = a % 2147483647)
        else (this.s = 1)
        this.cache = NaN
        return this
    }

    ParkMiller.prototype.iuniform = function iuniform() {
        return (this.s = this.s * 16807 % 2147483647)
    }

    ParkMiller.prototype.uniform = function uniform() {
        return this.iuniform() / 2147483647
    }

    ParkMiller.prototype.standardNormal = function standardNormal() {
        var u, v, fac
        if (!isNaN(this.cache)) {
            fac = this.cache
            this.cache = NaN
            return fac
        }
        do {
            u = this.iuniform() / 1073741823.5 - 1
            v = this.iuniform() / 1073741823.5 - 1
            fac = u * u + v * v
        }
        while (fac >= 1 || !fac)
        fac = Math.sqrt(-2 * Math.log(fac) / fac)
        this.cache = fac * u
        return fac * v
    }

    ParkMiller.prototype.bernoulli = function bernoulli(a) {
        return this.iuniform() < 2147483647 * a
    }

    return (new ParkMiller).seed(Date.now())
})
