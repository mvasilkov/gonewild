define('RectangleIntersectGrid', function () {
    'use strict'

    function RectangleIntersectGrid() {
        this.gridToRect = new Map
        this.rectToGrid = new Map
    }

    RectangleIntersectGrid.prototype.add = function add(rect) {
        var x, y, grid, rset
        this.rectToGrid.set(rect, [rect.x, rect.y].toString())
        for (x = 0; x < rect.width; ++x)
            for (y = 0; y < rect.height; ++y) {
                grid = [x + rect.x, y + rect.y].toString()
                rset = this.gridToRect.get(grid)
                if (!rset) this.gridToRect.set(grid, rset = new Set([rect]))
                else if (!rset.has(rect)) rset.add(rect)
            }
    }

    RectangleIntersectGrid.prototype.remove = function remove(rect) {
        var x, y, grid = this.rectToGrid.get(rect), rset
        if (!grid) return
        grid = JSON.parse('[' + grid + ']')
        this.rectToGrid.delete(rect)
        for (x = 0; x < rect.width; ++x)
            for (y = 0; y < rect.height; ++y) {
                rset = this.gridToRect.get([x + grid[0], y + grid[1]].toString())
                if (rset) rset.delete(rect)
            }
    }

    RectangleIntersectGrid.prototype.update = function update(rect) {
        if (this.rectToGrid.has(rect))
            this.remove(rect)
        this.add(rect)
    }

    RectangleIntersectGrid.prototype.intersects = function intersects(rect) {
        var x, y, grid, rset, count
        for (x = 0; x < rect.width; ++x)
            for (y = 0; y < rect.height; ++y) {
                grid = [x + rect.x, y + rect.y].toString()
                if ((rset = this.gridToRect.get(grid))) {
                    count = rset.size
                    if (rset.has(rect)) --count
                    if (count) return true
                }
            }
        return false
    }

    RectangleIntersectGrid.prototype.getIntersections = function getIntersections(rect) {
        function ret(r) { if (r != rect) retval.add(r) }
        var x, y, grid, rset, retval = new Set
        for (x = 0; x < rect.width; ++x)
            for (y = 0; y < rect.height; ++y) {
                grid = [x + rect.x, y + rect.y].toString()
                if ((rset = this.gridToRect.get(grid)))
                    rset.forEach(ret)
            }
        return retval
    }

    return RectangleIntersectGrid
})
