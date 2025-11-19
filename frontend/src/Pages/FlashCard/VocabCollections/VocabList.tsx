import React, { useRef, useState, useEffect, UIEvent, useMemo } from 'react';
import './VocabList.css';
import AnimatedItem from './components/AnimatedItem';
import EditVocabDialog from './components/EditVocabDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface vocabEntry {
  id: string;
  native: string;
  pronunciation: string;
  translation: string;
  exampleUsage?: string;
  createdAt?: number; // Timestamp for sorting
}

type SortOption = 'newest' | 'pinyin' | 'english';

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
  searchQuery?: string;
}

const VocabList: React.FC<VocabListProps> = ({
  items = [ { id: "sample-id", native: "Sample", pronunciation: "Sample", translation: "Sample" } ],
  onItemSelect,
  onItemDelete,
  onItemEdit,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
  searchQuery = ""
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  // Filtering Logic
  const filteredItems = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return items;

    const query = debouncedSearchQuery.toLowerCase();
    return items.filter(item =>
      item.native.toLowerCase().includes(query) ||
      item.pronunciation.toLowerCase().includes(query) ||
      item.translation.toLowerCase().includes(query)
    );
  }, [items, debouncedSearchQuery]);

  // Sorting Logic
  const getSortedItems = () => {
    const itemsCopy = [...filteredItems];
    switch (sortOption) {
      case 'newest':
        // Sort by createdAt descending (newest first)
        // If createdAt is missing, treat as older (put at end or keep relative order)
        return itemsCopy.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      case 'pinyin':
        return itemsCopy.sort((a, b) => a.pronunciation.localeCompare(b.pronunciation));
      case 'english':
        return itemsCopy.sort((a, b) => a.translation.localeCompare(b.translation));
      default:
        return itemsCopy;
    }
  };

  const sortedItems = getSortedItems();

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, sortedItems.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < sortedItems.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(sortedItems[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sortedItems, selectedIndex, onItemSelect, enableArrowNavigation]);

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
      <div className="mb-4 flex justify-end px-2">
        <Select value={sortOption} onValueChange={(value: string) => setSortOption(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="pinyin">Alphabetical (Pinyin)</SelectItem>
            <SelectItem value="english">Alphabetical (English)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div ref={listRef} className={`scroll-list ${!displayScrollbar ? 'no-scrollbar' : ''}`} onScroll={handleScroll}>
        {sortedItems.map((item, index) => (
          <AnimatedItem
            key={index} // Note: Using index as key might be an issue if list changes frequently, ideally use unique ID if available
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

export default VocabList;

