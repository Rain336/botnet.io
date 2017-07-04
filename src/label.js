class Label extends createjs.Container {
    constructor(img, text, font, color, x, y) {
        super();
        this.text = new createjs.Text(text, font, color);
        this.text.textAlign = "center";
        this.text.textBaseline = "middle";
        
        this.bitmap = new createjs.Bitmap(img);
        this.bitmap.x = x;
        this.bitmap.y = y;

        this.text.x = x + img.width;
        this.text.y = y;

        this.addChild(this.bitmap, this.text);
    }
}

module.exports = Label;