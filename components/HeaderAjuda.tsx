import { LifeBuoy } from "lucide-react"
import { StarIcon } from "@/components/mission-icons"

type HeaderAjudaProps = {
  /** Estrelas conquistadas até ao momento. Mock fixo por enquanto. */
  estrelas?: number
}

/* Header do contexto de Ajuda. Reforça visualmente que estamos em modo
 * "pedido de ajuda" — o fundo amarelo do ecrã + o badge tornam o estado
 * inconfundível (Nielsen #1: visibilidade do estado do sistema). */
export function HeaderAjuda({ estrelas = 0 }: HeaderAjudaProps) {
  return (
    <header className="flex w-full items-center justify-end">
      <div
        className="flex items-center gap-2 rounded-2xl bg-white/70 px-5 py-2 shadow-sm"
        role="status"
        aria-label={`Estrelas conquistadas: ${estrelas}`}
      >
        <StarIcon className="h-8 w-8" />
        <span className="font-display text-3xl font-bold text-ink">
          {estrelas}
        </span>
      </div>
    </header>
  )
}