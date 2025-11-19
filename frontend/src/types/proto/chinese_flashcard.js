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
             * @property {boolean|null} [favorite] ChineseFlashCard favorite
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
             * ChineseFlashCard favorite.
             * @member {boolean} favorite
             * @memberof worldmap.flashcard.ChineseFlashCard
             * @instance
             */
            ChineseFlashCard.prototype.favorite = false;

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
                if (message.favorite != null && Object.hasOwnProperty.call(message, "favorite"))
                    writer.uint32(/* id 9, wireType 0 =*/72).bool(message.favorite);
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
                    case 9: {
                            message.favorite = reader.bool();
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
                if (message.favorite != null && message.hasOwnProperty("favorite"))
                    if (typeof message.favorite !== "boolean")
                        return "favorite: boolean expected";
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
                if (object.favorite != null)
                    message.favorite = Boolean(object.favorite);
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
                    object.favorite = false;
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
                if (message.favorite != null && message.hasOwnProperty("favorite"))
                    object.favorite = message.favorite;
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

        return flashcard;
    })();

    return worldmap;
})();

export { $root as default };
