'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'
import { NIVEIS, NIVEL_DEFAULT } from '@/lib/jogoDados'

export default function JogoIntro() {
  const router = useRouter()
  const { estrelas } = useEstrelas()
  const nivel = NIVEIS[NIVEL_DEFAULT]

  useBotoesFisicos({
    onEscolher: () => router.push('/jogo/jogar'),
    onMenu:     () => router.push('/missoes'),
  })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#B8DCEB]">

      <div className="flex flex-1 min-h-0 flex-col px-10 py-6">

        {/* Header */}
        <header className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5A7A95]">
              Jogo de Ordenação
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

        {/* Conteúdo central */}
        <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-5">

          <h2 className="font-display text-5xl font-medium leading-tight text-[#1A4F7A] text-center">
            Vamos pôr os passos por ordem?
          </h2>

          <p className="font-display text-xl text-[#5A7A95]">
            Mostra que sabes a ordem certa!
          </p>

          <Image
            src="/herois/heroi1.png"
            alt="Herói animado"
            width={260}
            height={260}
            className="h-[220px] w-auto object-contain drop-shadow-lg animate-breathing"
            priority
          />

          <div className="flex items-center gap-2 rounded-full px-5 py-2"
            style={{ backgroundColor: nivel.corBadge }}>
            <span className="font-display text-base font-semibold text-[#1A4F7A]">
              Nível: {nivel.nome} ({nivel.badge})
            </span>
          </div>

          <p className="font-display text-sm text-[#7FB342] font-semibold">
            Carrega no botão verde para começar
          </p>
        </div>
      </div>

      {/* Coluna de botões */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior" disabled
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="blue" label="Seguinte" disabled
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label="Começar"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Ajuda" disabled
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <BotaoMenu onClick={() => router.push('/missoes')} />
      </aside>
    </main>
  )
}
