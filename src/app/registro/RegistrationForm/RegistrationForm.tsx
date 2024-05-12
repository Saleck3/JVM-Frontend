import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link";

export default function Component() {
    return (
        <div className="mx-auto max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Registrate</h1>
                <p className="text-gray-500 dark:text-gray-400">Ingresá tu información para crear tu cuenta</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input id="name" placeholder="John" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" placeholder="Doe" required/>
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="m@example.com" required/>
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="phone">Número de teléfono</Label>
                    <Input id="phone" placeholder="12345678" required/>
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" placeholder="**********" required type="password"/>
                </div>
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <Input id="confirmPassword" placeholder="**********" required type="password"/>
                </div>
                <div className="space-y-2 col-span-2"><Checkbox/> Estoy de acuerdo con los términos y las políticas de privacidad</div>
            </div>
            <div className="col-span-2">
                <Button className="w-full" type="submit">
                    Registrate
                </Button>
            </div>
            <div className="text-center">
                <div className="space-y-2">¿Ya tienes una cuenta? <Link className="font-bold"
                                                                        href="../../login">Login</Link></div>
            </div>
        </div>
    )
}
