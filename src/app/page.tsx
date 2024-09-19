// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    const res = await fetch('/api/getCount');
    const data = await res.json();
    setCount(data.count);
  };

  const incrementCount = async () => {
    const res = await fetch('/api/increment', { method: 'POST' });
    const data = await res.json();
    setCount(data.count);
  };

  const bill = (count * 0.10).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Contador de "Diga" do Luís</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-4xl font-bold">{count}</p>
            <p className="text-gray-500">Total de "Diga" falado</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-semibold">R$ {bill}</p>
            <p className="text-gray-500">Dívida Atual</p>
          </div>
          <Button onClick={incrementCount} className="w-full">
            Adicionar novo "Diga"
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}