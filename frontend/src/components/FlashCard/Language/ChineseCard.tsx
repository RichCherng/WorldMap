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

    const back = (
        <div className="chinese-card-back">
            <h2 className="english-word">{data.englishWord}</h2>
            <p className="pinyin">({data.pinyin})</p>
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