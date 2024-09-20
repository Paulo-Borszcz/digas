import { Suspense } from 'react';
import { getWordHistory } from '@/lib/actions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function HistoryPage() {
  const wordHistory = await getWordHistory();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Histórico de Palavras</CardTitle>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Menu Inicial
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<p>Carregando Histórico...</p>}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Palavra</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Horário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wordHistory.map((entry: { word: string; reason: string; timestamp: string }, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{entry.word}</TableCell>
                    <TableCell>{entry.reason}</TableCell>
                    <TableCell>{new Date(entry.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(entry.timestamp).toLocaleTimeString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}