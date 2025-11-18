import React, { useRef, useState, useEffect, ReactNode, MouseEventHandler, UIEvent } from 'react';
import { motion, useInView } from 'motion/react';
import './VocabList.css';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export interface vocabEntry {
  native: string;
  pronunciation: string;
  translation: string;
  exampleUsage?: string;
}

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ marginBottom: '1rem', cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

interface VocabListProps {
  items: vocabEntry[];
  onItemSelect?: (item: vocabEntry, index: number) => void;
  onItemDelete?: (item: vocabEntry, index: number) => void;
  onItemEdit?: (item: vocabEntry, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

const VocabList: React.FC<VocabListProps> = ({
  items = [ { native: "Sample", pronunciation: "Sample", translation: "Sample" } ],
  onItemSelect,
  onItemDelete,
  onItemEdit,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleDeleteItem = (item: vocabEntry, index: number) => {
    if (onItemDelete) {
      onItemDelete(item, index);
    }
  };

  const handleEditItem = (item: vocabEntry, index: number) => {
    if (onItemEdit) {
      onItemEdit(item, index);
    }
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null;
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`scroll-list-container ${className}`}>
      <div ref={listRef} className={`scroll-list ${!displayScrollbar ? 'no-scrollbar' : ''}`} onScroll={handleScroll}>
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              if (onItemSelect) {
                onItemSelect(item, index);
              }
            }}
          >
            <EditVocabDialog 
              item={item} 
              index={index}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              itemClassName={itemClassName}
            />
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div className="top-gradient" style={{ opacity: topGradientOpacity }}></div>
          <div className="bottom-gradient" style={{ opacity: bottomGradientOpacity }}></div>
        </>
      )}
    </div>
  );
};

interface EditVocabDialogProps {
  item: vocabEntry;
  index: number;
  onEdit: (item: vocabEntry, index: number) => void;
  onDelete: (item: vocabEntry, index: number) => void;
  itemClassName?: string;
}

const EditVocabDialog: React.FC<EditVocabDialogProps> = ({ item, index, onEdit, onDelete, itemClassName = '' }) => {
  const [nativeText, setNativeText] = useState(item.native);
  const [pronunciationText, setPronunciationText] = useState(item.pronunciation);
  const [translationText, setTranslationText] = useState(item.translation);
  const [exampleUsageText, setExampleUsageText] = useState(item.exampleUsage || '');
  const [isOpen, setIsOpen] = useState(false);

  // Reset form when dialog opens
  useEffect(() => {
    if (isOpen) {
      setNativeText(item.native);
      setPronunciationText(item.pronunciation);
      setTranslationText(item.translation);
      setExampleUsageText(item.exampleUsage || '');
    }
  }, [isOpen, item]);

  const handleSave = () => {
    const updatedItem: vocabEntry = {
      native: nativeText,
      pronunciation: pronunciationText,
      translation: translationText,
      exampleUsage: exampleUsageText.trim() || undefined
    };
    onEdit(updatedItem, index);
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(item, index);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className={`item ${itemClassName}`}>
          <p className="item-text">{item.native} ({item.pronunciation}) : {item.translation}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Vocabulary</DialogTitle>
          <DialogDescription>
            Make changes to your vocabulary entry. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="native-text">Native Language</Label>
            <Input 
              id="native-text" 
              value={nativeText}
              onChange={(e) => setNativeText(e.target.value)}
              placeholder="e.g., 美国人"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="pronunciation-text">Pronunciation</Label>
            <Input 
              id="pronunciation-text" 
              value={pronunciationText}
              onChange={(e) => setPronunciationText(e.target.value)}
              placeholder="e.g., Měiguó rén"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="translation-text">Translation</Label>
            <Input
              id="translation-text"
              value={translationText}
              onChange={(e) => setTranslationText(e.target.value)}
              placeholder="e.g., American"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="example-usage-text">Example Usage (Optional)</Label>
            <Textarea
              id="example-usage-text"
              value={exampleUsageText}
              onChange={(e) => setExampleUsageText(e.target.value)}
              placeholder="e.g., 我是美国人 (I am American)"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
          >
            Delete
          </Button>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>


  );
};

export default VocabList;
