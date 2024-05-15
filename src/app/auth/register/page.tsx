import Footer from '@/app/shared/components/Footer/Footer';
import Navbar from '@/app/shared/components/Navbar/Navbar';
import RegistrationForm from '@/app/auth/components/RegistrationForm/RegistrationForm';
import Image from "next/image";

export default function Registration() {
    return (
        <>
            <Navbar/>
            <div className="container py-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="hidden lg:block bg-white p-4 mb-4 lg:col-span-1">
                        <Image
                            src="/img/features/feature-fun.svg"
                            alt="lombriz haciendo un examen"
                            width={500}
                            height={500}
                        />
                    </div>
                    <RegistrationForm/>


                </div>
            </div>

            <Footer/>
        </>
    );
}