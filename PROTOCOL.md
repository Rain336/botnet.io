# Botnet.io Protocol

## Datatypes
|Name|Description|
|----|-----------|
|byte|unsigned 8-bit Integer.|
|short|unsigned 16-bit Integer.|
|int|unsigned 32-bit Integer.|
|varint|base-128 variable sized Integer.|
|string|A varint-prefixed UTF-8 string.|

## Packets

### Basic structure
|Name|Type|
|----|----|
|packetid|byte|
|token|int|

### 0x00 | Login Request Packet (Client -> Server)
Token is 0 if the Player is new.
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

## 0x03 | Add Entity Packet (Server -> Client)
|Name|Type|
|----|----|
|Entries|varint|
|Entities|Entity[]|

### Entity
|Name|Type|
|----|----|
|Id|int|
|Name|string|
|X|varint|
|Y|varint|
|Color|string|
|Type|byte|

### Type
- Base (0)
- Bot (1)
- Crystal (2)
- Metal (3)
- Erchius Fuel (4)

## 0x04 | Entity Move Packet (Server <-> Client)
|Name|Type|
|----|----|
|Entries|varint|
|Updates|Move[]|

### Move
|Name|Type|
|----|----|
|Id|int|
|X|varint|
|Y|varint|

## 0x05 | Move Player Packet (Client -> Server)
|Name|Type|
|----|----|
|X|varint|
|Y|varint|