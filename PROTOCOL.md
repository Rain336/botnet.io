# Botnet.io Protocol

## Datatypes
|Name|Description|
|----|-----------|
|byte|unsigned 8-bit Integer.|
|short|unsigned 16-bit Integer.|
|int|unsigned 32-bit Integer.|
|varint|base-128 variable sized Integer.|
|string|A varint-prefixed UTF-8 string.|

## Data Structures

### Base
|Name|Type|
|----|----|
|name|string|
|x|short|
|y|short|
|color|string|

### Bot
|Name|Type|
|----|----|
|name|string|
|x|short|
|y|short|
|color|string|

### Resource
|Name|Type|
|----|----|
|type|byte enum|
|x|short|
|y|short|
|color|string|

Types:
- Crystal (0)
- Metal (1)
- Erchius Fuel (2)

## Packets

### Basic structure
|Name|Type|
|----|----|
|packetid|byte|
|token|int|

### 0x00 | Login Request Packet (Client -> Server)
Token is 0 if Player is unknowen.
|Name|Type|
|----|----|
|GridToPixel|byte|
|Width|short|
|Height|short|

### 0x01 | Login Response Packet (Server -> Client)
|Name|Type|
|----|----|

### 0x02 | Client Data Packet (Server -> Client)
|Name|Type|
|----|----|
|Crystals|varint|
|Metal|varint|
|Fuel|varint
|TotalEnergy|varint|
|UsedEnergy|varint|

### 0x03 | View Request Packet (Client -> Server)
|Name|Type|
|----|----|
|x|short|
|y|short|

### 0x04 | View Update Packet (Client -> Server)
|Name|Type|
|----|----|
|ChangeX|int|
|ChangeY|int|

### 0x05 | View Response Packet (Server -> Client)
|Name|Type|
|----|----|
|x|short|
|y|short|
|BaseCount|varint|
|Bases|Base[]|
|BotCount|varint|
|Bots|Bot[]|
|ResourceCount|varint|
|Resources|Resource[]|