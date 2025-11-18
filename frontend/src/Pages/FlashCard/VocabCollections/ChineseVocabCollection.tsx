import AnimatedList from "@/components/AnimatedList";
import Folder from "@/components/Folder";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label"
import { IconCheck, IconInfoCircle, IconPlus } from "@tabler/icons-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
// import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { SearchIcon } from "lucide-react";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import VocabList from "./VocabList";
import { ChineseCardData } from "@/components/FlashCard/Language/ChineseCard";
import { useState, useEffect } from "react";
import { VocabCollections } from "./VocabCollection";
import { fetchChineseCards, addChineseCard } from "@/data/chineseCardData";
// TODO: Import deleteChineseCard when Phase 4 is implemented


interface ChineseVocabCollectionProps {
    onCardsChange?: (cards: ChineseCardData[]) => void;
    onLoadingChange?: (loading: boolean) => void;
    children?: (cards: ChineseCardData[], loading: boolean) => React.ReactNode;
}

export function ChineseVocabCollection({ onCardsChange, onLoadingChange, children }: ChineseVocabCollectionProps) {
    const [cards, setCards] = useState<ChineseCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch cards on mount
    useEffect(() => {
        // Immediately notify parent that we're starting with empty cards and loading
        if (onCardsChange) {
            onCardsChange([]);
        }
        if (onLoadingChange) {
            onLoadingChange(true);
        }

        fetchChineseCards()
            .then(data => {
                setCards(data);
                setError(null);
                if (onCardsChange) {
                    onCardsChange(data);
                }
            })
            .catch(err => {
                console.error('Failed to fetch Chinese cards:', err);
                setError(err.message || 'Failed to load Chinese cards');
            })
            .finally(() => {
                setLoading(false);
                if (onLoadingChange) {
                    onLoadingChange(false);
                }
            });
    }, [onCardsChange, onLoadingChange]);

    // Map cards to items with IDs for tracking
    const items = cards.map(word => ({
        id: word.id,
        native: word.chineseWord,
        pronunciation: word.pinyin,
        translation: word.englishWord
    }));

    const handleAddVocab = async (vocab: { native: string; pronunciation: string; translation: string }) => {
        try {
            // Call the data layer to add the card via gRPC
            const newCard = await addChineseCard({
                chineseWord: vocab.native,
                pinyin: vocab.pronunciation,
                englishWord: vocab.translation
            });

            // Update local cards state with the new card
            const updatedCards = [...cards, newCard];
            setCards(updatedCards);

            // Notify parent component if callback provided
            if (onCardsChange) {
                onCardsChange(updatedCards);
            }

            console.log('Successfully added card:', newCard);
        } catch (error: any) {
            console.error('Failed to add vocab:', error);
            setError(error.message || 'Failed to add vocabulary');
            // TODO: Consider showing error to user in UI (e.g., toast notification)
        }
    };

    const handleDeleteVocab = async (item: any, index: number) => {
        // TODO: Implement in Phase 4 using deleteChineseCard from data layer
        console.warn('Delete functionality not yet implemented - will be added in Phase 4');
        
        /*
        // Phase 4 implementation:
        const cardId = items[index]?.id;
        if (!cardId) return;

        try {
            // Call the API to delete the card
            await deleteChineseCard(cardId);

            // Update local cards state
            const updatedCards = cards.filter(card => card.id !== cardId);
            setCards(updatedCards);

            // Notify parent component if callback provided
            if (onCardsChange) {
                onCardsChange(updatedCards);
            }
        } catch (error) {
            console.error('Failed to delete vocab:', error);
            // You might want to show an error message to the user here
        }
        */
    };

  return (
    <>
      <VocabCollections
          title="Chinese Vocabulary"
          description="Manage your Chinese vocabulary here. Click save when you&apos;re done."
          onAddVocab={handleAddVocab}
          >
          <VocabList
              items={items}
              onItemSelect={(item, index) => console.log(item, index)}
              onItemDelete={handleDeleteVocab}
              showGradients={false}
              enableArrowNavigation={true}
              displayScrollbar={false}/>
      </VocabCollections>
      {children && children(cards, loading)}
    </>
  )
}
