import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import { Card } from '@/components/ui/card';
//import { getUser } from '@/library/dal';

import { RegisterForm } from './form';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Create an account to start using our app',
};

export default function Register() {
  //  const user = await getUser();
  //  if (user) redirect('/');

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full p-4">
            <div className="md:order-2 flex flex-col items-center justify-center">
            <div className="flex justify-center mt-20 w-full max-w-xs">
            <Card className="p-5 w-[100%] max-w-[400px]">
                <RegisterForm />
            </Card>
        </div>
            </div>
            <div className="md:order-1 hidden md:flex justify-center items-center">
                <div className="relative h-full w-full">
                    <Image
                        src="/img/WarmSinFondo.png"
                        alt="lombriz"
                        layout="fill"
                        objectFit="contain"
                        className="mb-8 lg:mb-0 lg:mr-8"
                    />
                </div>
            </div>
        </div>
    </div>
    );
}