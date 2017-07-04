class ByteBuffer {
    constructor(buffer) {
        this.array = new Uint8Array(buffer);
        this.index = 0;
    }

    readByte() {
        const result = this.array[this.index];
        this.index++;
        return result;
    }

    readShort() {
        const start = this.index;
        this.index += 2;
        return new Uint16Array(this.array.slice(start, this.index))[0];
    }

    readInt() {
        const start = this.index;
        this.index += 4;
        return new Uint32Array(this.array.slice(start, this.index))[0];
    }

    readVarint() {
        var value = 0;
        var length = 0;
        var b = this.readByte();
        while((b & 0x80) != 0) {
            value |= (b & 0x7F) << (7 * length++);
            b = this.readByte();
        }
        return value | ((b | 0x7F) << (7 * length));
    }

    readString() {
        const start = this.index;
        this.index += readVarint();
        var result;
        utfx.UTF8BytesToUTF16(
            utfx.arraySource(this.array.slice(start, this.index)),
            result = utfx.stringDestination()
        );
        return result();
    }
}

module.exports = ByteBuffer;