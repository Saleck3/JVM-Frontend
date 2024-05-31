import type { Metadata } from 'next';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { RegisterForm } from './form';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Create an account to start using our app',
};

export default function Register() {

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full p-4 justify-center items-center">
      <div className="flex justify-center items-center md:w-1/2">
        <div className="relative h-80 w-80 md:w-auto">
          <Image
            src="/img/WarmSinFondo.png"
            alt="lombriz"
            width={400}
            height={400}
            objectFit="contain"
          />
        </div>
      </div>
      <div className="flex justify-center items-center md:w-1/2">
        <div className="max-w-lg">
          <Card className="p-5">
            <RegisterForm />
          </Card>
        </div>
      </div>
    </div>
  </main>

  );
};