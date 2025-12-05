'use client';

import { Construction } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Card, CardContent } from '@/components/ui/card';

export default function MembersPage() {
  return (
    <>
      <Header title="會員管理" description="管理會員資訊" />

      <div className="p-6">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Construction className="h-16 w-16 text-neutral-400" />
            <h2 className="mt-4 text-xl font-semibold">會員管理功能開發中</h2>
            <p className="mt-2 text-center text-neutral-500">
              此功能尚在規劃中，敬請期待。
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
