'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { Check, HelpCircle, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { ButtonHint } from '@/components/button-hint'
import { useBotoesFisicos } from '@/lib/teclado'
import { MISSOES, type TipoMissao } from '@/lib/missoes'

const TOTAL_PASSOS = 6

function PontoProgresso({ ativo, feito }: { ativo: boolean; feito: boolean }) {
  return (
    <div className={[
      'h-5 w-5 rounded-full border-2 transition-all duration-200',
      feito           ? 'border-[#85CC97] bg-[#85CC97]' : '',
      ativo           ? 'border-coral bg-white scale-125 shadow-md' : '',
      !ativo && !feito ? 'border-[#BDD8EE] bg-white/70' : '',
    ].join(' ')} aria-hidden="true" />
  )
}

export default function PassoMissao({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = use(params)
  const router = useRouter()
  const [passo, setPasso] = useState(0)

  const missao = MISSOES[tipo as TipoMissao]

  if (!missao) { router.replace('/missoes'); return null }

  const passoAtual = missao.passos[passo]
  const eUltimoPasso = passo === TOTAL_PASSOS - 1

  function avancar() {
    if (eUltimoPasso) router.push(`/missao/${tipo}/recompensa`)
    else setPasso(p => p + 1)
  }

  function recuar() {
    if (passo === 0) router.push('/missoes')
    else setPasso(p => p - 1)
  }

  useBotoesFisicos({ onEscolher: avancar, onAnterior: recuar, onAjuda: () => router.push('/ajuda') })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#D2F1FF]">

      {/* Conteúdo — flex-1 não fica por baixo dos controlos */}
      <div className="flex flex-1 flex-col items-center gap-6 px-10 py-6">

        <header className="flex w-full flex-col items-center gap-3">
          <p className="font-display text-2xl font-bold text-[#436076]">
            Missão: <span className="text-[#2E4861]">{missao.titulo}</span>
          </p>
          <div className="flex items-center gap-3"
            role="progressbar" aria-valuenow={passo + 1} aria-valuemax={TOTAL_PASSOS}>
            {Array.from({ length: TOTAL_PASSOS }).map((_, i) => (
              <PontoProgresso key={i} ativo={i === passo} feito={i < passo} />
            ))}
          </div>
          <p className="font-display text-lg text-[#436076]">
            Passo {passo + 1} de {TOTAL_PASSOS}
          </p>
        </header>

        <div className="flex flex-1 items-center justify-center gap-12 w-full">
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="rounded-3xl bg-white/80 px-10 py-8 shadow-sm">
              <p className="font-display text-5xl font-bold text-[#2E4861] leading-snug">
                {passoAtual.instrucao}
              </p>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-coral/20 font-display text-2xl font-bold text-coral">
              {passo + 1}
            </div>
          </div>

          <Image src={passoAtual.imagem} alt="Herói" width={288} height={288} className="h-72 w-auto object-contain shrink-0 drop-shadow-lg" />
        </div>
      </div>

      {/* Controlos — direita */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label={passo === 0 ? 'Menu' : 'Anterior'}
          icon={<RotateCcw className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label={eUltimoPasso ? 'Terminar!' : 'Feito!'}
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Ajuda"
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
      </aside>
    </main>
  )
}
