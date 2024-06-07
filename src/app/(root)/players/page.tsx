import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import Players from "./components/Players";
import LeadTitle from "@/app/shared/components/LeadTitle";
import Link from "next/link";

export default async function PlayerSelection() {
  const session = await getServerSession(options);
  const players = session?.user.players;

  return (
    <main className="container py-32 md:px-12 lg:px-32 space-y-12">
      <LeadTitle
        title="Selección de jugador"
        subtitle="Selecciona un jugador para continuar"
      />
      <Players playerList={players} />
      <div className="flex justify-center">
        <Link href="/profile/newPlayer">
          <Button size="lg">+ Agregar jugador</Button>
        </Link>
      </div>
    </main>
  );
}
