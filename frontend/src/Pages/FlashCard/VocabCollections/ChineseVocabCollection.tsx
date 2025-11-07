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
import { useState } from "react";
import { VocabCollections } from "./VocabCollection";


interface ChineseVocabCollectionProps {  
    words: ChineseCardData[];
}

export function ChineseVocabCollection({ words }: ChineseVocabCollectionProps) {

    // const [items, setItems] = useState(words.map(word => `${word.chineseWord} (${word.pinyin}) : ${word.englishWord}`));
    // const items = words.map(word => `${word.chineseWord} (${word.pinyin}) : ${word.englishWord}`);
    const [items, setItems] = useState(words.map(word => ({
        native: word.chineseWord,
        pronunciation: word.pinyin,
        translation: word.englishWord
    })));

  return (
    <VocabCollections
        title="Chinese Vocabulary"
        description="Manage your Chinese vocabulary here. Click save when you&apos;re done."
        >
        <VocabList
            items={items}
            onItemSelect={(item, index) => console.log(item, index)}
            onItemDelete={(item, index) => {}}
            showGradients={false}
            enableArrowNavigation={true}
            displayScrollbar={false}/>
    </VocabCollections>
  )
}
