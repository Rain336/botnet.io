const gtp = 64;
const bo = gtp + 7;
const pc = "red";

module.exports = function(stage) {
    const grid = new createjs.Shape();
    grid.graphics.setStrokeStyle(8);

    var x = 0;
    while (x <= 800) {
        x += gtp;
        grid.graphics
            .beginStroke("blue")
            .moveTo(x, 0)
            .lineTo(x, 600)
            .endStroke();
        x += 8;
    }

    var y = 0;
    while (y <= 600) {
        y += gtp;
        grid.graphics
            .beginStroke("blue")
            .moveTo(0, y)
            .lineTo(800, y)
            .endStroke();
        y += 8;
    }

    stage.addChild(grid);
};