const Base = require("./base");
const Bot = require("./bot");

class Packet {
    constructor(id) {
        this.id = id;
    }

    static writeShort(array, value) {
        array.push(value & 0xFF00);
        array.push(value & 0xFF);
    }

    static writeInt(array, value) {
        array.push(value & 0xFF000000);
        array.push(value & 0xFF0000);
        array.push(value & 0xFF00);
        array.push(value & 0xFF);
    }

    static writeVarint(array, offset, value) {
        while ((value & 0xFFFFFF80) != 0) {
            array.push((value & 0x7F) | 0x80);
            length++;
            value >>= 7;
        }
        array.push(value);
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
        return result;
    }

    toByteArray() {
        const array = []
        array.push(this.id);
        Packet.writeInt(array, this.token);
        array.push(this.gtp);
        Packet.writeShort(array, this.width);
        Packet.writeShort(array, this.height);
        return new Uint8Array(array);
    }
}

class LoginResponsePacket extends Packet {
    constructor(id) {
        super(id, buffer);
    }

    static fromBuffer(id, buffer) {
        const result = new LoginResponsePacket(id);
        result.token = buffer.readInt();
        return result;
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
        return result;
    }
}

class AddEntityPacket extends Packet {
    constructor(id) {
        super(id);
    }

    static fromBuffer(id, buffer) {
        const result = new ClientDataPacket(id);
        result.token = buffer.readInt();
        result.entities = [];
        const count = buffer.readVarint();
        for (var index = 0; index < count; index++) {
            result.entities.push({
                id: buffer.readInt(),
                name: buffer.readString(),
                x: buffer.readVarint(),
                y: buffer.readVarint(),
                color: buffer.readString(),
                type: buffer.readByte()
            });
        }
        return result;
    }
}

class EntityMovePacket extends Packet {
    constructor(id) {
        super(id);
    }

    static fromBuffer(id, buffer) {
        const result = new EntityMovePacket(id);
        result.token = buffer.readInt();
        result.updates = [];
        const count = buffer.readVarint();
        for (var index = 0; index < count; index++) {
            result.updates.push({
                id: buffer.readInt(),
                x: buffer.readVarint(),
                y: buffer.readVarint(),
            });
        }
        return result;
    }

    toByteArray() {
        const array = [];
        array.push(this.id);
        Packet.writeInt(array, this.token);
        Packet.writeVarint(this.updates.length);
        this.updates.forEach(e => {
            Packet.writeInt(array, e.id);
            Packet.writeVarint(array, e.x);
            Packet.writeVarint(array, e.y);
        });
    }
}

class MovePlayerPacket extends Packet {
    constructor(id) {
        super(id);
    }

    toByteArray() {
        const array = [];
        array.push(this.id);
        Packet.writeInt(array, this.token);
        Packet.writeVarint(array, this.x);
        Packet.writeVarint(array, this.y);
        return new Uint8Array(array);
    }
}

module.exports = {
    LoginRequestPacket,
    LoginResponsePacket,
    ClientDataPacket,
    AddEntityPacket,
    EntityMovePacket
}