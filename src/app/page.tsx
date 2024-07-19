'use client';

import { useAppDispatch, useAppSelector } from '@/lib';
import { checkAndFetchDataUser } from '@/utils/handleSplash';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      checkAndFetchDataUser(dispatch, router);
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-24 overflow-hidden">
      <Image src="/logo.png" alt="Viet Travel" width={1024} height={200} className="w-[80%] h-[80%] object-contain animate-pulse" />
    </main>
  );
}
