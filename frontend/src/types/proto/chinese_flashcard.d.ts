import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace worldmap. */
export namespace worldmap {

    /** Namespace flashcard. */
    namespace flashcard {

        /** Properties of a ChineseFlashCard. */
        interface IChineseFlashCard {

            /** ChineseFlashCard id */
            id?: (number|Long|null);

            /** ChineseFlashCard chineseWord */
            chineseWord?: (string|null);

            /** ChineseFlashCard englishWord */
            englishWord?: (string|null);

            /** ChineseFlashCard pinyin */
            pinyin?: (string|null);

            /** ChineseFlashCard img */
            img?: (string|null);

            /** ChineseFlashCard createdAt */
            createdAt?: (number|Long|null);

            /** ChineseFlashCard updatedAt */
            updatedAt?: (number|Long|null);

            /** ChineseFlashCard exampleUsage */
            exampleUsage?: (string|null);

            /** ChineseFlashCard favorite */
            favorite?: (boolean|null);
        }

        /** Represents a ChineseFlashCard. */
        class ChineseFlashCard implements IChineseFlashCard {

            /**
             * Constructs a new ChineseFlashCard.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IChineseFlashCard);

            /** ChineseFlashCard id. */
            public id: (number|Long);

            /** ChineseFlashCard chineseWord. */
            public chineseWord: string;

            /** ChineseFlashCard englishWord. */
            public englishWord: string;

            /** ChineseFlashCard pinyin. */
            public pinyin: string;

            /** ChineseFlashCard img. */
            public img: string;

            /** ChineseFlashCard createdAt. */
            public createdAt: (number|Long);

            /** ChineseFlashCard updatedAt. */
            public updatedAt: (number|Long);

            /** ChineseFlashCard exampleUsage. */
            public exampleUsage: string;

            /** ChineseFlashCard favorite. */
            public favorite: boolean;

            /**
             * Creates a new ChineseFlashCard instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ChineseFlashCard instance
             */
            public static create(properties?: worldmap.flashcard.IChineseFlashCard): worldmap.flashcard.ChineseFlashCard;

            /**
             * Encodes the specified ChineseFlashCard message. Does not implicitly {@link worldmap.flashcard.ChineseFlashCard.verify|verify} messages.
             * @param message ChineseFlashCard message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IChineseFlashCard, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ChineseFlashCard message, length delimited. Does not implicitly {@link worldmap.flashcard.ChineseFlashCard.verify|verify} messages.
             * @param message ChineseFlashCard message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IChineseFlashCard, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ChineseFlashCard message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ChineseFlashCard
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.ChineseFlashCard;

            /**
             * Decodes a ChineseFlashCard message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ChineseFlashCard
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.ChineseFlashCard;

            /**
             * Verifies a ChineseFlashCard message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ChineseFlashCard message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ChineseFlashCard
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.ChineseFlashCard;

            /**
             * Creates a plain object from a ChineseFlashCard message. Also converts values to other types if specified.
             * @param message ChineseFlashCard
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.ChineseFlashCard, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ChineseFlashCard to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ChineseFlashCard
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
