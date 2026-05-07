'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { MissionCard } from '@/components/mission-card'
import { ButtonHint } from '@/components/button-hint'
import { StarIcon, PeeIcon, PoopIcon, WashHandsIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { LISTA_MISSOES } from '@/lib/missoes'

const ICONES = {
  xixi: <PeeIcon className="h-full w-full" />,
  coco: <PoopIcon className="h-full w-full" />,
  maos: <WashHandsIcon className="h-full w-full" />,
}

export default function MenuMissoes() {
  const [foco, setFoco] = useState(0)
  const router = useRouter()

  function irParaMissao() {
    router.push(`/missao/${LISTA_MISSOES[foco].tipo}`)
  }

  useBotoesFisicos({
    onAnterior: () => setFoco(f => Math.max(0, f - 1)),
    onSeguinte: () => setFoco(f => Math.min(LISTA_MISSOES.length - 1, f + 1)),
    onEscolher: irParaMissao,
    onAjuda:    () => router.push('/ajuda'),
  })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#D2F1FF]">

      {/* Conteúdo — flex-1 não fica por baixo dos controlos */}
      <div className="flex flex-1 flex-col items-center justify-between py-6 px-10">

        <header className="flex w-full items-center justify-between">
          <h1 className="font-display text-3xl font-bold text-[#2E4861]">Missão Casa de Banho</h1>
          <div className="flex items-center gap-2 rounded-2xl bg-white/60 px-5 py-2 shadow-sm"
            role="status" aria-label="Estrelas conquistadas: 0">
            <StarIcon className="h-8 w-8" />
            <span className="font-display text-3xl font-bold text-[#2E4861]">0</span>
          </div>
        </header>

        <div className="text-center">
          <h2 className="font-display text-6xl font-bold text-[#2E4861]">O que vamos fazer?</h2>
          <p className="mt-2 font-display text-2xl text-[#436076]">Escolhe uma missão.</p>
        </div>

        <section className="flex items-end justify-center gap-10 w-full pb-4" aria-label="Missões">
          {LISTA_MISSOES.map((missao, i) => (
            <button key={missao.tipo}
              onClick={() => { setFoco(i); router.push(`/missao/${missao.tipo}`) }}
              className="w-60 h-80 shrink-0 focus:outline-none"
              aria-label={`Missão ${missao.titulo}`}>
              <MissionCard
                title={missao.titulo}
                illustration={ICONES[missao.tipo]}
                plate={missao.plate}
                number={i + 1}
                inFocus={foco === i}
              />
            </button>
          ))}
        </section>
      </div>

      {/* Controlos — direita */}
      <aside className="relative z-10 flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior"
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="blue" label="Seguinte"
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label="Escolher"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Ajuda"
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
      </aside>
    </main>
  )
}
