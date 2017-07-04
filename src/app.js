const ByteBuffer = require("./buffer");
const packets = require("./packets");
const player = require("./player");
const renderer = require("./renderer");
const preload = require("./preload");

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
                    client.loginResponse(new packets.LoginResponsePacket.fromBuffer(id, buffer));
                    break;

                case 2:
                    client.clientData(new packets.ClientDataPacket.fromBuffer(id, buffer));
                    break;

                case 5:
                    client.viewResponse(new packets.ViewResponsePacket.fromBuffer(id, buffer));
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

    sendViewRequest() {
        const packet = new packets.ViewRequestPacket(0x03);
        result.token = player.token;
        result.x = renderer.x;
        result.y = renderer.y;
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

        this.sendViewRequest();
    }

    viewResponse(packet) {
        renderer.x = packet.x;
        renderer.y = packet.y;
        renderer.bases = packet.bases;
        renderer.bots = packet.bots;
        renderer.resources = packet.resources;

        renderer.stage.removeAllChildren();
        renderer.init();
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

preload.on("complete", function(event) {
    const client = new Client();
    client.sendLoginRequest();
})