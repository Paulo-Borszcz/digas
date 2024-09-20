import { Suspense } from 'react';
import DigaCounter from '@/components/DigaCounter';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitialCount } from '@/lib/actions';
import { Skeleton } from "@/components/ui/skeleton";
import { MegaphoneIcon } from 'lucide-react';

export default async function Home() {
  const { count, bill } = await getInitialCount();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <MegaphoneIcon className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-2xl font-bold text-center">Contador de Palavras Proibidas</CardTitle>
          </div>
            <p className="text-center text-sm text-muted-foreground">Acompanhe e conte as palavras de Luis</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense fallback={<DigaCounterSkeleton />}>
            <DigaCounter initialCount={count} initialBill={bill} />
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