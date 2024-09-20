'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (word: string, reason: string) => void;
}

export default function AddWordModal({ isOpen, onClose, onSubmit }: AddWordModalProps) {
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [reason, setReason] = useState<string>('');

  const handleSubmit = () => {
    if (selectedWord && reason) {
      onSubmit(selectedWord, reason);
      setSelectedWord('');
      setReason('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-black">
        <DialogHeader>
          <DialogTitle
          >Adicionar Palavra</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="word" className="text-right">
              Palavra
            </Label>
            <Select value={selectedWord} onValueChange={setSelectedWord}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecionar Palavra" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diga">Diga</SelectItem>
                <SelectItem value="Papo Reto">Papo Reto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reason" className="text-right">
              Motivo
            </Label>
            <Input
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}