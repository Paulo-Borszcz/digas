"use client"
import { Suspense, useEffect, useState } from 'react';
import DigaCounter from '@/components/DigaCounter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitialCount } from '@/lib/actions';
import { Skeleton } from "@/components/ui/skeleton";
import { MegaphoneIcon } from 'lucide-react';


export default function Home() {
  const [data, setData] = useState({ count: 0, bill: 0, wordCounts: { Diga: 0, 'Papo Reto': 0 } });

  const fetchData = async () => {
    const initialData = await getInitialCount();
    setData(initialData);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // Atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <MegaphoneIcon className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-2xl font-bold text-center">Luis' Word Counter</CardTitle>
          </div>
          <p className="text-center text-sm text-muted-foreground">Track and count Luis' words</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense fallback={<DigaCounterSkeleton />}>
            <DigaCounter initialCount={data.count} initialBill={data.bill} initialWordCounts={data.wordCounts} />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}

function DigaCounterSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-24 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-28 mx-auto" />
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}