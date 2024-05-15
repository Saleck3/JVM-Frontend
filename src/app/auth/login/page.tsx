import LoginForm from "@/app/auth/login/LoginForm/LoginForm";
import Image from "next/image";


const Page = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full p-4">
                <div className="md:order-2 flex justify-center items-center">
                    <div className="h-96 w-full md:w-96 flex items-center justify-center">
                        <Image
                            src="/img/features/feature-modern.svg"
                            alt="lombriz"
                            width={1000}
                            height={1000}
                            className="mb-8 lg:mb-0 lg:mr-8"
                        />
                    </div>
                </div>
                <div className="md:order-1 flex flex-col items-center justify-center">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Page;