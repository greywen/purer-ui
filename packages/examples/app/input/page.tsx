import { Input } from '@purer-ui/input';

export default function InputPage() {
  return (
    <main className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center gap-6'>
        <div className='flex gap-2'>
          <Input />
        </div>
      </div>
    </main>
  );
}
