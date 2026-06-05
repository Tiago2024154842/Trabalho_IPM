'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import heroi from '@/public/herois/heroi5.png'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'
import { MISSOES, type TipoMissao } from '@/lib/missoes'
import { terminarChamada } from '@/lib/notificacoesAjuda'

const ESTRELAS_POR_MISSAO: Record<TipoMissao, number> = {
  xixi: 3,
  coco: 4,
  maos: 3,
}

export default function Recompensa({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = use(params)
  const router = useRouter()
  const { estrelas } = useEstrelas()

  const missao = MISSOES[tipo as TipoMissao]
  const estrelasGanhas = ESTRELAS_POR_MISSAO[tipo as TipoMissao] ?? 3

  const [fase, setFase] = useState('recompensa') // 'recompensa' | 'convite'
  const [focoConvite, setFocoConvite] = useState(0) // 0 = Sim, 1 = Não

  function voltarAoMenu() { terminarChamada(); router.push('/missoes') }

  function irParaJogo() { router.push(`/jogo/jogar?tipo=${tipo}&modo=pos_missao`) }

  useBotoesFisicos({
    onEscolher: () => {
      if (fase === 'recompensa') setFase('convite')
      else if (focoConvite === 0) irParaJogo()
      else voltarAoMenu()
    },
    onAnterior: () => {
      if (fase === 'convite') setFocoConvite(f => (f + 1) % 2)
    },
    onSeguinte: () => {
      if (fase === 'convite') setFocoConvite(f => (f + 1) % 2)
    },
    onMenu: voltarAoMenu,
  })

  /* ─── Ecrã de Recompensa ─── */
  if (fase === 'recompensa') {
    return (
      <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#D2F1FF]">
        <div className="flex flex-1 min-h-0 flex-col px-10 py-6">
          <header className="flex w-full items-center justify-between shrink-0">
            <div className="flex flex-col">
              <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5A7A95]">
                Recompensa
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

          <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-6">
            <h1 className="font-display text-8xl font-bold text-[#2E4861] text-center leading-tight">
              Parabéns! 🎉
            </h1>

            {missao && (
              <p className="font-display text-3xl text-[#436076] text-center">
                Completaste a missão{' '}
                <span className="font-bold text-[#2E4861]">{missao.titulo}</span>!
              </p>
            )}

            <div className="flex items-center gap-3 rounded-3xl bg-white/70 px-8 py-4 shadow-sm"
              role="status" aria-label={`Ganhaste ${estrelasGanhas} estrelas`}>
              {Array.from({ length: estrelasGanhas }).map((_, i) => (
                <StarIcon key={i} className="h-14 w-14" />
              ))}
              <span className="ml-3 font-display text-5xl font-bold text-[#2E4861]">+{estrelasGanhas}</span>
            </div>

            <Image src={heroi} alt="Herói a celebrar" className="h-64 w-auto object-contain drop-shadow-lg" />

            <button onClick={() => setFase('convite')}
              className="flex items-center gap-3 rounded-3xl border-4 border-coral bg-[#85CC97] px-12 py-4 shadow-[0_5px_0_0_#4E9966] transition-transform active:translate-y-1 active:shadow-none"
              aria-label="Continuar">
              <span className="font-display text-3xl font-bold text-white">Continuar</span>
            </button>
          </div>
        </div>

        <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
          <ButtonHint tone="green" emphasis label="Continuar"
            icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
          <BotaoMenu onClick={voltarAoMenu} />
        </aside>
      </main>
    )
  }

  /* ─── Ecrã de Convite ─── */
  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#D2F1FF]">
      <div className="flex flex-1 min-h-0 flex-col px-10 py-6">
        <header className="flex w-full items-center justify-between shrink-0">
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5A7A95]">
              Desafio Extra
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

        <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-8">
          <Image
            src="/herois/heroi1.png"
            alt="Herói do desafio"
            width={220}
            height={220}
            className="h-[180px] w-auto object-contain drop-shadow-lg animate-breathing"
          />

          <h2 className="font-display text-5xl font-medium text-[#1A4F7A] text-center leading-tight">
            Queres jogar o Desafio do Herói?
          </h2>

          <p className="font-display text-2xl text-[#5A7A95]">
            Ganha mais <span className="font-bold text-[#FAC775]">2 estrelas</span>!
          </p>

          <div className="flex items-center gap-8 mt-4">
            <button
              onClick={irParaJogo}
              className={`rounded-2xl px-12 py-4 font-display text-2xl font-bold text-white transition-all ${
                focoConvite === 0
                  ? 'bg-[#85CC97] border-4 border-coral scale-105 shadow-lg'
                  : 'bg-[#85CC97] border-4 border-transparent shadow-md'
              }`}
              style={{ boxShadow: focoConvite === 0
                ? '0 0 0 6px rgba(247,160,114,0.25), 0 6px 0 0 #4E9966'
                : '0 6px 0 0 #4E9966' }}
            >
              Sim!
            </button>
            <button
              onClick={voltarAoMenu}
              className={`rounded-2xl px-12 py-4 font-display text-2xl font-bold text-white transition-all ${
                focoConvite === 1
                  ? 'bg-[#D55B5B] border-4 border-coral scale-105 shadow-lg'
                  : 'bg-[#D55B5B] border-4 border-transparent shadow-md'
              }`}
              style={{ boxShadow: focoConvite === 1
                ? '0 0 0 6px rgba(247,160,114,0.25), 0 6px 0 0 #934646'
                : '0 6px 0 0 #934646' }}
            >
              Não
            </button>
          </div>
        </div>
      </div>

      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior"
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="blue" label="Seguinte"
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label="Escolher"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Ajuda" disabled
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <BotaoMenu onClick={voltarAoMenu} />
      </aside>
    </main>
  )
}
