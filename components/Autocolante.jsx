import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

/**
 * Autocolante do álbum de conquistas.
 *
 * @param {{
 *   nome: string,
 *   icone: string,
 *   cor: string,
 *   desbloqueado: boolean,
 *   emFoco: boolean,
 *   novo: boolean,
 *   onClick?: () => void,
 *   onAnimacaoTerminou?: () => void,
 * }} props
 */
export function Autocolante({ nome, icone, cor, desbloqueado, emFoco, novo, onClick, onAnimacaoTerminou }) {
  const [flipAtivo, setFlipAtivo] = useState(false)
  const [flipTerminou, setFlipTerminou] = useState(false)

  /* Animação de revelação para conquistas novas */
  useEffect(() => {
    if (novo && desbloqueado && !flipTerminou) {
      const t = setTimeout(() => setFlipAtivo(true), 500)
      return () => clearTimeout(t)
    }
  }, [novo, desbloqueado, flipTerminou])

  useEffect(() => {
    if (flipAtivo) {
      const t = setTimeout(() => {
        setFlipTerminou(true)
        setFlipAtivo(false)
        onAnimacaoTerminou?.()
      }, 800)
      return () => clearTimeout(t)
    }
  }, [flipAtivo, onAnimacaoTerminou])

  const mostrarDesbloqueado = desbloqueado && (!novo || flipTerminou)

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={desbloqueado ? `${nome} — conquistado` : `${nome} — por desbloquear`}
      aria-current={emFoco ? 'true' : undefined}
      className={cn(
        'relative flex flex-col items-center justify-center gap-2.5 rounded-2xl p-2 transition-all duration-300',
        'h-[190px] w-[190px] focus:outline-none',
        flipAtivo && 'animate-flip-reveal',
        mostrarDesbloqueado
          ? 'shadow-md'
          : 'border-[2px] border-dashed border-[#D4D0C7] bg-[#F5F5F5]',
        emFoco && mostrarDesbloqueado && 'border-[3px] border-solid border-coral scale-105',
        emFoco && !mostrarDesbloqueado && 'border-[3px] border-dashed border-coral scale-105',
      )}
      style={mostrarDesbloqueado ? {
        backgroundColor: cor,
        borderWidth: emFoco ? 3 : 2,
        borderStyle: 'solid',
        borderColor: emFoco ? 'var(--coral)' : darkenColor(cor),
      } : undefined}
    >
      {/* Ícone */}
      <span
        className={cn(
          'text-[42px] leading-none select-none transition-all',
          !mostrarDesbloqueado && 'grayscale opacity-40',
        )}
        aria-hidden
      >
        {icone}
      </span>

      {/* Nome */}
      <span className={cn(
        'text-center font-display text-[11px] font-medium leading-tight',
        mostrarDesbloqueado ? 'text-[#1A4F7A]' : 'text-[#BDBDBD]',
      )}>
        {nome}
      </span>

      {/* Mini-confetti para conquistas novas a revelar */}
      {flipAtivo && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${20 + i * 20}%`,
                top: '10%',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.5s',
              }}
            >
              <svg width={8} height={8} viewBox="0 0 24 24">
                <path
                  d="M12 2.6 14.9 8.5 21.4 9.5 16.7 14.1 17.8 20.6 12 17.6 6.2 20.6 7.3 14.1 2.6 9.5 9.1 8.5z"
                  fill={['#FAC775', '#F7A072', '#85B7EB', '#7FB342'][i]}
                />
              </svg>
            </div>
          ))}
        </div>
      )}
    </button>
  )
}

/* Escurece ligeiramente uma cor hex para usar como borda. */
function darkenColor(hex) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 30)
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 30)
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 30)
  return `rgb(${r}, ${g}, ${b})`
}
