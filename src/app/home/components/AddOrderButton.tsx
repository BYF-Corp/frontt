'use client';
import { useRouter } from 'next/navigation';

export default function AddOrderButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push('/orderpage')}>+ ADD</button>
  );
}
