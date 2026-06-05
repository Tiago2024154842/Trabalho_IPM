import Image from 'next/image'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Caixa numerada do topo do jogo de ordenação.
 * Três estados: 'vazia' | 'atual' | 'preenchida'.
 *
 * @param {{ numero: number, estado: 'vazia'|'atual'|'preenchida', imagem?: string, instrucao?: string, totalCaixas: number }} props
 */
export function CaixaDestino({ numero, estado, imagem, instrucao }) {
  return (
    <div
      role="listitem"
      aria-label={
        estado === 'preenchida'
          ? `Passo ${numero}: ${instrucao}`
          : `Passo ${numero}: por preencher`
      }
      className={cn(
        'relative flex flex-col items-center justify-center rounded-2xl transition-all duration-300',
        'h-32 w-32 md:h-36 md:w-36 shrink-0',
        estado === 'vazia' && 'border-[3px] border-dashed border-[#D4D0C7] bg-[#F0F0F0]',
        estado === 'atual' && 'border-[3px] border-coral bg-[#FFF5EE] animate-pulse-suave',
        estado === 'preenchida' && 'border-[3px] border-[#7FB342] bg-[#E8F5E9]',
      )}
    >
      {estado === 'preenchida' && imagem ? (
        <>
          <Image
            src={imagem}
            alt={instrucao ?? `Passo ${numero}`}
            width={120}
            height={120}
            className="h-[70%] w-auto object-contain"
          />
          <div className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#7FB342]">
            <Check className="h-4 w-4 text-white" strokeWidth={3} />
          </div>
        </>
      ) : (
        <span className={cn(
          'font-display text-2xl font-bold',
          estado === 'atual' ? 'text-coral' : 'text-[#D4D0C7]',
        )}>
          {numero}
        </span>
      )}
    </div>
  )
}
