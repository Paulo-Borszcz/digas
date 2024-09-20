'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { incrementCount } from '@/lib/actions';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusCircleIcon, ClockIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AddWordModal from './AddWordModal';
import Link from 'next/link';
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
  initialWordCounts: { Diga: number; 'Papo Reto': number };
}

export default function DigaCounter({ initialCount, initialBill, initialWordCounts }: DigaCounterProps) {
  const [count, setCount] = useState(initialCount);
  const [bill, setBill] = useState(initialBill);
  const [wordCounts, setWordCounts] = useState(initialWordCounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleIncrement = async (word: string, reason: string) => {
    try {
      const result = await incrementCount(word, reason);
      setCount(result.count);
      setBill(result.bill);
      setWordCounts(result.wordCounts);
      toast({
        title: `${word} Contabilizado!`,
        description: `O Total agora é ${result.count}`,
      });
    } catch (error) {
      console.error('Erro ao incrementar a contagem:', error);
      toast({
        title: "Erro",
        description: "Falha ao atualizar a contagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const progress = Math.min((count / 100) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {count}
        </Badge>
        <p className="text-sm text-muted-foreground">Total de Palavras Ditas</p>
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
      <div className="flex justify-between items-center">
        <Button onClick={() => setIsModalOpen(true)} className="flex-1 mr-2" size="lg">
          <PlusCircleIcon className="mr-2 h-4 w-4" /> Adicionar Palavra
        </Button>
        <Link href="/history">
          <Button variant="outline" size="lg">
            <ClockIcon className="mr-2 h-4 w-4" /> Visualizar Histórico
          </Button>
        </Link>
      </div>
      <AddWordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleIncrement} />
    </div>
  );
}