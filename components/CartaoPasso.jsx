import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Cartão de opção baralhada (zona inferior do jogo).
 *
 * @param {{ instrucao: string, imagem: string, emFoco: boolean, onClick?: () => void, animacao?: 'shake'|'voo'|null, totalCartoes: number }} props
 */
export function CartaoPasso({ instrucao, imagem, emFoco, onClick, animacao, totalCartoes }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={instrucao}
      aria-current={emFoco ? 'true' : undefined}
      className={cn(
        'group relative flex flex-col items-center gap-2 rounded-2xl bg-white px-3 py-3 transition-all duration-300',
        'border-[4px] focus:outline-none w-40 md:w-48 shrink-0',
        emFoco
          ? 'border-coral -translate-y-1'
          : 'border-[#D4D0C7] hover:-translate-y-0.5',
        animacao === 'shake' && 'animate-shake',
        animacao === 'voo' && 'animate-voo',
      )}
      style={{
        height: '240px',
        boxShadow: emFoco
          ? '0 0 0 6px rgba(247, 160, 114, 0.25), 0 6px 0 0 rgba(228, 110, 110, 0.18)'
          : '0 4px 0 0 rgba(60, 80, 110, 0.08)',
      }}
    >
      {emFoco && (
        <div className="pointer-events-none absolute -top-4 inset-x-0 flex justify-center">
          <div className="rounded-full bg-coral px-3 py-1 shadow-md">
            <span className="font-display text-[10px] font-bold tracking-wider text-white uppercase whitespace-nowrap">
              ★ Escolhido!
            </span>
          </div>
        </div>
      )}

      <div className="flex h-28 w-full items-center justify-center rounded-xl bg-[#F5F5F5] p-2 md:h-32 shrink-0">
        <Image
          src={imagem}
          alt={instrucao}
          width={160}
          height={160}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex items-center justify-center flex-1 w-full">
        <span className="text-center font-display text-sm font-semibold leading-tight text-ink md:text-base">
          {instrucao}
        </span>
      </div>
    </button>
  )
}
