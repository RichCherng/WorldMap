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

        /** Properties of a CreateChineseFlashCardRequest. */
        interface ICreateChineseFlashCardRequest {

            /** CreateChineseFlashCardRequest chineseWord */
            chineseWord?: (string|null);

            /** CreateChineseFlashCardRequest englishWord */
            englishWord?: (string|null);

            /** CreateChineseFlashCardRequest pinyin */
            pinyin?: (string|null);

            /** CreateChineseFlashCardRequest img */
            img?: (string|null);
        }

        /** Represents a CreateChineseFlashCardRequest. */
        class CreateChineseFlashCardRequest implements ICreateChineseFlashCardRequest {

            /**
             * Constructs a new CreateChineseFlashCardRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.ICreateChineseFlashCardRequest);

            /** CreateChineseFlashCardRequest chineseWord. */
            public chineseWord: string;

            /** CreateChineseFlashCardRequest englishWord. */
            public englishWord: string;

            /** CreateChineseFlashCardRequest pinyin. */
            public pinyin: string;

            /** CreateChineseFlashCardRequest img. */
            public img: string;

            /**
             * Creates a new CreateChineseFlashCardRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CreateChineseFlashCardRequest instance
             */
            public static create(properties?: worldmap.flashcard.ICreateChineseFlashCardRequest): worldmap.flashcard.CreateChineseFlashCardRequest;

            /**
             * Encodes the specified CreateChineseFlashCardRequest message. Does not implicitly {@link worldmap.flashcard.CreateChineseFlashCardRequest.verify|verify} messages.
             * @param message CreateChineseFlashCardRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.ICreateChineseFlashCardRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CreateChineseFlashCardRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.CreateChineseFlashCardRequest.verify|verify} messages.
             * @param message CreateChineseFlashCardRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.ICreateChineseFlashCardRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateChineseFlashCardRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.CreateChineseFlashCardRequest;

            /**
             * Decodes a CreateChineseFlashCardRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CreateChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.CreateChineseFlashCardRequest;

            /**
             * Verifies a CreateChineseFlashCardRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CreateChineseFlashCardRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateChineseFlashCardRequest
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.CreateChineseFlashCardRequest;

            /**
             * Creates a plain object from a CreateChineseFlashCardRequest message. Also converts values to other types if specified.
             * @param message CreateChineseFlashCardRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.CreateChineseFlashCardRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateChineseFlashCardRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CreateChineseFlashCardRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a CreateChineseFlashCardResponse. */
        interface ICreateChineseFlashCardResponse {

            /** CreateChineseFlashCardResponse success */
            success?: (boolean|null);

            /** CreateChineseFlashCardResponse data */
            data?: (worldmap.flashcard.IChineseFlashCard|null);

            /** CreateChineseFlashCardResponse message */
            message?: (string|null);

            /** CreateChineseFlashCardResponse error */
            error?: (string|null);
        }

        /** Represents a CreateChineseFlashCardResponse. */
        class CreateChineseFlashCardResponse implements ICreateChineseFlashCardResponse {

            /**
             * Constructs a new CreateChineseFlashCardResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.ICreateChineseFlashCardResponse);

            /** CreateChineseFlashCardResponse success. */
            public success: boolean;

            /** CreateChineseFlashCardResponse data. */
            public data?: (worldmap.flashcard.IChineseFlashCard|null);

            /** CreateChineseFlashCardResponse message. */
            public message: string;

            /** CreateChineseFlashCardResponse error. */
            public error: string;

            /**
             * Creates a new CreateChineseFlashCardResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns CreateChineseFlashCardResponse instance
             */
            public static create(properties?: worldmap.flashcard.ICreateChineseFlashCardResponse): worldmap.flashcard.CreateChineseFlashCardResponse;

            /**
             * Encodes the specified CreateChineseFlashCardResponse message. Does not implicitly {@link worldmap.flashcard.CreateChineseFlashCardResponse.verify|verify} messages.
             * @param message CreateChineseFlashCardResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.ICreateChineseFlashCardResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified CreateChineseFlashCardResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.CreateChineseFlashCardResponse.verify|verify} messages.
             * @param message CreateChineseFlashCardResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.ICreateChineseFlashCardResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateChineseFlashCardResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.CreateChineseFlashCardResponse;

            /**
             * Decodes a CreateChineseFlashCardResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns CreateChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.CreateChineseFlashCardResponse;

            /**
             * Verifies a CreateChineseFlashCardResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CreateChineseFlashCardResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateChineseFlashCardResponse
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.CreateChineseFlashCardResponse;

            /**
             * Creates a plain object from a CreateChineseFlashCardResponse message. Also converts values to other types if specified.
             * @param message CreateChineseFlashCardResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.CreateChineseFlashCardResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateChineseFlashCardResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for CreateChineseFlashCardResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a GetChineseFlashCardsRequest. */
        interface IGetChineseFlashCardsRequest {

            /** GetChineseFlashCardsRequest page */
            page?: (number|null);

            /** GetChineseFlashCardsRequest pageSize */
            pageSize?: (number|null);
        }

        /** Represents a GetChineseFlashCardsRequest. */
        class GetChineseFlashCardsRequest implements IGetChineseFlashCardsRequest {

            /**
             * Constructs a new GetChineseFlashCardsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IGetChineseFlashCardsRequest);

            /** GetChineseFlashCardsRequest page. */
            public page: number;

            /** GetChineseFlashCardsRequest pageSize. */
            public pageSize: number;

            /**
             * Creates a new GetChineseFlashCardsRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetChineseFlashCardsRequest instance
             */
            public static create(properties?: worldmap.flashcard.IGetChineseFlashCardsRequest): worldmap.flashcard.GetChineseFlashCardsRequest;

            /**
             * Encodes the specified GetChineseFlashCardsRequest message. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardsRequest.verify|verify} messages.
             * @param message GetChineseFlashCardsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IGetChineseFlashCardsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetChineseFlashCardsRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardsRequest.verify|verify} messages.
             * @param message GetChineseFlashCardsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IGetChineseFlashCardsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetChineseFlashCardsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetChineseFlashCardsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.GetChineseFlashCardsRequest;

            /**
             * Decodes a GetChineseFlashCardsRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetChineseFlashCardsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.GetChineseFlashCardsRequest;

            /**
             * Verifies a GetChineseFlashCardsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetChineseFlashCardsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetChineseFlashCardsRequest
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.GetChineseFlashCardsRequest;

            /**
             * Creates a plain object from a GetChineseFlashCardsRequest message. Also converts values to other types if specified.
             * @param message GetChineseFlashCardsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.GetChineseFlashCardsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetChineseFlashCardsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for GetChineseFlashCardsRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a GetChineseFlashCardsResponse. */
        interface IGetChineseFlashCardsResponse {

            /** GetChineseFlashCardsResponse success */
            success?: (boolean|null);

            /** GetChineseFlashCardsResponse data */
            data?: (worldmap.flashcard.IChineseFlashCard[]|null);

            /** GetChineseFlashCardsResponse message */
            message?: (string|null);

            /** GetChineseFlashCardsResponse error */
            error?: (string|null);

            /** GetChineseFlashCardsResponse totalCount */
            totalCount?: (number|null);
        }

        /** Represents a GetChineseFlashCardsResponse. */
        class GetChineseFlashCardsResponse implements IGetChineseFlashCardsResponse {

            /**
             * Constructs a new GetChineseFlashCardsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IGetChineseFlashCardsResponse);

            /** GetChineseFlashCardsResponse success. */
            public success: boolean;

            /** GetChineseFlashCardsResponse data. */
            public data: worldmap.flashcard.IChineseFlashCard[];

            /** GetChineseFlashCardsResponse message. */
            public message: string;

            /** GetChineseFlashCardsResponse error. */
            public error: string;

            /** GetChineseFlashCardsResponse totalCount. */
            public totalCount: number;

            /**
             * Creates a new GetChineseFlashCardsResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetChineseFlashCardsResponse instance
             */
            public static create(properties?: worldmap.flashcard.IGetChineseFlashCardsResponse): worldmap.flashcard.GetChineseFlashCardsResponse;

            /**
             * Encodes the specified GetChineseFlashCardsResponse message. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardsResponse.verify|verify} messages.
             * @param message GetChineseFlashCardsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IGetChineseFlashCardsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetChineseFlashCardsResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardsResponse.verify|verify} messages.
             * @param message GetChineseFlashCardsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IGetChineseFlashCardsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetChineseFlashCardsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetChineseFlashCardsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.GetChineseFlashCardsResponse;

            /**
             * Decodes a GetChineseFlashCardsResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetChineseFlashCardsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.GetChineseFlashCardsResponse;

            /**
             * Verifies a GetChineseFlashCardsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetChineseFlashCardsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetChineseFlashCardsResponse
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.GetChineseFlashCardsResponse;

            /**
             * Creates a plain object from a GetChineseFlashCardsResponse message. Also converts values to other types if specified.
             * @param message GetChineseFlashCardsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.GetChineseFlashCardsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetChineseFlashCardsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for GetChineseFlashCardsResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a GetChineseFlashCardRequest. */
        interface IGetChineseFlashCardRequest {

            /** GetChineseFlashCardRequest id */
            id?: (number|Long|null);
        }

        /** Represents a GetChineseFlashCardRequest. */
        class GetChineseFlashCardRequest implements IGetChineseFlashCardRequest {

            /**
             * Constructs a new GetChineseFlashCardRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IGetChineseFlashCardRequest);

            /** GetChineseFlashCardRequest id. */
            public id: (number|Long);

            /**
             * Creates a new GetChineseFlashCardRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetChineseFlashCardRequest instance
             */
            public static create(properties?: worldmap.flashcard.IGetChineseFlashCardRequest): worldmap.flashcard.GetChineseFlashCardRequest;

            /**
             * Encodes the specified GetChineseFlashCardRequest message. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardRequest.verify|verify} messages.
             * @param message GetChineseFlashCardRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IGetChineseFlashCardRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetChineseFlashCardRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardRequest.verify|verify} messages.
             * @param message GetChineseFlashCardRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IGetChineseFlashCardRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetChineseFlashCardRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.GetChineseFlashCardRequest;

            /**
             * Decodes a GetChineseFlashCardRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.GetChineseFlashCardRequest;

            /**
             * Verifies a GetChineseFlashCardRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetChineseFlashCardRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetChineseFlashCardRequest
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.GetChineseFlashCardRequest;

            /**
             * Creates a plain object from a GetChineseFlashCardRequest message. Also converts values to other types if specified.
             * @param message GetChineseFlashCardRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.GetChineseFlashCardRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetChineseFlashCardRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for GetChineseFlashCardRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a GetChineseFlashCardResponse. */
        interface IGetChineseFlashCardResponse {

            /** GetChineseFlashCardResponse success */
            success?: (boolean|null);

            /** GetChineseFlashCardResponse data */
            data?: (worldmap.flashcard.IChineseFlashCard|null);

            /** GetChineseFlashCardResponse message */
            message?: (string|null);

            /** GetChineseFlashCardResponse error */
            error?: (string|null);
        }

        /** Represents a GetChineseFlashCardResponse. */
        class GetChineseFlashCardResponse implements IGetChineseFlashCardResponse {

            /**
             * Constructs a new GetChineseFlashCardResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IGetChineseFlashCardResponse);

            /** GetChineseFlashCardResponse success. */
            public success: boolean;

            /** GetChineseFlashCardResponse data. */
            public data?: (worldmap.flashcard.IChineseFlashCard|null);

            /** GetChineseFlashCardResponse message. */
            public message: string;

            /** GetChineseFlashCardResponse error. */
            public error: string;

            /**
             * Creates a new GetChineseFlashCardResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GetChineseFlashCardResponse instance
             */
            public static create(properties?: worldmap.flashcard.IGetChineseFlashCardResponse): worldmap.flashcard.GetChineseFlashCardResponse;

            /**
             * Encodes the specified GetChineseFlashCardResponse message. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardResponse.verify|verify} messages.
             * @param message GetChineseFlashCardResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IGetChineseFlashCardResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified GetChineseFlashCardResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.GetChineseFlashCardResponse.verify|verify} messages.
             * @param message GetChineseFlashCardResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IGetChineseFlashCardResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetChineseFlashCardResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.GetChineseFlashCardResponse;

            /**
             * Decodes a GetChineseFlashCardResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns GetChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.GetChineseFlashCardResponse;

            /**
             * Verifies a GetChineseFlashCardResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetChineseFlashCardResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetChineseFlashCardResponse
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.GetChineseFlashCardResponse;

            /**
             * Creates a plain object from a GetChineseFlashCardResponse message. Also converts values to other types if specified.
             * @param message GetChineseFlashCardResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.GetChineseFlashCardResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetChineseFlashCardResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for GetChineseFlashCardResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an UpdateChineseFlashCardRequest. */
        interface IUpdateChineseFlashCardRequest {

            /** UpdateChineseFlashCardRequest id */
            id?: (number|Long|null);

            /** UpdateChineseFlashCardRequest chineseWord */
            chineseWord?: (string|null);

            /** UpdateChineseFlashCardRequest englishWord */
            englishWord?: (string|null);

            /** UpdateChineseFlashCardRequest pinyin */
            pinyin?: (string|null);

            /** UpdateChineseFlashCardRequest img */
            img?: (string|null);
        }

        /** Represents an UpdateChineseFlashCardRequest. */
        class UpdateChineseFlashCardRequest implements IUpdateChineseFlashCardRequest {

            /**
             * Constructs a new UpdateChineseFlashCardRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IUpdateChineseFlashCardRequest);

            /** UpdateChineseFlashCardRequest id. */
            public id: (number|Long);

            /** UpdateChineseFlashCardRequest chineseWord. */
            public chineseWord: string;

            /** UpdateChineseFlashCardRequest englishWord. */
            public englishWord: string;

            /** UpdateChineseFlashCardRequest pinyin. */
            public pinyin: string;

            /** UpdateChineseFlashCardRequest img. */
            public img: string;

            /**
             * Creates a new UpdateChineseFlashCardRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UpdateChineseFlashCardRequest instance
             */
            public static create(properties?: worldmap.flashcard.IUpdateChineseFlashCardRequest): worldmap.flashcard.UpdateChineseFlashCardRequest;

            /**
             * Encodes the specified UpdateChineseFlashCardRequest message. Does not implicitly {@link worldmap.flashcard.UpdateChineseFlashCardRequest.verify|verify} messages.
             * @param message UpdateChineseFlashCardRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IUpdateChineseFlashCardRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UpdateChineseFlashCardRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.UpdateChineseFlashCardRequest.verify|verify} messages.
             * @param message UpdateChineseFlashCardRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IUpdateChineseFlashCardRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UpdateChineseFlashCardRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UpdateChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.UpdateChineseFlashCardRequest;

            /**
             * Decodes an UpdateChineseFlashCardRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UpdateChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.UpdateChineseFlashCardRequest;

            /**
             * Verifies an UpdateChineseFlashCardRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UpdateChineseFlashCardRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateChineseFlashCardRequest
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.UpdateChineseFlashCardRequest;

            /**
             * Creates a plain object from an UpdateChineseFlashCardRequest message. Also converts values to other types if specified.
             * @param message UpdateChineseFlashCardRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.UpdateChineseFlashCardRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateChineseFlashCardRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UpdateChineseFlashCardRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an UpdateChineseFlashCardResponse. */
        interface IUpdateChineseFlashCardResponse {

            /** UpdateChineseFlashCardResponse success */
            success?: (boolean|null);

            /** UpdateChineseFlashCardResponse data */
            data?: (worldmap.flashcard.IChineseFlashCard|null);

            /** UpdateChineseFlashCardResponse message */
            message?: (string|null);

            /** UpdateChineseFlashCardResponse error */
            error?: (string|null);
        }

        /** Represents an UpdateChineseFlashCardResponse. */
        class UpdateChineseFlashCardResponse implements IUpdateChineseFlashCardResponse {

            /**
             * Constructs a new UpdateChineseFlashCardResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IUpdateChineseFlashCardResponse);

            /** UpdateChineseFlashCardResponse success. */
            public success: boolean;

            /** UpdateChineseFlashCardResponse data. */
            public data?: (worldmap.flashcard.IChineseFlashCard|null);

            /** UpdateChineseFlashCardResponse message. */
            public message: string;

            /** UpdateChineseFlashCardResponse error. */
            public error: string;

            /**
             * Creates a new UpdateChineseFlashCardResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns UpdateChineseFlashCardResponse instance
             */
            public static create(properties?: worldmap.flashcard.IUpdateChineseFlashCardResponse): worldmap.flashcard.UpdateChineseFlashCardResponse;

            /**
             * Encodes the specified UpdateChineseFlashCardResponse message. Does not implicitly {@link worldmap.flashcard.UpdateChineseFlashCardResponse.verify|verify} messages.
             * @param message UpdateChineseFlashCardResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IUpdateChineseFlashCardResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified UpdateChineseFlashCardResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.UpdateChineseFlashCardResponse.verify|verify} messages.
             * @param message UpdateChineseFlashCardResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IUpdateChineseFlashCardResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UpdateChineseFlashCardResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UpdateChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.UpdateChineseFlashCardResponse;

            /**
             * Decodes an UpdateChineseFlashCardResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns UpdateChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.UpdateChineseFlashCardResponse;

            /**
             * Verifies an UpdateChineseFlashCardResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UpdateChineseFlashCardResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateChineseFlashCardResponse
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.UpdateChineseFlashCardResponse;

            /**
             * Creates a plain object from an UpdateChineseFlashCardResponse message. Also converts values to other types if specified.
             * @param message UpdateChineseFlashCardResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.UpdateChineseFlashCardResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateChineseFlashCardResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for UpdateChineseFlashCardResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DeleteChineseFlashCardRequest. */
        interface IDeleteChineseFlashCardRequest {

            /** DeleteChineseFlashCardRequest id */
            id?: (number|Long|null);
        }

        /** Represents a DeleteChineseFlashCardRequest. */
        class DeleteChineseFlashCardRequest implements IDeleteChineseFlashCardRequest {

            /**
             * Constructs a new DeleteChineseFlashCardRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IDeleteChineseFlashCardRequest);

            /** DeleteChineseFlashCardRequest id. */
            public id: (number|Long);

            /**
             * Creates a new DeleteChineseFlashCardRequest instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeleteChineseFlashCardRequest instance
             */
            public static create(properties?: worldmap.flashcard.IDeleteChineseFlashCardRequest): worldmap.flashcard.DeleteChineseFlashCardRequest;

            /**
             * Encodes the specified DeleteChineseFlashCardRequest message. Does not implicitly {@link worldmap.flashcard.DeleteChineseFlashCardRequest.verify|verify} messages.
             * @param message DeleteChineseFlashCardRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IDeleteChineseFlashCardRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeleteChineseFlashCardRequest message, length delimited. Does not implicitly {@link worldmap.flashcard.DeleteChineseFlashCardRequest.verify|verify} messages.
             * @param message DeleteChineseFlashCardRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IDeleteChineseFlashCardRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeleteChineseFlashCardRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeleteChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.DeleteChineseFlashCardRequest;

            /**
             * Decodes a DeleteChineseFlashCardRequest message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeleteChineseFlashCardRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.DeleteChineseFlashCardRequest;

            /**
             * Verifies a DeleteChineseFlashCardRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeleteChineseFlashCardRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeleteChineseFlashCardRequest
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.DeleteChineseFlashCardRequest;

            /**
             * Creates a plain object from a DeleteChineseFlashCardRequest message. Also converts values to other types if specified.
             * @param message DeleteChineseFlashCardRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.DeleteChineseFlashCardRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeleteChineseFlashCardRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DeleteChineseFlashCardRequest
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a DeleteChineseFlashCardResponse. */
        interface IDeleteChineseFlashCardResponse {

            /** DeleteChineseFlashCardResponse success */
            success?: (boolean|null);

            /** DeleteChineseFlashCardResponse message */
            message?: (string|null);

            /** DeleteChineseFlashCardResponse error */
            error?: (string|null);
        }

        /** Represents a DeleteChineseFlashCardResponse. */
        class DeleteChineseFlashCardResponse implements IDeleteChineseFlashCardResponse {

            /**
             * Constructs a new DeleteChineseFlashCardResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: worldmap.flashcard.IDeleteChineseFlashCardResponse);

            /** DeleteChineseFlashCardResponse success. */
            public success: boolean;

            /** DeleteChineseFlashCardResponse message. */
            public message: string;

            /** DeleteChineseFlashCardResponse error. */
            public error: string;

            /**
             * Creates a new DeleteChineseFlashCardResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeleteChineseFlashCardResponse instance
             */
            public static create(properties?: worldmap.flashcard.IDeleteChineseFlashCardResponse): worldmap.flashcard.DeleteChineseFlashCardResponse;

            /**
             * Encodes the specified DeleteChineseFlashCardResponse message. Does not implicitly {@link worldmap.flashcard.DeleteChineseFlashCardResponse.verify|verify} messages.
             * @param message DeleteChineseFlashCardResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: worldmap.flashcard.IDeleteChineseFlashCardResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeleteChineseFlashCardResponse message, length delimited. Does not implicitly {@link worldmap.flashcard.DeleteChineseFlashCardResponse.verify|verify} messages.
             * @param message DeleteChineseFlashCardResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: worldmap.flashcard.IDeleteChineseFlashCardResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeleteChineseFlashCardResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeleteChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): worldmap.flashcard.DeleteChineseFlashCardResponse;

            /**
             * Decodes a DeleteChineseFlashCardResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeleteChineseFlashCardResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): worldmap.flashcard.DeleteChineseFlashCardResponse;

            /**
             * Verifies a DeleteChineseFlashCardResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeleteChineseFlashCardResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeleteChineseFlashCardResponse
             */
            public static fromObject(object: { [k: string]: any }): worldmap.flashcard.DeleteChineseFlashCardResponse;

            /**
             * Creates a plain object from a DeleteChineseFlashCardResponse message. Also converts values to other types if specified.
             * @param message DeleteChineseFlashCardResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: worldmap.flashcard.DeleteChineseFlashCardResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeleteChineseFlashCardResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for DeleteChineseFlashCardResponse
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Represents a ChineseFlashCardService */
        class ChineseFlashCardService extends $protobuf.rpc.Service {

            /**
             * Constructs a new ChineseFlashCardService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Creates new ChineseFlashCardService service using the specified rpc implementation.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             * @returns RPC service. Useful where requests and/or responses are streamed.
             */
            public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): ChineseFlashCardService;

            /**
             * Calls CreateChineseFlashCard.
             * @param request CreateChineseFlashCardRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateChineseFlashCardResponse
             */
            public createChineseFlashCard(request: worldmap.flashcard.ICreateChineseFlashCardRequest, callback: worldmap.flashcard.ChineseFlashCardService.CreateChineseFlashCardCallback): void;

            /**
             * Calls CreateChineseFlashCard.
             * @param request CreateChineseFlashCardRequest message or plain object
             * @returns Promise
             */
            public createChineseFlashCard(request: worldmap.flashcard.ICreateChineseFlashCardRequest): Promise<worldmap.flashcard.CreateChineseFlashCardResponse>;

            /**
             * Calls GetChineseFlashCards.
             * @param request GetChineseFlashCardsRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GetChineseFlashCardsResponse
             */
            public getChineseFlashCards(request: worldmap.flashcard.IGetChineseFlashCardsRequest, callback: worldmap.flashcard.ChineseFlashCardService.GetChineseFlashCardsCallback): void;

            /**
             * Calls GetChineseFlashCards.
             * @param request GetChineseFlashCardsRequest message or plain object
             * @returns Promise
             */
            public getChineseFlashCards(request: worldmap.flashcard.IGetChineseFlashCardsRequest): Promise<worldmap.flashcard.GetChineseFlashCardsResponse>;

            /**
             * Calls GetChineseFlashCard.
             * @param request GetChineseFlashCardRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GetChineseFlashCardResponse
             */
            public getChineseFlashCard(request: worldmap.flashcard.IGetChineseFlashCardRequest, callback: worldmap.flashcard.ChineseFlashCardService.GetChineseFlashCardCallback): void;

            /**
             * Calls GetChineseFlashCard.
             * @param request GetChineseFlashCardRequest message or plain object
             * @returns Promise
             */
            public getChineseFlashCard(request: worldmap.flashcard.IGetChineseFlashCardRequest): Promise<worldmap.flashcard.GetChineseFlashCardResponse>;

            /**
             * Calls UpdateChineseFlashCard.
             * @param request UpdateChineseFlashCardRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and UpdateChineseFlashCardResponse
             */
            public updateChineseFlashCard(request: worldmap.flashcard.IUpdateChineseFlashCardRequest, callback: worldmap.flashcard.ChineseFlashCardService.UpdateChineseFlashCardCallback): void;

            /**
             * Calls UpdateChineseFlashCard.
             * @param request UpdateChineseFlashCardRequest message or plain object
             * @returns Promise
             */
            public updateChineseFlashCard(request: worldmap.flashcard.IUpdateChineseFlashCardRequest): Promise<worldmap.flashcard.UpdateChineseFlashCardResponse>;

            /**
             * Calls DeleteChineseFlashCard.
             * @param request DeleteChineseFlashCardRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and DeleteChineseFlashCardResponse
             */
            public deleteChineseFlashCard(request: worldmap.flashcard.IDeleteChineseFlashCardRequest, callback: worldmap.flashcard.ChineseFlashCardService.DeleteChineseFlashCardCallback): void;

            /**
             * Calls DeleteChineseFlashCard.
             * @param request DeleteChineseFlashCardRequest message or plain object
             * @returns Promise
             */
            public deleteChineseFlashCard(request: worldmap.flashcard.IDeleteChineseFlashCardRequest): Promise<worldmap.flashcard.DeleteChineseFlashCardResponse>;
        }

        namespace ChineseFlashCardService {

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#createChineseFlashCard}.
             * @param error Error, if any
             * @param [response] CreateChineseFlashCardResponse
             */
            type CreateChineseFlashCardCallback = (error: (Error|null), response?: worldmap.flashcard.CreateChineseFlashCardResponse) => void;

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#getChineseFlashCards}.
             * @param error Error, if any
             * @param [response] GetChineseFlashCardsResponse
             */
            type GetChineseFlashCardsCallback = (error: (Error|null), response?: worldmap.flashcard.GetChineseFlashCardsResponse) => void;

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#getChineseFlashCard}.
             * @param error Error, if any
             * @param [response] GetChineseFlashCardResponse
             */
            type GetChineseFlashCardCallback = (error: (Error|null), response?: worldmap.flashcard.GetChineseFlashCardResponse) => void;

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#updateChineseFlashCard}.
             * @param error Error, if any
             * @param [response] UpdateChineseFlashCardResponse
             */
            type UpdateChineseFlashCardCallback = (error: (Error|null), response?: worldmap.flashcard.UpdateChineseFlashCardResponse) => void;

            /**
             * Callback as used by {@link worldmap.flashcard.ChineseFlashCardService#deleteChineseFlashCard}.
             * @param error Error, if any
             * @param [response] DeleteChineseFlashCardResponse
             */
            type DeleteChineseFlashCardCallback = (error: (Error|null), response?: worldmap.flashcard.DeleteChineseFlashCardResponse) => void;
        }
    }
}
