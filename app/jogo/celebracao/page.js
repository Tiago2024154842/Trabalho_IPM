'use client'

import { Suspense, useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'

function calcularEstrelasGanhas(erros) {
  if (erros === 0) return 3
  if (erros <= 2) return 2
  return 1
}

const MENSAGENS = {
  3: 'Perfeito! Nem um erro!',
  2: 'Muito bom! Quase perfeito!',
  1: 'Boa, conseguiste completar!',
}

/* Confetti / estrelinhas que caem do topo */
function Confetti() {
  const items = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${6 + Math.random() * 88}%`,
      delay: `${Math.random() * 2}s`,
      duration: `${3 + Math.random() * 2}s`,
      size: 6 + Math.random() * 10,
      cor: ['#FAC775', '#F7A072', '#85B7EB', '#7FB342'][i % 4],
      tipo: i % 3 === 0 ? 'circulo' : 'estrela',
    })),
  [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map(item => (
        <div
          key={item.id}
          className="absolute animate-confetti"
          style={{
            left: item.left,
            top: '-20px',
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          {item.tipo === 'circulo' ? (
            <div className="rounded-full" style={{
              width: item.size, height: item.size, backgroundColor: item.cor,
            }} />
          ) : (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24">
              <path
                d="M12 2.6 14.9 8.5 21.4 9.5 16.7 14.1 17.8 20.6 12 17.6 6.2 20.6 7.3 14.1 2.6 9.5 9.1 8.5z"
                fill={item.cor}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

export default function JogoCelebracaoPage() {
  return (
    <Suspense fallback={<div className="flex h-dvh items-center justify-center bg-gradient-to-b from-[#FFF8E1] to-[#E8F5E9]" />}>
      <JogoCelebracao />
    </Suspense>
  )
}

function JogoCelebracao() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const erros = parseInt(searchParams.get('erros') ?? '0', 10)
  const modo = searchParams.get('modo')
  const posMissao = modo === 'pos_missao'
  const estrelasGanhas = posMissao ? 2 : calcularEstrelasGanhas(erros)
  const { estrelas, atualizarEstrelas } = useEstrelas()

  const [foco, setFoco] = useState(0)
  const [estrelasContadas, setEstrelasContadas] = useState(false)

  /* Somar estrelas ao total global (uma só vez) */
  useEffect(() => {
    if (!estrelasContadas) {
      atualizarEstrelas(estrelasGanhas)
      setEstrelasContadas(true)
    }
  }, [estrelasContadas, estrelasGanhas, atualizarEstrelas])

  function confirmar() {
    if (posMissao) {
      router.push('/missoes')
    } else {
      if (foco === 0) router.push('/jogo/jogar')
      else router.push('/missoes')
    }
  }

  useBotoesFisicos({
    onAnterior: posMissao ? undefined : () => setFoco(f => (f + 1) % 2),
    onSeguinte: posMissao ? undefined : () => setFoco(f => (f + 1) % 2),
    onEscolher: confirmar,
    onMenu:     () => router.push('/missoes'),
  })

  return (
    <main className="relative flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#FFF8E1] to-[#E8F5E9]">

      <Confetti />

      <div className="relative z-10 flex flex-1 min-h-0 flex-col px-10 py-6">

        <header className="flex w-full items-center justify-between shrink-0">
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

        <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-5">

        {/* Herói em pose de vitória */}
        <Image
          src="/herois/heroi5.png"
          alt="Herói a celebrar"
          width={240}
          height={240}
          className="h-[180px] w-auto object-contain drop-shadow-lg animate-bounce-suave"
          priority
        />

        <h2 className="font-display text-5xl font-medium text-[#1A4F7A] text-center">
          {posMissao ? 'Boa! Completaste o Desafio do Herói!' : 'Conseguiste! Sabes a ordem toda!'}
        </h2>

        {/* Estrelas — só mostra as ganhas (sem cinzentas) no modo pós-missão */}
        <div className="flex items-center gap-4" role="status" aria-label={`${estrelasGanhas} estrelas`}>
          {posMissao ? (
            Array.from({ length: estrelasGanhas }).map((_, i) => (
              <div key={i} className="animate-estrela-in animate-estrela-brilho"
                style={{ animationDelay: `${i * 0.3}s` }}>
                <StarIcon className="h-20 w-20" />
              </div>
            ))
          ) : (
            [1, 2, 3].map(i => (
              <div key={i}
                className={`animate-estrela-in ${i <= estrelasGanhas ? 'animate-estrela-brilho' : ''}`}
                style={{ animationDelay: `${i * 0.3}s` }}>
                <StarIcon className="h-16 w-16"
                  style={i > estrelasGanhas ? { filter: 'grayscale(1) opacity(0.4)' } : undefined} />
              </div>
            ))
          )}
        </div>

        <p className="font-display text-xl text-[#5A7A95]">
          {posMissao ? 'Mais 2 estrelas para a tua coleção!' : MENSAGENS[estrelasGanhas]}
        </p>

        <p className="font-display text-base text-[#5A7A95]">
          Ganhaste {estrelasGanhas} {estrelasGanhas === 1 ? 'estrela' : 'estrelas'}! Total: {estrelas}
        </p>

        {/* Botões de ação */}
        {posMissao ? (
          <button onClick={confirmar}
            className="rounded-2xl px-12 py-4 font-display text-2xl font-bold text-white bg-[#7FB342] border-4 border-coral scale-105 shadow-lg transition-all"
            style={{ boxShadow: '0 0 0 6px rgba(247,160,114,0.25), 0 6px 0 0 #3B6D11' }}>
            Voltar ao menu
          </button>
        ) : (
          <div className="flex items-center gap-6 mt-2">
            <button onClick={() => { setFoco(0); router.push('/jogo/jogar') }}
              className={`rounded-2xl px-8 py-3 font-display text-xl font-bold text-white transition-all ${
                foco === 0
                  ? 'bg-[#85B7EB] border-4 border-coral scale-105 shadow-lg'
                  : 'bg-[#85B7EB] border-4 border-transparent shadow-md'
              }`}
              style={{ boxShadow: foco === 0
                ? '0 0 0 6px rgba(247,160,114,0.25), 0 5px 0 0 #185FA5'
                : '0 5px 0 0 #185FA5' }}>
              Jogar outra vez
            </button>
            <button onClick={() => { setFoco(1); router.push('/missoes') }}
              className={`rounded-2xl px-8 py-3 font-display text-xl font-bold text-white transition-all ${
                foco === 1
                  ? 'bg-[#7FB342] border-4 border-coral scale-105 shadow-lg'
                  : 'bg-[#7FB342] border-4 border-transparent shadow-md'
              }`}
              style={{ boxShadow: foco === 1
                ? '0 0 0 6px rgba(247,160,114,0.25), 0 5px 0 0 #3B6D11'
                : '0 5px 0 0 #3B6D11' }}>
              Voltar ao menu
            </button>
          </div>
        )}
        </div>
      </div>

      {/* Coluna de botões */}
      <aside className="relative z-10 flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior"
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="blue" label="Seguinte"
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label="Escolher"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Ajuda" disabled
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <BotaoMenu onClick={() => router.push('/missoes')} />
      </aside>
    </main>
  )
}
