import { Home } from 'lucide-react'
import { cn } from '@/lib/utils'

type BotaoMenuProps = {
  onClick?: () => void
  /** Versão mais pequena — usada em ecrãs densos (ex.: jogo, com 5 botões). */
  compact?: boolean
}

/* Botão físico nº5 — vermelho, volta ao menu principal. Tecla: 'm'. */
export function BotaoMenu({ onClick, compact = false }: BotaoMenuProps) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Halo exterior com 50% opacidade */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{ padding: compact ? '5px' : '8px', background: 'rgba(213, 91, 91, 0.5)' }}
      >
        {/* Círculo principal com sombra sólida */}
        <button
          onClick={onClick}
          aria-label="Voltar ao menu principal"
          className={
            compact
              ? 'relative flex h-12 w-12 items-center justify-center rounded-full bg-[#D55B5B]'
              : 'relative flex h-16 w-16 md:h-[4.5rem] md:w-[4.5rem] items-center justify-center rounded-full bg-[#D55B5B]'
          }
          style={{ boxShadow: '0 4px 0 0 #934646' }}
        >
          <Home className={compact ? 'h-6 w-6 text-white' : 'h-7 w-7 text-white'} strokeWidth={2.5} aria-hidden />
        </button>
      </div>
      <span className={cn('font-display font-semibold text-[#934646]', compact ? 'text-xs' : 'text-sm')}>Menu</span>
    </div>
  )
}