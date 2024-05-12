import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function Component() {
    return (
        <div className="mx-auto max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">Ingresá tu información para entrar a tu cuenta</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="m@example.com" required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" placeholder="**********" required type="password"/>
            </div>
            <div><Checkbox/> Recordarme</div>
            <div className="space-y-2">
                <Link className="underline" href="/">¿Olvidaste tu contraseña?</Link>
            </div>
            <Button className="w-full" type="submit">
                Login
            </Button>
            <div>¿No tenés cuenta? <Link className="font-bold" href="../../registro">Registrate</Link></div>
        </div>
    );
}