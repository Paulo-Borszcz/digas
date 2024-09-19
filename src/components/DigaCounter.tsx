'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { incrementCount } from '@/lib/actions';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusCircleIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function DigaCounter({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const { toast } = useToast();

  const handleIncrement = async () => {
    const newCount = await incrementCount();
    setCount(newCount);
    toast({
      title: "Diga Counted!",
      description: `Total count is now ${newCount}`,
    });
  };

  const bill = (count * 0.10).toFixed(2);
  const progress = Math.min((count / 100) * 100, 100); // Progress maxes out at 100%

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {count}
        </Badge>
        <p className="text-sm text-muted-foreground">Total "Digas" said</p>
      </div>
      <Progress value={progress} className="w-full" />
      <div className="text-center space-y-2">
        <p className="text-2xl font-semibold">R$ {bill}</p>
        <p className="text-sm text-muted-foreground">Current bill</p>
      </div>
      <Button onClick={handleIncrement} className="w-full" size="lg">
        <PlusCircleIcon className="mr-2 h-4 w-4" /> Increment "Diga"
      </Button>
    </div>
  );
}