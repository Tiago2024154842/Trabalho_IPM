'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { MissionCard } from '@/components/mission-card'
import { ButtonHint } from '@/components/button-hint'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'
import { ENTRADAS_MENU } from '@/lib/missoes'
import { totalDesbloqueadas, CONQUISTAS } from '@/lib/conquistas'

const ICONES: Record<string, React.ReactNode> = {
  xixi: <Image src="/herois/fazerxixi.png" alt="Fazer xixi" width={200} height={200} className="h-full w-full object-contain" />,
  coco: <Image src="/herois/fazercoco.png" alt="Fazer cocó" width={200} height={200} className="h-full w-full object-contain" />,
  maos: <Image src="/herois/lavar.png" alt="Lavar as mãos" width={200} height={200} className="h-full w-full object-contain" />,
  conquistas: <Image src="/herois/troféu.png" alt="Lavar as mãos" width={200} height={200} className="h-full w-full object-contain" />,
}

export default function MenuMissoes() {
  const [foco, setFoco] = useState(0)
  const router = useRouter()
  const { estrelas } = useEstrelas()

  const total = ENTRADAS_MENU.length

  function escolher() {
    router.push(ENTRADAS_MENU[foco].rota)
  }

  useBotoesFisicos({
    onAnterior:   () => setFoco(f => (f - 1 + total) % total),
    onSeguinte:   () => setFoco(f => (f + 1) % total),
    onEscolher:   escolher,
    onAjuda:      () => router.push('/ajuda'),
    onConquistas: () => router.push('/conquistas'),
  })

  const desbloqueadas = totalDesbloqueadas()
  const totalConquistas = CONQUISTAS.length

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#D2F1FF]">

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col py-5 px-8">

        <header className="flex w-full items-center justify-between shrink-0">
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5A7A95]">
              Escolher Missão
            </span>
            <h1 className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
              Missão Casa de Banho
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-5 py-2 shadow-sm"
            role="status" aria-label={`Estrelas: ${estrelas}`}>
            <StarIcon className="h-8 w-8" />
            <span className="font-display text-3xl font-bold text-ink">{estrelas}</span>
          </div>
        </header>

        <div className="text-center shrink-0 mt-2">
          <h2 className="font-display text-5xl font-bold text-[#2E4861] lg:text-6xl">O que vamos fazer?</h2>
          <p className="mt-2 font-display text-2xl text-[#436076]">Escolhe uma das opções e vamos a isso, Tiago!</p>
        </div>

        {/* Grelha 2x2 */}
        <section
          className="flex-1 min-h-0 grid grid-cols-2 grid-rows-2 gap-5 mt-4 pb-2 max-w-[780px] min-h-[400px] mx-auto w-full"
          aria-label="Missões"
        >
          {ENTRADAS_MENU.map((entrada, i) => (
            <button
              key={entrada.id}
              onClick={() => { setFoco(i); router.push(entrada.rota) }}
              className="min-h-0 focus:outline-none"
              aria-label={entrada.titulo}
            >
              <MissionCard
                title={entrada.titulo}
                illustration={ICONES[entrada.id]}
                plate={entrada.plate}
                number={i + 1}
                inFocus={foco === i}
                badge={entrada.id === 'conquistas' ? `${desbloqueadas}/${totalConquistas}` : undefined}
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
