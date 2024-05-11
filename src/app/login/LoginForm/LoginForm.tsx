import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function LoginForm() {
    return (
        <form>
            <div className="bg-white p-4 mb-4 lg:col-span-1">
                <h1 className="text-4xl font-bold text-gray-800 p-4">Login</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mail</label>
                    <input id="email" name="email" type="text"
                           className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-pink-500"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                    <input id="password" name="password" type="password"
                           className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-pink-500"/>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <input type="checkbox" id="recordarme" className="form-checkbox h-5 w-5 text-pink-600"/>
                        <label htmlFor="recordarme" className="ml-2 text-gray-700">Recordarme</label>
                    </div>
                    <p className="text-right"><Link className="text-pink-600" href="/">
                        ¿Olvidaste tu contraseña?
                    </Link></p>
                </div>
                <Link href="/">
                    <Button id="login" className="mt-4 w-full" size={'lg'}>
                        Login
                    </Button>
                </Link>
                <p className="text-center mt-4">¿No tienes una cuenta? <Link className="text-pink-600"
                                                                             href="../../registro">
                    Registrate
                </Link></p>
            </div>
        </form>
    );
}
