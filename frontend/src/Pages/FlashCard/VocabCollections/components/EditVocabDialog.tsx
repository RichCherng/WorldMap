import React, { useState, useEffect } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { vocabEntry } from '../VocabList';

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
      ...item,
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

export default EditVocabDialog;
