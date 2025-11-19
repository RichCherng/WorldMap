import AnimatedList from "@/components/AnimatedList";
import Folder from "@/components/Folder";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label"
import { IconCheck, IconInfoCircle, IconPlus, IconAlertCircle, IconX } from "@tabler/icons-react"
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
import { fetchChineseCards, addChineseCard, updateChineseCard, deleteChineseCard } from "@/data/chineseCardData";


interface ChineseVocabCollectionProps {
    onCardsChange?: (cards: ChineseCardData[]) => void;
    onLoadingChange?: (loading: boolean) => void;
    children?: (cards: ChineseCardData[], loading: boolean, updateCards: (cards: ChineseCardData[]) => void) => React.ReactNode;
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
                console.log('✅ Fetched Chinese cards from Firestore:', data);
                console.log('📊 Number of cards:', data.length);
                setCards(data);
                setError(null);
                if (onCardsChange) {
                    onCardsChange(data);
                }
            })
            .catch(err => {
                console.error('❌ Failed to fetch Chinese cards:', err);
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
        translation: word.englishWord,
        exampleUsage: word.exampleUsage,
        createdAt: word.createdAt,
        favorite: word.favorite || false
    }));

    const handleAddVocab = async (vocab: { native: string; pronunciation: string; translation: string; exampleUsage?: string }) => {
        try {
            console.log('🆕 handleAddVocab called with:', vocab);

            // Clear any previous errors
            setError(null);

            // Call the data layer to add the card via Firestore
            const newCard = await addChineseCard({
                chineseWord: vocab.native,
                pinyin: vocab.pronunciation,
                englishWord: vocab.translation,
                exampleUsage: vocab.exampleUsage
            });

            console.log('📦 New card received from addChineseCard:', newCard);

            // Update local cards state with the new card
            const updatedCards = [...cards, newCard];
            setCards(updatedCards);

            console.log('💾 Updated local cards state:', updatedCards);

            // Notify parent component if callback provided
            if (onCardsChange) {
                onCardsChange(updatedCards);
            }

            console.log('✅ Successfully added card:', newCard);
        } catch (error: any) {
            console.error('❌ Failed to add vocab:', error);
            setError(error.message || 'Failed to add vocabulary');
        }
    };

    const handleEditVocab = async (item: any, index: number) => {
        try {
            // Clear any previous errors
            setError(null);

            // Get the card ID directly from the item
            const cardId = item.id;
            if (!cardId) {
                console.error('No card ID found for item:', item);
                setError('Unable to update: Card ID not found');
                return;
            }

            console.log('📝 Editing vocab item:', { item, index, cardId });

            // Call the data layer to update the card via Firestore
            const updatedCard = await updateChineseCard(cardId, {
                chineseWord: item.native,
                pinyin: item.pronunciation,
                englishWord: item.translation,
                exampleUsage: item.exampleUsage
            });

            console.log('📦 Received updated card from data layer:', updatedCard);

            // Update local cards state with the updated card
            const updatedCards = cards.map(card =>
                card.id === cardId ? updatedCard : card
            );
            setCards(updatedCards);

            // Notify parent component if callback provided
            if (onCardsChange) {
                onCardsChange(updatedCards);
            }

            console.log('Successfully updated card:', updatedCard);
        } catch (error: any) {
            console.error('Failed to edit vocab:', error);
            setError(error.message || 'Failed to update vocabulary');
        }
    };

    const handleDeleteVocab = async (item: any, index: number) => {
        try {
            // Clear any previous errors
            setError(null);

            // Get the card ID directly from the item
            const cardId = item.id;
            if (!cardId) {
                console.error('No card ID found for item:', item);
                setError('Unable to delete: Card ID not found');
                return;
            }

            // Call the data layer to delete the card via gRPC
            const success = await deleteChineseCard(cardId);

            if (success) {
                // Update local cards state by removing the deleted card
                const updatedCards = cards.filter(card => card.id !== cardId);
                setCards(updatedCards);

                // Notify parent component if callback provided
                if (onCardsChange) {
                    onCardsChange(updatedCards);
                }

                console.log('Successfully deleted card with ID:', cardId);
            } else {
                setError('Failed to delete vocabulary: Server returned unsuccessful status');
            }
        } catch (error: any) {
            console.error('Failed to delete vocab:', error);
            setError(error.message || 'Failed to delete vocabulary');
        }
    };

    // Function to update cards from child components
    const updateCards = (updatedCards: ChineseCardData[]) => {
        setCards(updatedCards);
        if (onCardsChange) {
            onCardsChange(updatedCards);
        }
    };

    return (
        <>
            <VocabCollections
                title="Chinese Vocabulary"
                description="Manage your Chinese vocabulary here. Click save when you&apos;re done."
                onAddVocab={handleAddVocab}
            >
                {error && (
                    <div style={{
                        backgroundColor: '#fee2e2',
                        border: '1px solid #fca5a5',
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <IconAlertCircle size={20} color="#dc2626" />
                            <div>
                                <strong style={{ color: '#dc2626' }}>Error</strong>
                                <p style={{ margin: 0, color: '#991b1b', fontSize: '0.875rem' }}>{error}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setError(null)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.25rem'
                            }}
                            aria-label="Dismiss error"
                        >
                            <IconX size={20} color="#dc2626" />
                        </button>
                    </div>
                )}
                <VocabList
                    items={items}
                    onItemSelect={(item, index) => console.log(item, index)}
                    onItemEdit={handleEditVocab}
                    onItemDelete={handleDeleteVocab}
                    showGradients={false}
                    enableArrowNavigation={true}
                    displayScrollbar={false} />
            </VocabCollections>
            {children && children(cards, loading, updateCards)}
        </>
    )
}
