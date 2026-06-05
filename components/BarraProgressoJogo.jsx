/**
 * Barra de progresso do jogo de ordenação.
 * Mostra pontos para cada ronda (preenchido/atual/futuro).
 *
 * @param {{ total: number, atual: number }} props
 */
export function BarraProgressoJogo({ total, atual }) {
  return (
    <div
      className="flex items-center justify-center gap-2.5"
      role="progressbar"
      aria-valuenow={atual}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Ronda ${atual} de ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const indice = i + 1
        const feito = indice < atual
        const ativo = indice === atual
        return (
          <div
            key={i}
            className={`h-3.5 w-3.5 rounded-full transition-all duration-300 ${
              feito
                ? 'bg-[#7FB342]'
                : ativo
                  ? 'bg-coral scale-125 ring-4 ring-coral/30'
                  : 'bg-[#D4D0C7]'
            }`}
          />
        )
      })}
    </div>
  )
}
