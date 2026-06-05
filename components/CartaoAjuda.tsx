import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CartaoAjudaProps = {
  titulo: string
  pictograma: ReactNode
  /** Cor de fundo da "placa" do pictograma — pastel suave. */
  corPlaca: string
  emFoco: boolean
  /** Permite clicar com rato durante desenvolvimento. A interação real é por botões físicos. */
  onClick?: () => void
  ariaLabel?: string
}

/* Cartão de opção do ecrã de Ajuda. Quando emFoco=true, mostra moldura
 * coral, halo subtil, badge "ESCOLHIDO!" e pulse muito suave. */
export function CartaoAjuda({ titulo, pictograma, corPlaca, emFoco, onClick, ariaLabel }: CartaoAjudaProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel ?? titulo}
      aria-current={emFoco ? "true" : undefined}
      className={cn(
        "group relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-3xl bg-white px-4 py-3 transition-all duration-300",
        "border-[5px] focus:outline-none",
        emFoco
          ? "border-coral -translate-y-1 animate-pulse-suave"
          : "border-white/70 hover:-translate-y-0.5",
      )}
      style={{
        boxShadow: emFoco
          ? "0 0 0 8px rgba(247, 160, 114, 0.25), 0 8px 0 0 rgba(228, 110, 110, 0.18)"
          : "0 6px 0 0 rgba(60, 80, 110, 0.08)",
      }}
    >
      {emFoco && (
        <div className="pointer-events-none absolute -top-4 inset-x-0 flex justify-center">
          <div className="rounded-full bg-coral px-4 py-1.5 shadow-md">
            <span className="font-display text-xs font-bold tracking-wider text-white uppercase whitespace-nowrap">
              ★ Escolhido!
            </span>
          </div>
        </div>
      )}

      {/* Pictograma — sem placa colorida, imagem direta */}
      <div
        className="flex flex-1 min-h-0 w-full items-center justify-center"
        aria-hidden="true"
      >
        <div className="flex h-[85%] w-[85%] items-center justify-center">{pictograma}</div>
      </div>

      {/* Título */}
      <h3 className="px-2 text-center font-display text-xl font-semibold leading-tight text-ink md:text-[1.45rem]">
        {titulo}
      </h3>
    </button>
  )
}