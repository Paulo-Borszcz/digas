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
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HistoryPage() {
  const wordHistory = await getWordHistory();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Word History</CardTitle>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Counter
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<p>Loading history...</p>}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Word</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {wordHistory.map((entry : any, index : any) => (
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