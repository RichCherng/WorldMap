/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const worldmap = $root.worldmap = (() => {

    /**
     * Namespace worldmap.
     * @exports worldmap
     * @namespace
     */
    const worldmap = {};

    worldmap.flashcard = (function() {

        /**
         * Namespace flashcard.
         * @memberof worldmap
         * @namespace
         */
        const flashcard = {};

        flashcard.ChineseFlashCard = (function() {

            /**
             * Properties of a ChineseFlashCard.
             * @memberof worldmap.flashcard
             * @interface IChineseFlashCard
             * @property {number|Long|null} [id] ChineseFlashCard id
             * @property {string|null} [chineseWord] ChineseFlashCard chineseWord
             * @property {string|null} [englishWord] ChineseFlashCard englishWord
             * @property {string|null} [pinyin] ChineseFlashCard pinyin
             * @property {string|null} [img] ChineseFlashCard img
             * @property {number|Long|null} [createdAt] ChineseFlashCard createdAt
             * @property {number|Long|null} [updatedAt] ChineseFlashCard updatedAt
             * @property {string|null} [exampleUsage] ChineseFlashCard exampleUsage
             */

            /**
             * Constructs a new ChineseFlashCard.
             * @memberof worldmap.flashcard
             * @classdesc Represents a ChineseFlashCard.
             * @implements IChineseFlashCard
             * @constructor
             * @param {worldmap.flashcard.IChineseFlashCard=} [properties] Properties to set
             */
            function ChineseFlashCard(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ChineseFlashCard id.
             * @member {number|Long} id
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ChineseFlashCard chineseWord.
             * @member {string} chineseWord
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.chineseWord = "";

            /**
             * ChineseFlashCard englishWord.
             * @member {string} englishWord
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.englishWord = "";

            /**
             * ChineseFlashCard pinyin.
             * @member {string} pinyin
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.pinyin = "";

            /**
             * ChineseFlashCard img.
             * @member {string} img
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.img = "";

            /**
             * ChineseFlashCard createdAt.
             * @member {number|Long} createdAt
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ChineseFlashCard updatedAt.
             * @member {number|Long} updatedAt
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.updatedAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * ChineseFlashCard exampleUsage.
             * @member {string} exampleUsage
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.exampleUsage = "";

            /**
             * Creates a new ChineseFlashCard instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {worldmap.flashcard.IChineseFlashCard=} [properties] Properties to set
             * @returns {worldmap.flashcard.ChineseFlashCard} ChineseFlashCard instance
             */
            ChineseFlashCard.create = function create(properties) {
                return new ChineseFlashCard(properties);
            };

            /**
             * Encodes the specified ChineseFlashCard message. Does not implicitly {@link worldmap.flashcard.ChineseFlashCard.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {worldmap.flashcard.IChineseFlashCard} message ChineseFlashCard message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChineseFlashCard.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                if (message.chineseWord != null && Object.hasOwnProperty.call(message, "chineseWord"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.chineseWord);
                if (message.englishWord != null && Object.hasOwnProperty.call(message, "englishWord"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.englishWord);
                if (message.pinyin != null && Object.hasOwnProperty.call(message, "pinyin"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.pinyin);
                if (message.img != null && Object.hasOwnProperty.call(message, "img"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.img);
                if (message.createdAt != null && Object.hasOwnProperty.call(message, "createdAt"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int64(message.createdAt);
                if (message.updatedAt != null && Object.hasOwnProperty.call(message, "updatedAt"))
                    writer.uint32(/* id 7, wireType 0 =*/56).int64(message.updatedAt);
                if (message.exampleUsage != null && Object.hasOwnProperty.call(message, "exampleUsage"))
                    writer.uint32(/* id 8, wireType 2 =*/66).string(message.exampleUsage);
                return writer;
            };

            /**
             * Encodes the specified ChineseFlashCard message, length delimited. Does not implicitly {@link worldmap.flashcard.ChineseFlashCard.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {worldmap.flashcard.IChineseFlashCard} message ChineseFlashCard message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChineseFlashCard.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ChineseFlashCard message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.ChineseFlashCard} ChineseFlashCard
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChineseFlashCard.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.ChineseFlashCard();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int64();
                            break;
                        }
                    case 2: {
                            message.chineseWord = reader.string();
                            break;
                        }
                    case 3: {
                            message.englishWord = reader.string();
                            break;
                        }
                    case 4: {
                            message.pinyin = reader.string();
                            break;
                        }
                    case 5: {
                            message.img = reader.string();
                            break;
                        }
                    case 6: {
                            message.createdAt = reader.int64();
                            break;
                        }
                    case 7: {
                            message.updatedAt = reader.int64();
                            break;
                        }
                    case 8: {
                            message.exampleUsage = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ChineseFlashCard message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.ChineseFlashCard} ChineseFlashCard
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChineseFlashCard.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ChineseFlashCard message.
             * @function verify
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChineseFlashCard.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.chineseWord != null && message.hasOwnProperty("chineseWord"))
                    if (!$util.isString(message.chineseWord))
                        return "chineseWord: string expected";
                if (message.englishWord != null && message.hasOwnProperty("englishWord"))
                    if (!$util.isString(message.englishWord))
                        return "englishWord: string expected";
                if (message.pinyin != null && message.hasOwnProperty("pinyin"))
                    if (!$util.isString(message.pinyin))
                        return "pinyin: string expected";
                if (message.img != null && message.hasOwnProperty("img"))
                    if (!$util.isString(message.img))
                        return "img: string expected";
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                        return "createdAt: integer|Long expected";
                if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                    if (!$util.isInteger(message.updatedAt) && !(message.updatedAt && $util.isInteger(message.updatedAt.low) && $util.isInteger(message.updatedAt.high)))
                        return "updatedAt: integer|Long expected";
                if (message.exampleUsage != null && message.hasOwnProperty("exampleUsage"))
                    if (!$util.isString(message.exampleUsage))
                        return "exampleUsage: string expected";
                return null;
            };

            /**
             * Creates a ChineseFlashCard message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.ChineseFlashCard} ChineseFlashCard
             */
            ChineseFlashCard.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.ChineseFlashCard)
                    return object;
                let message = new $root.worldmap.flashcard.ChineseFlashCard();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                if (object.chineseWord != null)
                    message.chineseWord = String(object.chineseWord);
                if (object.englishWord != null)
                    message.englishWord = String(object.englishWord);
                if (object.pinyin != null)
                    message.pinyin = String(object.pinyin);
                if (object.img != null)
                    message.img = String(object.img);
                if (object.createdAt != null)
                    if ($util.Long)
                        (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = false;
                    else if (typeof object.createdAt === "string")
                        message.createdAt = parseInt(object.createdAt, 10);
                    else if (typeof object.createdAt === "number")
                        message.createdAt = object.createdAt;
                    else if (typeof object.createdAt === "object")
                        message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber();
                if (object.updatedAt != null)
                    if ($util.Long)
                        (message.updatedAt = $util.Long.fromValue(object.updatedAt)).unsigned = false;
                    else if (typeof object.updatedAt === "string")
                        message.updatedAt = parseInt(object.updatedAt, 10);
                    else if (typeof object.updatedAt === "number")
                        message.updatedAt = object.updatedAt;
                    else if (typeof object.updatedAt === "object")
                        message.updatedAt = new $util.LongBits(object.updatedAt.low >>> 0, object.updatedAt.high >>> 0).toNumber();
                if (object.exampleUsage != null)
                    message.exampleUsage = String(object.exampleUsage);
                return message;
            };

            /**
             * Creates a plain object from a ChineseFlashCard message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {worldmap.flashcard.ChineseFlashCard} message ChineseFlashCard
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChineseFlashCard.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.chineseWord = "";
                    object.englishWord = "";
                    object.pinyin = "";
                    object.img = "";
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.createdAt = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.updatedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.updatedAt = options.longs === String ? "0" : 0;
                    object.exampleUsage = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.chineseWord != null && message.hasOwnProperty("chineseWord"))
                    object.chineseWord = message.chineseWord;
                if (message.englishWord != null && message.hasOwnProperty("englishWord"))
                    object.englishWord = message.englishWord;
                if (message.pinyin != null && message.hasOwnProperty("pinyin"))
                    object.pinyin = message.pinyin;
                if (message.img != null && message.hasOwnProperty("img"))
                    object.img = message.img;
                if (message.createdAt != null && message.hasOwnProperty("createdAt"))
                    if (typeof message.createdAt === "number")
                        object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
                    else
                        object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber() : message.createdAt;
                if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
                    if (typeof message.updatedAt === "number")
                        object.updatedAt = options.longs === String ? String(message.updatedAt) : message.updatedAt;
                    else
                        object.updatedAt = options.longs === String ? $util.Long.prototype.toString.call(message.updatedAt) : options.longs === Number ? new $util.LongBits(message.updatedAt.low >>> 0, message.updatedAt.high >>> 0).toNumber() : message.updatedAt;
                if (message.exampleUsage != null && message.hasOwnProperty("exampleUsage"))
                    object.exampleUsage = message.exampleUsage;
                return object;
            };

            /**
             * Converts this ChineseFlashCard to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChineseFlashCard.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ChineseFlashCard
             * @function getTypeUrl
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ChineseFlashCard.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.ChineseFlashCard";
            };

            return ChineseFlashCard;
        })();

        flashcard.CreateChineseFlashCardRequest = (function() {

            /**
             * Properties of a CreateChineseFlashCardRequest.
             * @memberof worldmap.flashcard
             * @interface ICreateChineseFlashCardRequest
             * @property {string|null} [chineseWord] CreateChineseFlashCardRequest chineseWord
             * @property {string|null} [englishWord] CreateChineseFlashCardRequest englishWord
             * @property {string|null} [pinyin] CreateChineseFlashCardRequest pinyin
             * @property {string|null} [img] CreateChineseFlashCardRequest img
             */

            /**
             * Constructs a new CreateChineseFlashCardRequest.
             * @memberof worldmap.flashcard
             * @classdesc Represents a CreateChineseFlashCardRequest.
             * @implements ICreateChineseFlashCardRequest
             * @constructor
             * @param {worldmap.flashcard.ICreateChineseFlashCardRequest=} [properties] Properties to set
             */
            function CreateChineseFlashCardRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateChineseFlashCardRequest chineseWord.
             * @member {string} chineseWord
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @instance
             */
            CreateChineseFlashCardRequest.prototype.chineseWord = "";

            /**
             * CreateChineseFlashCardRequest englishWord.
             * @member {string} englishWord
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @instance
             */
            CreateChineseFlashCardRequest.prototype.englishWord = "";

            /**
             * CreateChineseFlashCardRequest pinyin.
             * @member {string} pinyin
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @instance
             */
            CreateChineseFlashCardRequest.prototype.pinyin = "";

            /**
             * CreateChineseFlashCardRequest img.
             * @member {string} img
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @instance
             */
            CreateChineseFlashCardRequest.prototype.img = "";

            /**
             * Creates a new CreateChineseFlashCardRequest instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.ICreateChineseFlashCardRequest=} [properties] Properties to set
             * @returns {worldmap.flashcard.CreateChineseFlashCardRequest} CreateChineseFlashCardRequest instance
             */
            CreateChineseFlashCardRequest.create = function create(properties) {
                return new CreateChineseFlashCardRequest(properties);
            };

            /**
             * Encodes the specified CreateChineseFlashCardRequest message. Does not implicitly {@link worldmap.flashcard.CreateChineseFlashCardRequest.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.ICreateChineseFlashCardRequest} message CreateChineseFlashCardRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateChineseFlashCardRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.chineseWord != null && Object.hasOwnProperty.call(message, "chineseWord"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.chineseWord);
                if (message.englishWord != null && Object.hasOwnProperty.call(message, "englishWord"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.englishWord);
                if (message.pinyin != null && Object.hasOwnProperty.call(message, "pinyin"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.pinyin);
                if (message.img != null && Object.hasOwnProperty.call(message, "img"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.img);
                return writer;
            };

            /**
             * Encodes the specified CreateChineseFlashCardRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.CreateChineseFlashCardRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.ICreateChineseFlashCardRequest} message CreateChineseFlashCardRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateChineseFlashCardRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CreateChineseFlashCardRequest message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.CreateChineseFlashCardRequest} CreateChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateChineseFlashCardRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.CreateChineseFlashCardRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.chineseWord = reader.string();
                            break;
                        }
                    case 2: {
                            message.englishWord = reader.string();
                            break;
                        }
                    case 3: {
                            message.pinyin = reader.string();
                            break;
                        }
                    case 4: {
                            message.img = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CreateChineseFlashCardRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.CreateChineseFlashCardRequest} CreateChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateChineseFlashCardRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CreateChineseFlashCardRequest message.
             * @function verify
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CreateChineseFlashCardRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.chineseWord != null && message.hasOwnProperty("chineseWord"))
                    if (!$util.isString(message.chineseWord))
                        return "chineseWord: string expected";
                if (message.englishWord != null && message.hasOwnProperty("englishWord"))
                    if (!$util.isString(message.englishWord))
                        return "englishWord: string expected";
                if (message.pinyin != null && message.hasOwnProperty("pinyin"))
                    if (!$util.isString(message.pinyin))
                        return "pinyin: string expected";
                if (message.img != null && message.hasOwnProperty("img"))
                    if (!$util.isString(message.img))
                        return "img: string expected";
                return null;
            };

            /**
             * Creates a CreateChineseFlashCardRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.CreateChineseFlashCardRequest} CreateChineseFlashCardRequest
             */
            CreateChineseFlashCardRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.CreateChineseFlashCardRequest)
                    return object;
                let message = new $root.worldmap.flashcard.CreateChineseFlashCardRequest();
                if (object.chineseWord != null)
                    message.chineseWord = String(object.chineseWord);
                if (object.englishWord != null)
                    message.englishWord = String(object.englishWord);
                if (object.pinyin != null)
                    message.pinyin = String(object.pinyin);
                if (object.img != null)
                    message.img = String(object.img);
                return message;
            };

            /**
             * Creates a plain object from a CreateChineseFlashCardRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.CreateChineseFlashCardRequest} message CreateChineseFlashCardRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateChineseFlashCardRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.chineseWord = "";
                    object.englishWord = "";
                    object.pinyin = "";
                    object.img = "";
                }
                if (message.chineseWord != null && message.hasOwnProperty("chineseWord"))
                    object.chineseWord = message.chineseWord;
                if (message.englishWord != null && message.hasOwnProperty("englishWord"))
                    object.englishWord = message.englishWord;
                if (message.pinyin != null && message.hasOwnProperty("pinyin"))
                    object.pinyin = message.pinyin;
                if (message.img != null && message.hasOwnProperty("img"))
                    object.img = message.img;
                return object;
            };

            /**
             * Converts this CreateChineseFlashCardRequest to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateChineseFlashCardRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CreateChineseFlashCardRequest
             * @function getTypeUrl
             * @memberof worldmap.flashcard.CreateChineseFlashCardRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CreateChineseFlashCardRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.CreateChineseFlashCardRequest";
            };

            return CreateChineseFlashCardRequest;
        })();

        flashcard.CreateChineseFlashCardResponse = (function() {

            /**
             * Properties of a CreateChineseFlashCardResponse.
             * @memberof worldmap.flashcard
             * @interface ICreateChineseFlashCardResponse
             * @property {boolean|null} [success] CreateChineseFlashCardResponse success
             * @property {worldmap.flashcard.IChineseFlashCard|null} [data] CreateChineseFlashCardResponse data
             * @property {string|null} [message] CreateChineseFlashCardResponse message
             * @property {string|null} [error] CreateChineseFlashCardResponse error
             */

            /**
             * Constructs a new CreateChineseFlashCardResponse.
             * @memberof worldmap.flashcard
             * @classdesc Represents a CreateChineseFlashCardResponse.
             * @implements ICreateChineseFlashCardResponse
             * @constructor
             * @param {worldmap.flashcard.ICreateChineseFlashCardResponse=} [properties] Properties to set
             */
            function CreateChineseFlashCardResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateChineseFlashCardResponse success.
             * @member {boolean} success
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @instance
             */
            CreateChineseFlashCardResponse.prototype.success = false;

            /**
             * CreateChineseFlashCardResponse data.
             * @member {worldmap.flashcard.IChineseFlashCard|null|undefined} data
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @instance
             */
            CreateChineseFlashCardResponse.prototype.data = null;

            /**
             * CreateChineseFlashCardResponse message.
             * @member {string} message
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @instance
             */
            CreateChineseFlashCardResponse.prototype.message = "";

            /**
             * CreateChineseFlashCardResponse error.
             * @member {string} error
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @instance
             */
            CreateChineseFlashCardResponse.prototype.error = "";

            /**
             * Creates a new CreateChineseFlashCardResponse instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.ICreateChineseFlashCardResponse=} [properties] Properties to set
             * @returns {worldmap.flashcard.CreateChineseFlashCardResponse} CreateChineseFlashCardResponse instance
             */
            CreateChineseFlashCardResponse.create = function create(properties) {
                return new CreateChineseFlashCardResponse(properties);
            };

            /**
             * Encodes the specified CreateChineseFlashCardResponse message. Does not implicitly {@link worldmap.flashcard.CreateChineseFlashCardResponse.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.ICreateChineseFlashCardResponse} message CreateChineseFlashCardResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateChineseFlashCardResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    $root.worldmap.flashcard.ChineseFlashCard.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.error);
                return writer;
            };

            /**
             * Encodes the specified CreateChineseFlashCardResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.CreateChineseFlashCardResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.ICreateChineseFlashCardResponse} message CreateChineseFlashCardResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateChineseFlashCardResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a CreateChineseFlashCardResponse message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.CreateChineseFlashCardResponse} CreateChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateChineseFlashCardResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.CreateChineseFlashCardResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.data = $root.worldmap.flashcard.ChineseFlashCard.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.message = reader.string();
                            break;
                        }
                    case 4: {
                            message.error = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a CreateChineseFlashCardResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.CreateChineseFlashCardResponse} CreateChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateChineseFlashCardResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a CreateChineseFlashCardResponse message.
             * @function verify
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CreateChineseFlashCardResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.data != null && message.hasOwnProperty("data")) {
                    let error = $root.worldmap.flashcard.ChineseFlashCard.verify(message.data);
                    if (error)
                        return "data." + error;
                }
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.error != null && message.hasOwnProperty("error"))
                    if (!$util.isString(message.error))
                        return "error: string expected";
                return null;
            };

            /**
             * Creates a CreateChineseFlashCardResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.CreateChineseFlashCardResponse} CreateChineseFlashCardResponse
             */
            CreateChineseFlashCardResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.CreateChineseFlashCardResponse)
                    return object;
                let message = new $root.worldmap.flashcard.CreateChineseFlashCardResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.data != null) {
                    if (typeof object.data !== "object")
                        throw TypeError(".worldmap.flashcard.CreateChineseFlashCardResponse.data: object expected");
                    message.data = $root.worldmap.flashcard.ChineseFlashCard.fromObject(object.data);
                }
                if (object.message != null)
                    message.message = String(object.message);
                if (object.error != null)
                    message.error = String(object.error);
                return message;
            };

            /**
             * Creates a plain object from a CreateChineseFlashCardResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.CreateChineseFlashCardResponse} message CreateChineseFlashCardResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateChineseFlashCardResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.success = false;
                    object.data = null;
                    object.message = "";
                    object.error = "";
                }
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = $root.worldmap.flashcard.ChineseFlashCard.toObject(message.data, options);
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = message.error;
                return object;
            };

            /**
             * Converts this CreateChineseFlashCardResponse to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateChineseFlashCardResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for CreateChineseFlashCardResponse
             * @function getTypeUrl
             * @memberof worldmap.flashcard.CreateChineseFlashCardResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            CreateChineseFlashCardResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.CreateChineseFlashCardResponse";
            };

            return CreateChineseFlashCardResponse;
        })();

        flashcard.GetChineseFlashCardsRequest = (function() {

            /**
             * Properties of a GetChineseFlashCardsRequest.
             * @memberof worldmap.flashcard
             * @interface IGetChineseFlashCardsRequest
             * @property {number|null} [page] GetChineseFlashCardsRequest page
             * @property {number|null} [pageSize] GetChineseFlashCardsRequest pageSize
             */

            /**
             * Constructs a new GetChineseFlashCardsRequest.
             * @memberof worldmap.flashcard
             * @classdesc Represents a GetChineseFlashCardsRequest.
             * @implements IGetChineseFlashCardsRequest
             * @constructor
             * @param {worldmap.flashcard.IGetChineseFlashCardsRequest=} [properties] Properties to set
             */
            function GetChineseFlashCardsRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetChineseFlashCardsRequest page.
             * @member {number} page
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @instance
             */
            GetChineseFlashCardsRequest.prototype.page = 0;

            /**
             * GetChineseFlashCardsRequest pageSize.
             * @member {number} pageSize
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @instance
             */
            GetChineseFlashCardsRequest.prototype.pageSize = 0;

            /**
             * Creates a new GetChineseFlashCardsRequest instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardsRequest=} [properties] Properties to set
             * @returns {worldmap.flashcard.GetChineseFlashCardsRequest} GetChineseFlashCardsRequest instance
             */
            GetChineseFlashCardsRequest.create = function create(properties) {
                return new GetChineseFlashCardsRequest(properties);
            };

            /**
             * Encodes the specified GetChineseFlashCardsRequest message. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardsRequest.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardsRequest} message GetChineseFlashCardsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChineseFlashCardsRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.page != null && Object.hasOwnProperty.call(message, "page"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.page);
                if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.pageSize);
                return writer;
            };

            /**
             * Encodes the specified GetChineseFlashCardsRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardsRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardsRequest} message GetChineseFlashCardsRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChineseFlashCardsRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetChineseFlashCardsRequest message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.GetChineseFlashCardsRequest} GetChineseFlashCardsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChineseFlashCardsRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.GetChineseFlashCardsRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.page = reader.int32();
                            break;
                        }
                    case 2: {
                            message.pageSize = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetChineseFlashCardsRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.GetChineseFlashCardsRequest} GetChineseFlashCardsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChineseFlashCardsRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetChineseFlashCardsRequest message.
             * @function verify
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetChineseFlashCardsRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.page != null && message.hasOwnProperty("page"))
                    if (!$util.isInteger(message.page))
                        return "page: integer expected";
                if (message.pageSize != null && message.hasOwnProperty("pageSize"))
                    if (!$util.isInteger(message.pageSize))
                        return "pageSize: integer expected";
                return null;
            };

            /**
             * Creates a GetChineseFlashCardsRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.GetChineseFlashCardsRequest} GetChineseFlashCardsRequest
             */
            GetChineseFlashCardsRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.GetChineseFlashCardsRequest)
                    return object;
                let message = new $root.worldmap.flashcard.GetChineseFlashCardsRequest();
                if (object.page != null)
                    message.page = object.page | 0;
                if (object.pageSize != null)
                    message.pageSize = object.pageSize | 0;
                return message;
            };

            /**
             * Creates a plain object from a GetChineseFlashCardsRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {worldmap.flashcard.GetChineseFlashCardsRequest} message GetChineseFlashCardsRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetChineseFlashCardsRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.page = 0;
                    object.pageSize = 0;
                }
                if (message.page != null && message.hasOwnProperty("page"))
                    object.page = message.page;
                if (message.pageSize != null && message.hasOwnProperty("pageSize"))
                    object.pageSize = message.pageSize;
                return object;
            };

            /**
             * Converts this GetChineseFlashCardsRequest to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetChineseFlashCardsRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for GetChineseFlashCardsRequest
             * @function getTypeUrl
             * @memberof worldmap.flashcard.GetChineseFlashCardsRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GetChineseFlashCardsRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.GetChineseFlashCardsRequest";
            };

            return GetChineseFlashCardsRequest;
        })();

        flashcard.GetChineseFlashCardsResponse = (function() {

            /**
             * Properties of a GetChineseFlashCardsResponse.
             * @memberof worldmap.flashcard
             * @interface IGetChineseFlashCardsResponse
             * @property {boolean|null} [success] GetChineseFlashCardsResponse success
             * @property {Array.<worldmap.flashcard.IChineseFlashCard>|null} [data] GetChineseFlashCardsResponse data
             * @property {string|null} [message] GetChineseFlashCardsResponse message
             * @property {string|null} [error] GetChineseFlashCardsResponse error
             * @property {number|null} [totalCount] GetChineseFlashCardsResponse totalCount
             */

            /**
             * Constructs a new GetChineseFlashCardsResponse.
             * @memberof worldmap.flashcard
             * @classdesc Represents a GetChineseFlashCardsResponse.
             * @implements IGetChineseFlashCardsResponse
             * @constructor
             * @param {worldmap.flashcard.IGetChineseFlashCardsResponse=} [properties] Properties to set
             */
            function GetChineseFlashCardsResponse(properties) {
                this.data = [];
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetChineseFlashCardsResponse success.
             * @member {boolean} success
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @instance
             */
            GetChineseFlashCardsResponse.prototype.success = false;

            /**
             * GetChineseFlashCardsResponse data.
             * @member {Array.<worldmap.flashcard.IChineseFlashCard>} data
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @instance
             */
            GetChineseFlashCardsResponse.prototype.data = $util.emptyArray;

            /**
             * GetChineseFlashCardsResponse message.
             * @member {string} message
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @instance
             */
            GetChineseFlashCardsResponse.prototype.message = "";

            /**
             * GetChineseFlashCardsResponse error.
             * @member {string} error
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @instance
             */
            GetChineseFlashCardsResponse.prototype.error = "";

            /**
             * GetChineseFlashCardsResponse totalCount.
             * @member {number} totalCount
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @instance
             */
            GetChineseFlashCardsResponse.prototype.totalCount = 0;

            /**
             * Creates a new GetChineseFlashCardsResponse instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardsResponse=} [properties] Properties to set
             * @returns {worldmap.flashcard.GetChineseFlashCardsResponse} GetChineseFlashCardsResponse instance
             */
            GetChineseFlashCardsResponse.create = function create(properties) {
                return new GetChineseFlashCardsResponse(properties);
            };

            /**
             * Encodes the specified GetChineseFlashCardsResponse message. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardsResponse.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardsResponse} message GetChineseFlashCardsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChineseFlashCardsResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.data != null && message.data.length)
                    for (let i = 0; i < message.data.length; ++i)
                        $root.worldmap.flashcard.ChineseFlashCard.encode(message.data[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.error);
                if (message.totalCount != null && Object.hasOwnProperty.call(message, "totalCount"))
                    writer.uint32(/* id 5, wireType 0 =*/40).int32(message.totalCount);
                return writer;
            };

            /**
             * Encodes the specified GetChineseFlashCardsResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardsResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardsResponse} message GetChineseFlashCardsResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChineseFlashCardsResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetChineseFlashCardsResponse message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.GetChineseFlashCardsResponse} GetChineseFlashCardsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChineseFlashCardsResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.GetChineseFlashCardsResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            if (!(message.data && message.data.length))
                                message.data = [];
                            message.data.push($root.worldmap.flashcard.ChineseFlashCard.decode(reader, reader.uint32()));
                            break;
                        }
                    case 3: {
                            message.message = reader.string();
                            break;
                        }
                    case 4: {
                            message.error = reader.string();
                            break;
                        }
                    case 5: {
                            message.totalCount = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetChineseFlashCardsResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.GetChineseFlashCardsResponse} GetChineseFlashCardsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChineseFlashCardsResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetChineseFlashCardsResponse message.
             * @function verify
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetChineseFlashCardsResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.data != null && message.hasOwnProperty("data")) {
                    if (!Array.isArray(message.data))
                        return "data: array expected";
                    for (let i = 0; i < message.data.length; ++i) {
                        let error = $root.worldmap.flashcard.ChineseFlashCard.verify(message.data[i]);
                        if (error)
                            return "data." + error;
                    }
                }
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.error != null && message.hasOwnProperty("error"))
                    if (!$util.isString(message.error))
                        return "error: string expected";
                if (message.totalCount != null && message.hasOwnProperty("totalCount"))
                    if (!$util.isInteger(message.totalCount))
                        return "totalCount: integer expected";
                return null;
            };

            /**
             * Creates a GetChineseFlashCardsResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.GetChineseFlashCardsResponse} GetChineseFlashCardsResponse
             */
            GetChineseFlashCardsResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.GetChineseFlashCardsResponse)
                    return object;
                let message = new $root.worldmap.flashcard.GetChineseFlashCardsResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.data) {
                    if (!Array.isArray(object.data))
                        throw TypeError(".worldmap.flashcard.GetChineseFlashCardsResponse.data: array expected");
                    message.data = [];
                    for (let i = 0; i < object.data.length; ++i) {
                        if (typeof object.data[i] !== "object")
                            throw TypeError(".worldmap.flashcard.GetChineseFlashCardsResponse.data: object expected");
                        message.data[i] = $root.worldmap.flashcard.ChineseFlashCard.fromObject(object.data[i]);
                    }
                }
                if (object.message != null)
                    message.message = String(object.message);
                if (object.error != null)
                    message.error = String(object.error);
                if (object.totalCount != null)
                    message.totalCount = object.totalCount | 0;
                return message;
            };

            /**
             * Creates a plain object from a GetChineseFlashCardsResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {worldmap.flashcard.GetChineseFlashCardsResponse} message GetChineseFlashCardsResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetChineseFlashCardsResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.arrays || options.defaults)
                    object.data = [];
                if (options.defaults) {
                    object.success = false;
                    object.message = "";
                    object.error = "";
                    object.totalCount = 0;
                }
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.data && message.data.length) {
                    object.data = [];
                    for (let j = 0; j < message.data.length; ++j)
                        object.data[j] = $root.worldmap.flashcard.ChineseFlashCard.toObject(message.data[j], options);
                }
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = message.error;
                if (message.totalCount != null && message.hasOwnProperty("totalCount"))
                    object.totalCount = message.totalCount;
                return object;
            };

            /**
             * Converts this GetChineseFlashCardsResponse to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetChineseFlashCardsResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for GetChineseFlashCardsResponse
             * @function getTypeUrl
             * @memberof worldmap.flashcard.GetChineseFlashCardsResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GetChineseFlashCardsResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.GetChineseFlashCardsResponse";
            };

            return GetChineseFlashCardsResponse;
        })();

        flashcard.GetChineseFlashCardRequest = (function() {

            /**
             * Properties of a GetChineseFlashCardRequest.
             * @memberof worldmap.flashcard
             * @interface IGetChineseFlashCardRequest
             * @property {number|Long|null} [id] GetChineseFlashCardRequest id
             */

            /**
             * Constructs a new GetChineseFlashCardRequest.
             * @memberof worldmap.flashcard
             * @classdesc Represents a GetChineseFlashCardRequest.
             * @implements IGetChineseFlashCardRequest
             * @constructor
             * @param {worldmap.flashcard.IGetChineseFlashCardRequest=} [properties] Properties to set
             */
            function GetChineseFlashCardRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetChineseFlashCardRequest id.
             * @member {number|Long} id
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @instance
             */
            GetChineseFlashCardRequest.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new GetChineseFlashCardRequest instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardRequest=} [properties] Properties to set
             * @returns {worldmap.flashcard.GetChineseFlashCardRequest} GetChineseFlashCardRequest instance
             */
            GetChineseFlashCardRequest.create = function create(properties) {
                return new GetChineseFlashCardRequest(properties);
            };

            /**
             * Encodes the specified GetChineseFlashCardRequest message. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardRequest.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardRequest} message GetChineseFlashCardRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChineseFlashCardRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                return writer;
            };

            /**
             * Encodes the specified GetChineseFlashCardRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardRequest} message GetChineseFlashCardRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChineseFlashCardRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetChineseFlashCardRequest message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.GetChineseFlashCardRequest} GetChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChineseFlashCardRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.GetChineseFlashCardRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetChineseFlashCardRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.GetChineseFlashCardRequest} GetChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChineseFlashCardRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetChineseFlashCardRequest message.
             * @function verify
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetChineseFlashCardRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                return null;
            };

            /**
             * Creates a GetChineseFlashCardRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.GetChineseFlashCardRequest} GetChineseFlashCardRequest
             */
            GetChineseFlashCardRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.GetChineseFlashCardRequest)
                    return object;
                let message = new $root.worldmap.flashcard.GetChineseFlashCardRequest();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a GetChineseFlashCardRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.GetChineseFlashCardRequest} message GetChineseFlashCardRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetChineseFlashCardRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                return object;
            };

            /**
             * Converts this GetChineseFlashCardRequest to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetChineseFlashCardRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for GetChineseFlashCardRequest
             * @function getTypeUrl
             * @memberof worldmap.flashcard.GetChineseFlashCardRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GetChineseFlashCardRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.GetChineseFlashCardRequest";
            };

            return GetChineseFlashCardRequest;
        })();

        flashcard.GetChineseFlashCardResponse = (function() {

            /**
             * Properties of a GetChineseFlashCardResponse.
             * @memberof worldmap.flashcard
             * @interface IGetChineseFlashCardResponse
             * @property {boolean|null} [success] GetChineseFlashCardResponse success
             * @property {worldmap.flashcard.IChineseFlashCard|null} [data] GetChineseFlashCardResponse data
             * @property {string|null} [message] GetChineseFlashCardResponse message
             * @property {string|null} [error] GetChineseFlashCardResponse error
             */

            /**
             * Constructs a new GetChineseFlashCardResponse.
             * @memberof worldmap.flashcard
             * @classdesc Represents a GetChineseFlashCardResponse.
             * @implements IGetChineseFlashCardResponse
             * @constructor
             * @param {worldmap.flashcard.IGetChineseFlashCardResponse=} [properties] Properties to set
             */
            function GetChineseFlashCardResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetChineseFlashCardResponse success.
             * @member {boolean} success
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @instance
             */
            GetChineseFlashCardResponse.prototype.success = false;

            /**
             * GetChineseFlashCardResponse data.
             * @member {worldmap.flashcard.IChineseFlashCard|null|undefined} data
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @instance
             */
            GetChineseFlashCardResponse.prototype.data = null;

            /**
             * GetChineseFlashCardResponse message.
             * @member {string} message
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @instance
             */
            GetChineseFlashCardResponse.prototype.message = "";

            /**
             * GetChineseFlashCardResponse error.
             * @member {string} error
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @instance
             */
            GetChineseFlashCardResponse.prototype.error = "";

            /**
             * Creates a new GetChineseFlashCardResponse instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardResponse=} [properties] Properties to set
             * @returns {worldmap.flashcard.GetChineseFlashCardResponse} GetChineseFlashCardResponse instance
             */
            GetChineseFlashCardResponse.create = function create(properties) {
                return new GetChineseFlashCardResponse(properties);
            };

            /**
             * Encodes the specified GetChineseFlashCardResponse message. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardResponse.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardResponse} message GetChineseFlashCardResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChineseFlashCardResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    $root.worldmap.flashcard.ChineseFlashCard.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.error);
                return writer;
            };

            /**
             * Encodes the specified GetChineseFlashCardResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IGetChineseFlashCardResponse} message GetChineseFlashCardResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetChineseFlashCardResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a GetChineseFlashCardResponse message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.GetChineseFlashCardResponse} GetChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChineseFlashCardResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.GetChineseFlashCardResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.data = $root.worldmap.flashcard.ChineseFlashCard.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.message = reader.string();
                            break;
                        }
                    case 4: {
                            message.error = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a GetChineseFlashCardResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.GetChineseFlashCardResponse} GetChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetChineseFlashCardResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a GetChineseFlashCardResponse message.
             * @function verify
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetChineseFlashCardResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.data != null && message.hasOwnProperty("data")) {
                    let error = $root.worldmap.flashcard.ChineseFlashCard.verify(message.data);
                    if (error)
                        return "data." + error;
                }
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.error != null && message.hasOwnProperty("error"))
                    if (!$util.isString(message.error))
                        return "error: string expected";
                return null;
            };

            /**
             * Creates a GetChineseFlashCardResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.GetChineseFlashCardResponse} GetChineseFlashCardResponse
             */
            GetChineseFlashCardResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.GetChineseFlashCardResponse)
                    return object;
                let message = new $root.worldmap.flashcard.GetChineseFlashCardResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.data != null) {
                    if (typeof object.data !== "object")
                        throw TypeError(".worldmap.flashcard.GetChineseFlashCardResponse.data: object expected");
                    message.data = $root.worldmap.flashcard.ChineseFlashCard.fromObject(object.data);
                }
                if (object.message != null)
                    message.message = String(object.message);
                if (object.error != null)
                    message.error = String(object.error);
                return message;
            };

            /**
             * Creates a plain object from a GetChineseFlashCardResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.GetChineseFlashCardResponse} message GetChineseFlashCardResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetChineseFlashCardResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.success = false;
                    object.data = null;
                    object.message = "";
                    object.error = "";
                }
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = $root.worldmap.flashcard.ChineseFlashCard.toObject(message.data, options);
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = message.error;
                return object;
            };

            /**
             * Converts this GetChineseFlashCardResponse to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetChineseFlashCardResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for GetChineseFlashCardResponse
             * @function getTypeUrl
             * @memberof worldmap.flashcard.GetChineseFlashCardResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            GetChineseFlashCardResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.GetChineseFlashCardResponse";
            };

            return GetChineseFlashCardResponse;
        })();

        flashcard.UpdateChineseFlashCardRequest = (function() {

            /**
             * Properties of an UpdateChineseFlashCardRequest.
             * @memberof worldmap.flashcard
             * @interface IUpdateChineseFlashCardRequest
             * @property {number|Long|null} [id] UpdateChineseFlashCardRequest id
             * @property {string|null} [chineseWord] UpdateChineseFlashCardRequest chineseWord
             * @property {string|null} [englishWord] UpdateChineseFlashCardRequest englishWord
             * @property {string|null} [pinyin] UpdateChineseFlashCardRequest pinyin
             * @property {string|null} [img] UpdateChineseFlashCardRequest img
             */

            /**
             * Constructs a new UpdateChineseFlashCardRequest.
             * @memberof worldmap.flashcard
             * @classdesc Represents an UpdateChineseFlashCardRequest.
             * @implements IUpdateChineseFlashCardRequest
             * @constructor
             * @param {worldmap.flashcard.IUpdateChineseFlashCardRequest=} [properties] Properties to set
             */
            function UpdateChineseFlashCardRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateChineseFlashCardRequest id.
             * @member {number|Long} id
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @instance
             */
            UpdateChineseFlashCardRequest.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * UpdateChineseFlashCardRequest chineseWord.
             * @member {string} chineseWord
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @instance
             */
            UpdateChineseFlashCardRequest.prototype.chineseWord = "";

            /**
             * UpdateChineseFlashCardRequest englishWord.
             * @member {string} englishWord
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @instance
             */
            UpdateChineseFlashCardRequest.prototype.englishWord = "";

            /**
             * UpdateChineseFlashCardRequest pinyin.
             * @member {string} pinyin
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @instance
             */
            UpdateChineseFlashCardRequest.prototype.pinyin = "";

            /**
             * UpdateChineseFlashCardRequest img.
             * @member {string} img
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @instance
             */
            UpdateChineseFlashCardRequest.prototype.img = "";

            /**
             * Creates a new UpdateChineseFlashCardRequest instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IUpdateChineseFlashCardRequest=} [properties] Properties to set
             * @returns {worldmap.flashcard.UpdateChineseFlashCardRequest} UpdateChineseFlashCardRequest instance
             */
            UpdateChineseFlashCardRequest.create = function create(properties) {
                return new UpdateChineseFlashCardRequest(properties);
            };

            /**
             * Encodes the specified UpdateChineseFlashCardRequest message. Does not implicitly {@link worldmap.flashcard.UpdateChineseFlashCardRequest.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IUpdateChineseFlashCardRequest} message UpdateChineseFlashCardRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UpdateChineseFlashCardRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                if (message.chineseWord != null && Object.hasOwnProperty.call(message, "chineseWord"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.chineseWord);
                if (message.englishWord != null && Object.hasOwnProperty.call(message, "englishWord"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.englishWord);
                if (message.pinyin != null && Object.hasOwnProperty.call(message, "pinyin"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.pinyin);
                if (message.img != null && Object.hasOwnProperty.call(message, "img"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.img);
                return writer;
            };

            /**
             * Encodes the specified UpdateChineseFlashCardRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.UpdateChineseFlashCardRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IUpdateChineseFlashCardRequest} message UpdateChineseFlashCardRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UpdateChineseFlashCardRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an UpdateChineseFlashCardRequest message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.UpdateChineseFlashCardRequest} UpdateChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpdateChineseFlashCardRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.UpdateChineseFlashCardRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int64();
                            break;
                        }
                    case 2: {
                            message.chineseWord = reader.string();
                            break;
                        }
                    case 3: {
                            message.englishWord = reader.string();
                            break;
                        }
                    case 4: {
                            message.pinyin = reader.string();
                            break;
                        }
                    case 5: {
                            message.img = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an UpdateChineseFlashCardRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.UpdateChineseFlashCardRequest} UpdateChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpdateChineseFlashCardRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an UpdateChineseFlashCardRequest message.
             * @function verify
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UpdateChineseFlashCardRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                if (message.chineseWord != null && message.hasOwnProperty("chineseWord"))
                    if (!$util.isString(message.chineseWord))
                        return "chineseWord: string expected";
                if (message.englishWord != null && message.hasOwnProperty("englishWord"))
                    if (!$util.isString(message.englishWord))
                        return "englishWord: string expected";
                if (message.pinyin != null && message.hasOwnProperty("pinyin"))
                    if (!$util.isString(message.pinyin))
                        return "pinyin: string expected";
                if (message.img != null && message.hasOwnProperty("img"))
                    if (!$util.isString(message.img))
                        return "img: string expected";
                return null;
            };

            /**
             * Creates an UpdateChineseFlashCardRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.UpdateChineseFlashCardRequest} UpdateChineseFlashCardRequest
             */
            UpdateChineseFlashCardRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.UpdateChineseFlashCardRequest)
                    return object;
                let message = new $root.worldmap.flashcard.UpdateChineseFlashCardRequest();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                if (object.chineseWord != null)
                    message.chineseWord = String(object.chineseWord);
                if (object.englishWord != null)
                    message.englishWord = String(object.englishWord);
                if (object.pinyin != null)
                    message.pinyin = String(object.pinyin);
                if (object.img != null)
                    message.img = String(object.img);
                return message;
            };

            /**
             * Creates a plain object from an UpdateChineseFlashCardRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.UpdateChineseFlashCardRequest} message UpdateChineseFlashCardRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateChineseFlashCardRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                    object.chineseWord = "";
                    object.englishWord = "";
                    object.pinyin = "";
                    object.img = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                if (message.chineseWord != null && message.hasOwnProperty("chineseWord"))
                    object.chineseWord = message.chineseWord;
                if (message.englishWord != null && message.hasOwnProperty("englishWord"))
                    object.englishWord = message.englishWord;
                if (message.pinyin != null && message.hasOwnProperty("pinyin"))
                    object.pinyin = message.pinyin;
                if (message.img != null && message.hasOwnProperty("img"))
                    object.img = message.img;
                return object;
            };

            /**
             * Converts this UpdateChineseFlashCardRequest to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateChineseFlashCardRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for UpdateChineseFlashCardRequest
             * @function getTypeUrl
             * @memberof worldmap.flashcard.UpdateChineseFlashCardRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            UpdateChineseFlashCardRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.UpdateChineseFlashCardRequest";
            };

            return UpdateChineseFlashCardRequest;
        })();

        flashcard.UpdateChineseFlashCardResponse = (function() {

            /**
             * Properties of an UpdateChineseFlashCardResponse.
             * @memberof worldmap.flashcard
             * @interface IUpdateChineseFlashCardResponse
             * @property {boolean|null} [success] UpdateChineseFlashCardResponse success
             * @property {worldmap.flashcard.IChineseFlashCard|null} [data] UpdateChineseFlashCardResponse data
             * @property {string|null} [message] UpdateChineseFlashCardResponse message
             * @property {string|null} [error] UpdateChineseFlashCardResponse error
             */

            /**
             * Constructs a new UpdateChineseFlashCardResponse.
             * @memberof worldmap.flashcard
             * @classdesc Represents an UpdateChineseFlashCardResponse.
             * @implements IUpdateChineseFlashCardResponse
             * @constructor
             * @param {worldmap.flashcard.IUpdateChineseFlashCardResponse=} [properties] Properties to set
             */
            function UpdateChineseFlashCardResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * UpdateChineseFlashCardResponse success.
             * @member {boolean} success
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @instance
             */
            UpdateChineseFlashCardResponse.prototype.success = false;

            /**
             * UpdateChineseFlashCardResponse data.
             * @member {worldmap.flashcard.IChineseFlashCard|null|undefined} data
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @instance
             */
            UpdateChineseFlashCardResponse.prototype.data = null;

            /**
             * UpdateChineseFlashCardResponse message.
             * @member {string} message
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @instance
             */
            UpdateChineseFlashCardResponse.prototype.message = "";

            /**
             * UpdateChineseFlashCardResponse error.
             * @member {string} error
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @instance
             */
            UpdateChineseFlashCardResponse.prototype.error = "";

            /**
             * Creates a new UpdateChineseFlashCardResponse instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IUpdateChineseFlashCardResponse=} [properties] Properties to set
             * @returns {worldmap.flashcard.UpdateChineseFlashCardResponse} UpdateChineseFlashCardResponse instance
             */
            UpdateChineseFlashCardResponse.create = function create(properties) {
                return new UpdateChineseFlashCardResponse(properties);
            };

            /**
             * Encodes the specified UpdateChineseFlashCardResponse message. Does not implicitly {@link worldmap.flashcard.UpdateChineseFlashCardResponse.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IUpdateChineseFlashCardResponse} message UpdateChineseFlashCardResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UpdateChineseFlashCardResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    $root.worldmap.flashcard.ChineseFlashCard.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.error);
                return writer;
            };

            /**
             * Encodes the specified UpdateChineseFlashCardResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.UpdateChineseFlashCardResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IUpdateChineseFlashCardResponse} message UpdateChineseFlashCardResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UpdateChineseFlashCardResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an UpdateChineseFlashCardResponse message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.UpdateChineseFlashCardResponse} UpdateChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpdateChineseFlashCardResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.UpdateChineseFlashCardResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.data = $root.worldmap.flashcard.ChineseFlashCard.decode(reader, reader.uint32());
                            break;
                        }
                    case 3: {
                            message.message = reader.string();
                            break;
                        }
                    case 4: {
                            message.error = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an UpdateChineseFlashCardResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.UpdateChineseFlashCardResponse} UpdateChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UpdateChineseFlashCardResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an UpdateChineseFlashCardResponse message.
             * @function verify
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UpdateChineseFlashCardResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.data != null && message.hasOwnProperty("data")) {
                    let error = $root.worldmap.flashcard.ChineseFlashCard.verify(message.data);
                    if (error)
                        return "data." + error;
                }
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.error != null && message.hasOwnProperty("error"))
                    if (!$util.isString(message.error))
                        return "error: string expected";
                return null;
            };

            /**
             * Creates an UpdateChineseFlashCardResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.UpdateChineseFlashCardResponse} UpdateChineseFlashCardResponse
             */
            UpdateChineseFlashCardResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.UpdateChineseFlashCardResponse)
                    return object;
                let message = new $root.worldmap.flashcard.UpdateChineseFlashCardResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.data != null) {
                    if (typeof object.data !== "object")
                        throw TypeError(".worldmap.flashcard.UpdateChineseFlashCardResponse.data: object expected");
                    message.data = $root.worldmap.flashcard.ChineseFlashCard.fromObject(object.data);
                }
                if (object.message != null)
                    message.message = String(object.message);
                if (object.error != null)
                    message.error = String(object.error);
                return message;
            };

            /**
             * Creates a plain object from an UpdateChineseFlashCardResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.UpdateChineseFlashCardResponse} message UpdateChineseFlashCardResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UpdateChineseFlashCardResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.success = false;
                    object.data = null;
                    object.message = "";
                    object.error = "";
                }
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = $root.worldmap.flashcard.ChineseFlashCard.toObject(message.data, options);
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = message.error;
                return object;
            };

            /**
             * Converts this UpdateChineseFlashCardResponse to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UpdateChineseFlashCardResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for UpdateChineseFlashCardResponse
             * @function getTypeUrl
             * @memberof worldmap.flashcard.UpdateChineseFlashCardResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            UpdateChineseFlashCardResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.UpdateChineseFlashCardResponse";
            };

            return UpdateChineseFlashCardResponse;
        })();

        flashcard.DeleteChineseFlashCardRequest = (function() {

            /**
             * Properties of a DeleteChineseFlashCardRequest.
             * @memberof worldmap.flashcard
             * @interface IDeleteChineseFlashCardRequest
             * @property {number|Long|null} [id] DeleteChineseFlashCardRequest id
             */

            /**
             * Constructs a new DeleteChineseFlashCardRequest.
             * @memberof worldmap.flashcard
             * @classdesc Represents a DeleteChineseFlashCardRequest.
             * @implements IDeleteChineseFlashCardRequest
             * @constructor
             * @param {worldmap.flashcard.IDeleteChineseFlashCardRequest=} [properties] Properties to set
             */
            function DeleteChineseFlashCardRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DeleteChineseFlashCardRequest id.
             * @member {number|Long} id
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @instance
             */
            DeleteChineseFlashCardRequest.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new DeleteChineseFlashCardRequest instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IDeleteChineseFlashCardRequest=} [properties] Properties to set
             * @returns {worldmap.flashcard.DeleteChineseFlashCardRequest} DeleteChineseFlashCardRequest instance
             */
            DeleteChineseFlashCardRequest.create = function create(properties) {
                return new DeleteChineseFlashCardRequest(properties);
            };

            /**
             * Encodes the specified DeleteChineseFlashCardRequest message. Does not implicitly {@link worldmap.flashcard.DeleteChineseFlashCardRequest.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IDeleteChineseFlashCardRequest} message DeleteChineseFlashCardRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeleteChineseFlashCardRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
                return writer;
            };

            /**
             * Encodes the specified DeleteChineseFlashCardRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.DeleteChineseFlashCardRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.IDeleteChineseFlashCardRequest} message DeleteChineseFlashCardRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeleteChineseFlashCardRequest.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DeleteChineseFlashCardRequest message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.DeleteChineseFlashCardRequest} DeleteChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeleteChineseFlashCardRequest.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.DeleteChineseFlashCardRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.id = reader.int64();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DeleteChineseFlashCardRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.DeleteChineseFlashCardRequest} DeleteChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeleteChineseFlashCardRequest.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DeleteChineseFlashCardRequest message.
             * @function verify
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DeleteChineseFlashCardRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                        return "id: integer|Long expected";
                return null;
            };

            /**
             * Creates a DeleteChineseFlashCardRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.DeleteChineseFlashCardRequest} DeleteChineseFlashCardRequest
             */
            DeleteChineseFlashCardRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.DeleteChineseFlashCardRequest)
                    return object;
                let message = new $root.worldmap.flashcard.DeleteChineseFlashCardRequest();
                if (object.id != null)
                    if ($util.Long)
                        (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                    else if (typeof object.id === "string")
                        message.id = parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from a DeleteChineseFlashCardRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {worldmap.flashcard.DeleteChineseFlashCardRequest} message DeleteChineseFlashCardRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DeleteChineseFlashCardRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.id = options.longs === String ? "0" : 0;
                if (message.id != null && message.hasOwnProperty("id"))
                    if (typeof message.id === "number")
                        object.id = options.longs === String ? String(message.id) : message.id;
                    else
                        object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
                return object;
            };

            /**
             * Converts this DeleteChineseFlashCardRequest to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DeleteChineseFlashCardRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DeleteChineseFlashCardRequest
             * @function getTypeUrl
             * @memberof worldmap.flashcard.DeleteChineseFlashCardRequest
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DeleteChineseFlashCardRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.DeleteChineseFlashCardRequest";
            };

            return DeleteChineseFlashCardRequest;
        })();

        flashcard.DeleteChineseFlashCardResponse = (function() {

            /**
             * Properties of a DeleteChineseFlashCardResponse.
             * @memberof worldmap.flashcard
             * @interface IDeleteChineseFlashCardResponse
             * @property {boolean|null} [success] DeleteChineseFlashCardResponse success
             * @property {string|null} [message] DeleteChineseFlashCardResponse message
             * @property {string|null} [error] DeleteChineseFlashCardResponse error
             */

            /**
             * Constructs a new DeleteChineseFlashCardResponse.
             * @memberof worldmap.flashcard
             * @classdesc Represents a DeleteChineseFlashCardResponse.
             * @implements IDeleteChineseFlashCardResponse
             * @constructor
             * @param {worldmap.flashcard.IDeleteChineseFlashCardResponse=} [properties] Properties to set
             */
            function DeleteChineseFlashCardResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DeleteChineseFlashCardResponse success.
             * @member {boolean} success
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @instance
             */
            DeleteChineseFlashCardResponse.prototype.success = false;

            /**
             * DeleteChineseFlashCardResponse message.
             * @member {string} message
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @instance
             */
            DeleteChineseFlashCardResponse.prototype.message = "";

            /**
             * DeleteChineseFlashCardResponse error.
             * @member {string} error
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @instance
             */
            DeleteChineseFlashCardResponse.prototype.error = "";

            /**
             * Creates a new DeleteChineseFlashCardResponse instance using the specified properties.
             * @function create
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IDeleteChineseFlashCardResponse=} [properties] Properties to set
             * @returns {worldmap.flashcard.DeleteChineseFlashCardResponse} DeleteChineseFlashCardResponse instance
             */
            DeleteChineseFlashCardResponse.create = function create(properties) {
                return new DeleteChineseFlashCardResponse(properties);
            };

            /**
             * Encodes the specified DeleteChineseFlashCardResponse message. Does not implicitly {@link worldmap.flashcard.DeleteChineseFlashCardResponse.verify|verify} messages.
             * @function encode
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IDeleteChineseFlashCardResponse} message DeleteChineseFlashCardResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeleteChineseFlashCardResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.success);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.error);
                return writer;
            };

            /**
             * Encodes the specified DeleteChineseFlashCardResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.DeleteChineseFlashCardResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.IDeleteChineseFlashCardResponse} message DeleteChineseFlashCardResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeleteChineseFlashCardResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DeleteChineseFlashCardResponse message from the specified reader or buffer.
             * @function decode
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {worldmap.flashcard.DeleteChineseFlashCardResponse} DeleteChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeleteChineseFlashCardResponse.decode = function decode(reader, length, error) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.worldmap.flashcard.DeleteChineseFlashCardResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    if (tag === error)
                        break;
                    switch (tag >>> 3) {
                    case 1: {
                            message.success = reader.bool();
                            break;
                        }
                    case 2: {
                            message.message = reader.string();
                            break;
                        }
                    case 3: {
                            message.error = reader.string();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DeleteChineseFlashCardResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {worldmap.flashcard.DeleteChineseFlashCardResponse} DeleteChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeleteChineseFlashCardResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DeleteChineseFlashCardResponse message.
             * @function verify
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DeleteChineseFlashCardResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.success != null && message.hasOwnProperty("success"))
                    if (typeof message.success !== "boolean")
                        return "success: boolean expected";
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.error != null && message.hasOwnProperty("error"))
                    if (!$util.isString(message.error))
                        return "error: string expected";
                return null;
            };

            /**
             * Creates a DeleteChineseFlashCardResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {worldmap.flashcard.DeleteChineseFlashCardResponse} DeleteChineseFlashCardResponse
             */
            DeleteChineseFlashCardResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.worldmap.flashcard.DeleteChineseFlashCardResponse)
                    return object;
                let message = new $root.worldmap.flashcard.DeleteChineseFlashCardResponse();
                if (object.success != null)
                    message.success = Boolean(object.success);
                if (object.message != null)
                    message.message = String(object.message);
                if (object.error != null)
                    message.error = String(object.error);
                return message;
            };

            /**
             * Creates a plain object from a DeleteChineseFlashCardResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {worldmap.flashcard.DeleteChineseFlashCardResponse} message DeleteChineseFlashCardResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DeleteChineseFlashCardResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.success = false;
                    object.message = "";
                    object.error = "";
                }
                if (message.success != null && message.hasOwnProperty("success"))
                    object.success = message.success;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.error != null && message.hasOwnProperty("error"))
                    object.error = message.error;
                return object;
            };

            /**
             * Converts this DeleteChineseFlashCardResponse to JSON.
             * @function toJSON
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DeleteChineseFlashCardResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for DeleteChineseFlashCardResponse
             * @function getTypeUrl
             * @memberof worldmap.flashcard.DeleteChineseFlashCardResponse
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            DeleteChineseFlashCardResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/worldmap.flashcard.DeleteChineseFlashCardResponse";
            };

            return DeleteChineseFlashCardResponse;
        })();

        flashcard.ChineseFlashCardService = (function() {

            /**
             * Constructs a new ChineseFlashCardService service.
             * @memberof worldmap.flashcard
             * @classdesc Represents a ChineseFlashCardService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function ChineseFlashCardService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (ChineseFlashCardService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = ChineseFlashCardService;

            /**
             * Creates new ChineseFlashCardService service using the specified rpc implementation.
             * @function create
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {ChineseFlashCardService} RPC service. Useful where requests and/or responses are streamed.
             */
            ChineseFlashCardService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                return new this(rpcImpl, requestDelimited, responseDelimited);
            };

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#createChineseFlashCard}.
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @typedef CreateChineseFlashCardCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {worldmap.flashcard.CreateChineseFlashCardResponse} [response] CreateChineseFlashCardResponse
             */

            /**
             * Calls CreateChineseFlashCard.
             * @function createChineseFlashCard
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.ICreateChineseFlashCardRequest} request CreateChineseFlashCardRequest message or plain object
             * @param {worldmap.flashcard.ChineseFlashCardService.CreateChineseFlashCardCallback} callback Node-style callback called with the error, if any, and CreateChineseFlashCardResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ChineseFlashCardService.prototype.createChineseFlashCard = function createChineseFlashCard(request, callback) {
                return this.rpcCall(createChineseFlashCard, $root.worldmap.flashcard.CreateChineseFlashCardRequest, $root.worldmap.flashcard.CreateChineseFlashCardResponse, request, callback);
            }, "name", { value: "CreateChineseFlashCard" });

            /**
             * Calls CreateChineseFlashCard.
             * @function createChineseFlashCard
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.ICreateChineseFlashCardRequest} request CreateChineseFlashCardRequest message or plain object
             * @returns {Promise<worldmap.flashcard.CreateChineseFlashCardResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#getChineseFlashCards}.
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @typedef GetChineseFlashCardsCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {worldmap.flashcard.GetChineseFlashCardsResponse} [response] GetChineseFlashCardsResponse
             */

            /**
             * Calls GetChineseFlashCards.
             * @function getChineseFlashCards
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.IGetChineseFlashCardsRequest} request GetChineseFlashCardsRequest message or plain object
             * @param {worldmap.flashcard.ChineseFlashCardService.GetChineseFlashCardsCallback} callback Node-style callback called with the error, if any, and GetChineseFlashCardsResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ChineseFlashCardService.prototype.getChineseFlashCards = function getChineseFlashCards(request, callback) {
                return this.rpcCall(getChineseFlashCards, $root.worldmap.flashcard.GetChineseFlashCardsRequest, $root.worldmap.flashcard.GetChineseFlashCardsResponse, request, callback);
            }, "name", { value: "GetChineseFlashCards" });

            /**
             * Calls GetChineseFlashCards.
             * @function getChineseFlashCards
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.IGetChineseFlashCardsRequest} request GetChineseFlashCardsRequest message or plain object
             * @returns {Promise<worldmap.flashcard.GetChineseFlashCardsResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#getChineseFlashCard}.
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @typedef GetChineseFlashCardCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {worldmap.flashcard.GetChineseFlashCardResponse} [response] GetChineseFlashCardResponse
             */

            /**
             * Calls GetChineseFlashCard.
             * @function getChineseFlashCard
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.IGetChineseFlashCardRequest} request GetChineseFlashCardRequest message or plain object
             * @param {worldmap.flashcard.ChineseFlashCardService.GetChineseFlashCardCallback} callback Node-style callback called with the error, if any, and GetChineseFlashCardResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ChineseFlashCardService.prototype.getChineseFlashCard = function getChineseFlashCard(request, callback) {
                return this.rpcCall(getChineseFlashCard, $root.worldmap.flashcard.GetChineseFlashCardRequest, $root.worldmap.flashcard.GetChineseFlashCardResponse, request, callback);
            }, "name", { value: "GetChineseFlashCard" });

            /**
             * Calls GetChineseFlashCard.
             * @function getChineseFlashCard
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.IGetChineseFlashCardRequest} request GetChineseFlashCardRequest message or plain object
             * @returns {Promise<worldmap.flashcard.GetChineseFlashCardResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#updateChineseFlashCard}.
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @typedef UpdateChineseFlashCardCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {worldmap.flashcard.UpdateChineseFlashCardResponse} [response] UpdateChineseFlashCardResponse
             */

            /**
             * Calls UpdateChineseFlashCard.
             * @function updateChineseFlashCard
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.IUpdateChineseFlashCardRequest} request UpdateChineseFlashCardRequest message or plain object
             * @param {worldmap.flashcard.ChineseFlashCardService.UpdateChineseFlashCardCallback} callback Node-style callback called with the error, if any, and UpdateChineseFlashCardResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ChineseFlashCardService.prototype.updateChineseFlashCard = function updateChineseFlashCard(request, callback) {
                return this.rpcCall(updateChineseFlashCard, $root.worldmap.flashcard.UpdateChineseFlashCardRequest, $root.worldmap.flashcard.UpdateChineseFlashCardResponse, request, callback);
            }, "name", { value: "UpdateChineseFlashCard" });

            /**
             * Calls UpdateChineseFlashCard.
             * @function updateChineseFlashCard
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.IUpdateChineseFlashCardRequest} request UpdateChineseFlashCardRequest message or plain object
             * @returns {Promise<worldmap.flashcard.UpdateChineseFlashCardResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#deleteChineseFlashCard}.
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @typedef DeleteChineseFlashCardCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {worldmap.flashcard.DeleteChineseFlashCardResponse} [response] DeleteChineseFlashCardResponse
             */

            /**
             * Calls DeleteChineseFlashCard.
             * @function deleteChineseFlashCard
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.IDeleteChineseFlashCardRequest} request DeleteChineseFlashCardRequest message or plain object
             * @param {worldmap.flashcard.ChineseFlashCardService.DeleteChineseFlashCardCallback} callback Node-style callback called with the error, if any, and DeleteChineseFlashCardResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(ChineseFlashCardService.prototype.deleteChineseFlashCard = function deleteChineseFlashCard(request, callback) {
                return this.rpcCall(deleteChineseFlashCard, $root.worldmap.flashcard.DeleteChineseFlashCardRequest, $root.worldmap.flashcard.DeleteChineseFlashCardResponse, request, callback);
            }, "name", { value: "DeleteChineseFlashCard" });

            /**
             * Calls DeleteChineseFlashCard.
             * @function deleteChineseFlashCard
             * @memberof worldmap.flashcard.ChineseFlashCardService
             * @instance
             * @param {worldmap.flashcard.IDeleteChineseFlashCardRequest} request DeleteChineseFlashCardRequest message or plain object
             * @returns {Promise<worldmap.flashcard.DeleteChineseFlashCardResponse>} Promise
             * @variation 2
             */

            return ChineseFlashCardService;
        })();

        return flashcard;
    })();

    return worldmap;
})();

export { $root as default };
