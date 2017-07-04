const ByteBuffer = require("./buffer");
const packets = require("./packets");
const player = require("./player");
const renderer = require("./renderer");
const preload = require("./preload");
const Base = require("./base");
const Bot = require("./bot");
const resource = require("./resource");

class Client {
    constructor() {
        this.socket = new WebSocket("wss://localhost:8000/api");

        this.socket.binaryType = "arraybuffer";
        const client = this;
        this.socket.onmessage = function (event) {
            const buffer = new ByteBuffer(event.data);
            const id = buffer.readByte();
            switch (id) {
                case 1:
                    client.loginResponse(packets.LoginResponsePacket.fromBuffer(id, buffer));
                    break;

                case 2:
                    client.clientData(packets.ClientDataPacket.fromBuffer(id, buffer));
                    break;

                case 3:
                    client.addEntity(packets.AddEntityPacket.fromBuffer(id, buffer));
                    break;

                case 4:
                    client.moveEntity(packets.EntityMovePacket.fromBuffer(id, buffer));
                    break;

                default:
                    break;
            }
        }
    }

    sendLoginRequest() {
        const packet = new packets.LoginRequestPacket(0x00);
        packet.token = player.token;
        packet.gtp = renderer.gtp;
        packet.width = renderer.stage.canvas.width;
        packet.height = renderer.stage.canvas.height;
        this.socket.send(packet.toByteArray());
    }

    loginResponse(packet) {
        player.token = packet.token;
    }

    clientData(packet) {
        player.crystals = packet.crystals;
        player.metal = packet.metal;
        player.fuel = packet.fuel;
        player.totalEnergy = packet.totalEnergy;
        player.usedEnergy = packet.usedEnergy;

        renderer.updateUi();
    }

    addEntity(packet) {
        packet.entities.forEach(e => {
            switch (e.type) {
                case 0:
                    new Base(e.id, e.name, e.x, e.y, e.color);
                    break;

                case 1:
                    new Bot(e.id, e.name, e.x, e.y, e.color);
                    break;

                case 2:
                    new resource.Resource(e.id, e.x, e.y, resource.ResourceType.crystal);
                    break;

                case 3:
                    new resource.Resource(e.id, e.x, e.y, resource.ResourceType.metal);
                    break;

                case 4:
                    new resource.Resource(e.id, e.x, e.y, resource.ResourceType.fuel);
                    break;

                default:
                    break;
            }
        });
    }

    moveEntity(packet) {
        packet.updates.forEach(e => {
            renderer.move(e.id, e.x, e.y);
        });
    }
}

function parseCookies() {
    const entries = document.cookie.split(";");
    const result = {};
    entries.forEach(e => {
        const kv = e.split("=", 2);
        result[kv[0]] = kv.length > 1 ? kv[1] : true;
    });
    return result;
}

window.onunload = function () {
    console.log("token=" + player.token + ";gtp=" + renderer.gtp + ";x=" + renderer.x + ";y=" + renderer.y + ";");
}

const cookies = parseCookies();
if ("token" in cookies) {
    player.token = cookies["token"];
}
if ("gtp" in cookies) {
    renderer.gtp = cookies["gtp"];
    renderer.bo = renderer.gtp + 7;
}
if ("x" in cookies && "y" in cookies) {
    renderer.x = cookies["x"];
    renderer.y = cookies["y"];
}

/*preload.on("complete", function (event) {
    const client = new Client();
    client.sendLoginRequest();
})*/
const client = new Client();
client.sendLoginRequest();