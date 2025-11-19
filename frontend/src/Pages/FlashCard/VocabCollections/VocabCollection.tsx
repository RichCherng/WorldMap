import { useState, Children, isValidElement, cloneElement } from "react";
import Folder from "@/components/Folder";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SearchIcon } from "lucide-react";
import "./VocabCollection.css";


interface VocabCollectionsProps {
    children?: React.ReactNode;
    description?: string;
    title?: string;
    onAddVocab?: (vocab: { native: string; pronunciation: string; translation: string; exampleUsage?: string }) => Promise<void>;
}

export function VocabCollections({
    children,
    title = "<Language> Vocabulary",
    description = "Description Placeholder",
    onAddVocab
}: VocabCollectionsProps) {
    // State for input values
    const [nativeText, setNativeText] = useState(""); // "美国人", "español", "bonjour"
    const [pronunciationText, setPronunciationText] = useState(""); // "Měiguó rén", "es-pah-NYOL", "bon-ZHOOR"
    const [translationText, setTranslationText] = useState(""); // "American", "Spanish", "hello"
    const [searchText, setSearchText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addError, setAddError] = useState<string | null>(null);

    // Handle form submission
    const handleAddVocab = async () => {
        // Validate inputs
        if (!nativeText.trim() || !pronunciationText.trim() || !translationText.trim()) {
            setAddError("All fields are required");
            return;
        }

        const vocabEntry = {
            native: nativeText.trim(),
            pronunciation: pronunciationText.trim(),
            translation: translationText.trim()
        };

        setIsAdding(true);
        setAddError(null);

        try {
            if (onAddVocab) {
                await onAddVocab(vocabEntry);
            } else {
                console.log("New vocab entry:", vocabEntry);
            }

            // Clear inputs after successful add
            setNativeText("");
            setPronunciationText("");
            setTranslationText("");
        } catch (error) {
            setAddError(error instanceof Error ? error.message : "Failed to add vocabulary");
        } finally {
            setIsAdding(false);
        }
    };

    return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
            <div id="folder-container" className={isOpen ? 'folder-disabled' : ''}>
                <Folder size={.50} color="#5227FF" className="custom-folder" isOpen={isOpen} />
            </div>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
                <SheetDescription>
                    {description}
                </SheetDescription>
            </SheetHeader>
            <SearchBar searchText={searchText} setSearchText={setSearchText} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    return cloneElement(child as React.ReactElement<any>, { searchQuery: searchText });
                }
                return child;
            })}
            <SheetFooter className="flex-col space-y-1 compact-footer">
                <AddVocabInput
                    nativeText={nativeText}
                    setNativeText={setNativeText}
                    pronunciationText={pronunciationText}
                    setPronunciationText={setPronunciationText}
                    translationText={translationText}
                    setTranslationText={setTranslationText}
                />
                {addError && (
                    <div style={{
                        color: '#ff6b6b',
                        fontSize: '0.875rem',
                        padding: '0.5rem',
                        textAlign: 'center'
                    }}>
                        {addError}
                    </div>
                )}
                <Button
                    type="submit"
                    className="w-full h-8 text-sm"
                    onClick={handleAddVocab}
                    disabled={isAdding}
                >
                    {isAdding ? 'Adding...' : 'Add'}
                </Button>
            </SheetFooter>
        </SheetContent>
    </Sheet>)
}

interface AddVocabInputProps {
    nativeText: string;
    setNativeText: (value: string) => void;
    pronunciationText: string;
    setPronunciationText: (value: string) => void;
    translationText: string;
    setTranslationText: (value: string) => void;
}

function AddVocabInput({ nativeText, setNativeText, pronunciationText, setPronunciationText, translationText, setTranslationText }: AddVocabInputProps) {
    return (
        <div className="vocab-input-section">
            <div className={`item`}>
                <div className="item-text vocab-inline-inputs">
                    <input 
                        placeholder="美国人" 
                        value={nativeText}
                        onChange={(e) => setNativeText(e.target.value)}
                        className="inline-vocab-input"
                    />
                    <span>(</span>
                    <input 
                        placeholder="Měiguó rén" 
                        value={pronunciationText}
                        onChange={(e) => setPronunciationText(e.target.value)}
                        className="inline-vocab-input"
                    />
                    <span>) : </span>
                    <input 
                        placeholder="American" 
                        value={translationText}
                        onChange={(e) => setTranslationText(e.target.value)}
                        className="inline-vocab-input"
                    />
                </div>
            </div>
        </div>
    )
}

interface SearchBarProps {
    searchText: string;
    setSearchText: (value: string) => void;
}

function SearchBar({ searchText, setSearchText }: SearchBarProps) {
    return (
        <InputGroup>
            <InputGroupInput 
                placeholder="Search..." 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <InputGroupAddon>
                <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <InputGroupButton>Search</InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    )
}