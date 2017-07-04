const Base = require("./base");
const Bot = require("./bot");

class Packet {
    constructor(id) {
        this.id = id;
    }

    static writeShort(array, offset, value) {
        array[offset] = (value & 0xFF00);
        array[offset + 1] = (value & 0xFF);
    }

    static writeInt(array, offset, value) {
        array[offset] = (value & 0xFF000000);
        array[offset + 1] = (value & 0xFF0000);
        array[offset + 2] = (value & 0xFF00);
        array[offset + 3] = (value & 0xFF);
    }
}

class LoginRequestPacket extends Packet {
    constructor(id) {
        super(id);
    }

    static fromBuffer(id, buffer) {
        const result = new LoginRequestPacket(id);
        result.token = buffer.readInt();
        result.gtp = buffer.readByte();
        result.width = buffer.readShort();
        result.height = buffer.readShort();
        return result
    }

    toByteArray() {
        const array = new Uint16Array(10);
        array[0] = this.id;
        Packet.writeInt(array, 1, this.token);
        array[5] = this.gtp;
        Packet.writeShort(array, 6, this.width);
        Packet.writeShort(array, 8, this.height);
        return array;
    }
}

class LoginResponsePacket extends Packet {
    constructor(id) {
        super(id, buffer);
    }

    static fromBuffer(id, buffer) {
        const result = new LoginResponsePacket(id);
        result.token = buffer.readInt();
        return result
    }
}

class ClientDataPacket extends Packet {
    constructor(id) {
        super(id);
    }

    static fromBuffer(id, buffer) {
        const result = new ClientDataPacket(id);
        result.token = buffer.readInt();
        result.crystals = buffer.readVarint();
        result.metal = buffer.readVarint();
        result.fuel = buffer.readVarint();
        result.totalEnergy = buffer.readVarint();
        result.usedEnergy = buffer.readVarint();
        return result
    }
}

class ViewRequestPacket extends Packet {
    constructor(id) {
        super(id);
    }

    static fromBuffer(id, buffer) {
        const result = new ViewRequestPacket(id);
        result.token = buffer.readInt();
        result.x = buffer.readShort();
        result.y = buffer.readShort();
        return result
    }

    toByteArray() {
        const array = new Uint8Array(9);
        array[0] = this.id;
        Packet.writeInt(array, 1, this.token);
        Packet.writeShort(array, 5, this.x);
        Packet.writeShort(array, 7, this.y);
        return array;
    }
}

class ViewUpdatePacket extends Packet {
    constructor(id) {
        super(id);
    }

    static fromBuffer(id, buffer) {
        const result = new ViewUpdatePacket(id);
        result.token = buffer.readInt();
        result.x = buffer.readInt();
        result.y = buffer.readInt();
        return result
    }
}

class ViewResponsePacket extends Packet {
    constructor(id) {
        super(id);
    }

    static fromBuffer(id, buffer) {
        const result = new ViewResponsePacket(id);
        result.token = buffer.readInt();
        result.x = buffer.readVarint();
        result.y = buffer.readVarint();
        result.bases = [];
        result.bots = [];
        result.resources = [];

        var count = buffer.readVarint();
        for (var i = 0; i < count; i++) {
            result.bases.push(Base.fromBuffer(buffer));
        }
        count = buffer.readVarint();
        for (var i = 0; i < count; i++) {
            result.bots.push(Bot.fromBuffer(buffer));
        }
        count = buffer.readVarint();
        /*for (var i = 0; i < count; i++) {
            result.resources.push(new (buffer));
        }*/
        return result
    }
}

module.exports = {
    LoginRequestPacket,
    LoginResponsePacket,
    ClientDataPacket,
    ViewRequestPacket,
    ViewUpdatePacket,
    ViewResponsePacket
}