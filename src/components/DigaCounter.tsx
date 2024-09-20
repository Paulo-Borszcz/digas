'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { incrementCount, getWordCounts } from '@/lib/actions';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusCircleIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AddWordModal from './AddWordModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DigaCounterProps {
  initialCount: number;
  initialBill: number;
}

interface WordCounts {
  Diga: number;
  'Papo Reto': number;
}

export default function DigaCounter({ initialCount, initialBill }: DigaCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [bill, setBill] = useState(initialBill);
  const [wordCounts, setWordCounts] = useState<WordCounts>({ Diga: 0, 'Papo Reto': 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchWordCounts();
  }, []);

  const fetchWordCounts = async () => {
    try {
      const counts = await getWordCounts();
      setWordCounts(counts);
    } catch (error) {
      console.error('Erro ao buscar contagem de palavras:', error);
      toast({
        title: "Erro",
        description: "Falha ao buscar contagem de palavras. Por favor, atualize a página.",
        variant: "destructive",
      });
    }
  };

  const handleIncrement = async (word: string, reason: string) => {
    try {
      const result = await incrementCount(word, reason);
      setCount(result.count);
      setBill(result.bill);
      setWordCounts(result.wordCounts);
      toast({
        title: `${word} contabilizado!`,
        description: `O total agora é ${result.count}`,
      });
    } catch (error) {
      console.error('Erro ao incrementar contagem:', error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar a contagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const progress = Math.min((count / 100) * 100, 100); // Progress maxes out at 100%

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {count}
        </Badge>
        <p className="text-sm text-muted-foreground">Total de palavras ditas</p>
      </div>
      <Progress value={progress} className="w-full" />
      <div className="text-center space-y-2">
        <p className="text-2xl font-semibold">
          R$ {typeof bill === 'number' ? bill.toFixed(2) : '0.00'}
        </p>
        <p className="text-sm text-muted-foreground">Dívida Atual</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Palavra</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Diga</TableCell>
            <TableCell className="text-right">{wordCounts.Diga}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Papo Reto</TableCell>
            <TableCell className="text-right">{wordCounts['Papo Reto']}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button onClick={() => setIsModalOpen(true)} className="w-full" size="lg">
        <PlusCircleIcon className="mr-2 h-4 w-4" /> Luis falou uma Palavra
      </Button>
      <AddWordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleIncrement} />
    </div>
  );
}