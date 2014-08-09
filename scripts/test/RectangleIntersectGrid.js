define(['vendor/chai', 'Rectangle', 'RectangleIntersectGrid'],
function (chai, Rectangle, RectangleIntersectGrid) {
    'use strict'
    var assert = chai.assert

    describe('RectangleIntersectGrid', function () {
        var rig
        beforeEach(function () { rig = new RectangleIntersectGrid })

        it('add', function () {
            var a, b, rset
            rig.add(a = new Rectangle(0, 0, 3, 3))
            rig.add(b = new Rectangle(1, 1, 3, 3))

            assert.strictEqual(rig.rectToGrid.get(a), [a.x, a.y].toString())
            assert.strictEqual(rig.rectToGrid.get(b), [b.x, b.y].toString())

            rset = rig.gridToRect.get([0, 0].toString())
            assert.strictEqual(rset.has(a), true)
            assert.strictEqual(rset.has(b), false)

            rset = rig.gridToRect.get([1, 1].toString())
            assert.strictEqual(rset.has(a), true)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([2, 2].toString())
            assert.strictEqual(rset.has(a), true)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([3, 3].toString())
            assert.strictEqual(rset.has(a), false)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([4, 4].toString())
            assert.isUndefined(rset)
        })

        it('remove', function () {
            var a, b, rset
            rig.add(a = new Rectangle(0, 0, 3, 3))
            rig.add(b = new Rectangle(1, 1, 3, 3))
            rig.remove(a)
            rig.remove(new Rectangle(6, 6, 9, 9))

            assert.isUndefined(rig.rectToGrid.get(a))
            assert.strictEqual(rig.rectToGrid.get(b), [b.x, b.y].toString())

            rset = rig.gridToRect.get([0, 0].toString())
            assert.strictEqual(rset.has(a), false)
            assert.strictEqual(rset.has(b), false)

            rset = rig.gridToRect.get([1, 1].toString())
            assert.strictEqual(rset.has(a), false)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([2, 2].toString())
            assert.strictEqual(rset.has(a), false)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([3, 3].toString())
            assert.strictEqual(rset.has(a), false)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([4, 4].toString())
            assert.isUndefined(rset)
        })

        it('update', function () {
            var a, b, rset
            rig.add(a = new Rectangle(2, 2, 3, 3))
            rig.add(b = new Rectangle(1, 1, 3, 3))
            a.x = a.y = 0
            rig.update(a)

            assert.strictEqual(rig.rectToGrid.get(a), [a.x, a.y].toString())
            assert.strictEqual(rig.rectToGrid.get(b), [b.x, b.y].toString())

            rset = rig.gridToRect.get([0, 0].toString())
            assert.strictEqual(rset.has(a), true)
            assert.strictEqual(rset.has(b), false)

            rset = rig.gridToRect.get([1, 1].toString())
            assert.strictEqual(rset.has(a), true)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([2, 2].toString())
            assert.strictEqual(rset.has(a), true)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([3, 3].toString())
            assert.strictEqual(rset.has(a), false)
            assert.strictEqual(rset.has(b), true)

            rset = rig.gridToRect.get([4, 4].toString())
            assert.strictEqual(rset.size, 0)
        })

        it('intersects', function () {
            var a, b
            rig.add(a = new Rectangle(0, 0, 3, 3))
            rig.add(b = new Rectangle(1, 1, 3, 3))

            assert.isTrue(rig.intersects(a))
            assert.isTrue(rig.intersects(b))

            assert.strictEqual(rig.intersects(new Rectangle(3, 3, 3, 3)), true)
            assert.strictEqual(rig.intersects(new Rectangle(4, 4, 4, 4)), false)
        })

        it('getIntersections', function () {
            var a, b, res
            rig.add(a = new Rectangle(0, 0, 3, 3))
            rig.add(b = new Rectangle(1, 1, 3, 3))

            res = rig.getIntersections(a)
            assert.strictEqual(res.has(a), false)
            assert.strictEqual(res.has(b), true)

            res = rig.getIntersections(b)
            assert.strictEqual(res.has(a), true)
            assert.strictEqual(res.has(b), false)

            res = rig.getIntersections(new Rectangle(2, 2, 2, 2))
            assert.strictEqual(res.has(a), true)
            assert.strictEqual(res.has(b), true)

            res = rig.getIntersections(new Rectangle(3, 3, 3, 3))
            assert.strictEqual(res.has(a), false)
            assert.strictEqual(res.has(b), true)

            res = rig.getIntersections(new Rectangle(4, 4, 4, 4))
            assert.strictEqual(res.has(a), false)
            assert.strictEqual(res.has(b), false)
        })
    })
})
