import { CardData } from "../Card";
import './ChineseCard.css';



export interface ChineseCardData {
    id: string;  // Changed from number to string for Firestore compatibility
    chineseWord: string;
    englishWord: string;
    pinyin: string;
    img?: string;
    createdAt?: number;  // Timestamp in milliseconds
    updatedAt?: number;  // Timestamp in milliseconds
    exampleUsage?: string;  // Optional example sentence showing word usage in context
    isSelected?: boolean;  // Track if card is included in flashcard stack (default: true)
}


/**
 * Create a Chinese language flashcard component.
 */
export default function ChineseCard(data: ChineseCardData): CardData {

    const front = (
        <div className="chinese-card-front">
            {data.img && <img src={data.img} alt={`card-${data.id}`} className="card-image" />}
            <h2 className="chinese-word">{data.chineseWord}</h2>

        </div>
    );

    // Determine font size class based on English word length
    const getEnglishWordClass = () => {
        const length = data.englishWord.length;
        if (length > 40) return 'english-word english-word-extra-long';
        if (length > 25) return 'english-word english-word-long';
        if (length > 15) return 'english-word english-word-medium';
        return 'english-word';
    };

    const back = (
        <div className="chinese-card-back">
            <h2 className={getEnglishWordClass()}>{data.englishWord}</h2>
            <p className="pinyin">({data.pinyin})</p>
            {data.exampleUsage && (
                <div className="example-usage">
                    <p className="example-text">{data.exampleUsage}</p>
                </div>
            )}
        </div>
    );

    return {
        id: data.id,
        front: front,
        back: back
    };
}


const LaunguageCard: React.FC = () => {
    return (<div></div>)
}