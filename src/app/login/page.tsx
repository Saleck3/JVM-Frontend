import Footer from '../shared/components/Footer/Footer';
import Navbar from '../shared/components/Navbar/Navbar';
import LoginForm from './LoginForm/LoginForm';
import Image from "next/image";

export default function Login() {
    return (
        <>
            <Navbar/>
            <div className="container py-16 xl:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <LoginForm/>
                    <div className="hidden lg:block bg-white p-4 mb-4 lg:col-span-1">
                        <Image
                            src="/_next/image?url=%2Fimg%2Fhero_img.png&w=640&q=75"
                            alt="lombriz haciendo un examen"
                            width={500}
                            height={500}
                        />
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}