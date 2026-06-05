import { Home } from 'lucide-react'

type BotaoMenuProps = {
  onClick?: () => void
}

/* Botão físico nº5 — vermelho, volta ao menu principal. Tecla: 'm'. */
export function BotaoMenu({ onClick }: BotaoMenuProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Halo exterior com 50% opacidade */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{ padding: '8px', background: 'rgba(213, 91, 91, 0.5)' }}
      >
        {/* Círculo principal com sombra sólida */}
        <button
          onClick={onClick}
          aria-label="Voltar ao menu principal"
          className="relative flex h-16 w-16 md:h-[4.5rem] md:w-[4.5rem] items-center justify-center rounded-full bg-[#D55B5B]"
          style={{ boxShadow: '0 4px 0 0 #934646' }}
        >
          <Home className="h-7 w-7 text-white" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
      <span className="font-display text-sm font-semibold text-[#934646]">Menu</span>
    </div>
  )
}