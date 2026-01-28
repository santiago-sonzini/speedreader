
import HabitDashboard from '@/components/habits/main';
import getUserServer from '@/lib/user';
import { redirect } from 'next/navigation';


export default async function Page() {
  const res = await getUserServer();

  if (!res?.user) {
    redirect('/auth')
  }

  return (
    <HabitDashboard />
  );
}