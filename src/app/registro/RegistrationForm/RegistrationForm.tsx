import Link from 'next/link';

export default function RegistrationForm() {
    return (
        <form>
            <div className="bg-white p-4 mb-4 lg:col-span-1">
                <h1 className="text-4xl font-bold text-gray-800 p-4">Registro</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input id="firstName" name="firstName" type="text"
                               className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-pink-500"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido</label>
                        <input id="lastName" name="lastName" type="text"
                               className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-pink-500"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-Mail</label>
                        <input id="email" name="email" type="email"
                               className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-pink-500"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de
                            teléfono</label>
                        <input id="phone" name="phone" type="tel"
                               className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-pink-500"/>
                    </div>
                </div>
                <div className="col-span-2 mb-4">
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input id="password" name="password" type="password"
                               className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-pink-500"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirmar
                            Contraseña</label>
                        <input id="confirmPassword" name="confirmPassword" type="password"
                               className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:bg-white focus:border-pink-500"/>
                    </div>
                    <div className="col-span-2 mb-4">
                        <div className="flex items-center">
                            <input type="checkbox" id="terms" className="form-checkbox h-5 w-5 text-pink-600"/>
                            <label htmlFor="terms" className="ml-2 text-gray-700">Estoy de acuerdo con los términos y
                                las
                                políticas de privacidad</label>
                        </div>
                    </div>
                    <div className="col-span-2 mb-4">
                        <button
                            id="register"
                            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Crear Cuenta
                        </button>
                    </div>
                    <p className="col-span-2 text-center mt-4">¿Ya tienes una cuenta? <Link href="../../login"
                                                                                            className="text-pink-600">Login</Link>
                    </p>
                </div>
            </div>
        </form>
    );
}