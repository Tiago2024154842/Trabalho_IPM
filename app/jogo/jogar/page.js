'use client'

import { Suspense, useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { StarIcon } from '@/components/mission-icons'
import { CaixaDestino } from '@/components/CaixaDestino'
import { CartaoPasso } from '@/components/CartaoPasso'
import { BarraProgressoJogo } from '@/components/BarraProgressoJogo'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'
import {
  NIVEIS, NIVEL_DEFAULT, baralhar, perguntaRonda,
  FRASES_ACERTO, FRASES_ERRO,
} from '@/lib/jogoDados'
import { MISSOES } from '@/lib/missoes'

/* Fases do jogo */
const FASE = { PRIMING: 'priming', COUNTDOWN: 'countdown', JOGO: 'jogo', PAUSA: 'pausa' }

export default function JogoAtivoWrapper() {
  return (
    <Suspense fallback={<div className="flex h-dvh items-center justify-center bg-gradient-to-b from-[#E8F4FA] to-[#B8DCEB]" />}>
      <JogoAtivo />
    </Suspense>
  )
}

function JogoAtivo() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { estrelas } = useEstrelas()

  // Se vier de ?tipo=xixi (pós-missão), usar os passos da missão em vez do nível default
  const tipoMissao = searchParams.get('tipo')
  const modo = searchParams.get('modo') // 'pos_missao' | null
  const passos = tipoMissao && MISSOES[tipoMissao]
    ? MISSOES[tipoMissao].passos.slice(0, 3)
    : NIVEIS[NIVEL_DEFAULT].passos

  /* Estado do jogo */
  const [fase, setFase] = useState(FASE.PRIMING)
  const [countdown, setCountdown] = useState(3)
  const [passosColocados, setPassosColocados] = useState([])           // índices dos passos corretos já colocados
  const [passosBaralhados, setPassosBaralhados] = useState([])         // passos ainda disponíveis (baralhados)
  const [focoAtual, setFocoAtual] = useState(0)
  const [errosTotal, setErrosTotal] = useState(0)
  const [feedback, setFeedback] = useState(null)                       // { tipo: 'acerto'|'erro', frase, indiceCartao }
  const [dicaAtiva, setDicaAtiva] = useState(false)
  const [confirmarSair, setConfirmarSair] = useState(false)
  const [focoSair, setFocoSair] = useState(0)                         // 0 = Não, 1 = Sim
  const bloqueado = useRef(false)

  const rondaAtual = passosColocados.length + 1
  const totalRondas = passos.length

  /* Inicializar passos baralhados */
  useEffect(() => {
    setPassosBaralhados(baralhar(passos.map((p, i) => ({ ...p, indiceOriginal: i }))))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /* Fase de priming: mostra a sequência correta durante 3s */
  useEffect(() => {
    if (fase !== FASE.PRIMING) return
    const t = setTimeout(() => setFase(FASE.COUNTDOWN), 3000)
    return () => clearTimeout(t)
  }, [fase])

  /* Countdown 3-2-1 antes de baralhar */
  useEffect(() => {
    if (fase !== FASE.COUNTDOWN) return
    if (countdown <= 0) { setFase(FASE.JOGO); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [fase, countdown])

  /* Se resta apenas 1 cartão, colocar automaticamente */
  useEffect(() => {
    if (fase !== FASE.JOGO) return
    if (passosBaralhados.length === 1 && passosColocados.length === totalRondas - 1) {
      bloqueado.current = true
      const ultimo = passosBaralhados[0]
      setTimeout(() => {
        setPassosColocados(prev => [...prev, ultimo.indiceOriginal])
        setPassosBaralhados([])
        // Navegar para celebração
        setTimeout(() => {
          const params = new URLSearchParams({ erros: errosTotal })
          if (modo) params.set('modo', modo)
          if (tipoMissao) params.set('tipo', tipoMissao)
          router.push(`/jogo/celebracao?${params.toString()}`)
        }, 1000)
      }, 500)
    }
  }, [passosBaralhados, passosColocados, fase, totalRondas, router, errosTotal])

  /* Frase aleatória de reforço */
  function fraseAleatoria(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  /* Confirmar cartão selecionado */
  const confirmarCartao = useCallback((indice) => {
    if (bloqueado.current || fase !== FASE.JOGO || passosBaralhados.length === 0) return
    bloqueado.current = true

    const idx = indice ?? focoAtual
    const cartao = passosBaralhados[idx]
    const indiceCorreto = passosColocados.length  // qual passo esperamos

    if (cartao.indiceOriginal === indiceCorreto) {
      // ACERTO
      setFeedback({ tipo: 'acerto', frase: fraseAleatoria(FRASES_ACERTO), indiceCartao: idx })
      setTimeout(() => {
        setPassosColocados(prev => [...prev, cartao.indiceOriginal])
        setPassosBaralhados(prev => prev.filter((_, i) => i !== idx))
        setFocoAtual(0)
        setFeedback(null)
        bloqueado.current = false
      }, 1200)
    } else {
      // ERRO
      setErrosTotal(e => e + 1)
      setFeedback({ tipo: 'erro', frase: fraseAleatoria(FRASES_ERRO), indiceCartao: idx })
      setTimeout(() => {
        setFeedback(null)
        bloqueado.current = false
      }, 1000)
    }
  }, [fase, focoAtual, passosBaralhados, passosColocados])

  /* Dica: pisca o cartão correto */
  const mostrarDica = useCallback(() => {
    if (fase !== FASE.JOGO || dicaAtiva) return
    setDicaAtiva(true)
    setTimeout(() => setDicaAtiva(false), 1200)
  }, [fase, dicaAtiva])

  /* Navegação de foco */
  const moverFocoEsquerda = useCallback(() => {
    if (confirmarSair) { setFocoSair(f => (f + 1) % 2); return }
    if (fase !== FASE.JOGO || passosBaralhados.length === 0) return
    setFocoAtual(f => (f - 1 + passosBaralhados.length) % passosBaralhados.length)
  }, [fase, passosBaralhados.length, confirmarSair])

  const moverFocoDireita = useCallback(() => {
    if (confirmarSair) { setFocoSair(f => (f + 1) % 2); return }
    if (fase !== FASE.JOGO || passosBaralhados.length === 0) return
    setFocoAtual(f => (f + 1) % passosBaralhados.length)
  }, [fase, passosBaralhados.length, confirmarSair])

  const handleEscolher = useCallback(() => {
    if (confirmarSair) {
      if (focoSair === 1) router.push('/missoes')
      else setConfirmarSair(false)
      return
    }
    confirmarCartao()
  }, [confirmarSair, focoSair, router, confirmarCartao])

  const handleMenu = useCallback(() => {
    if (confirmarSair) {
      setConfirmarSair(false)
      return
    }
    if (fase === FASE.JOGO) {
      setConfirmarSair(true)
      setFocoSair(0)
    } else {
      router.push('/missoes')
    }
  }, [confirmarSair, fase, router])

  useBotoesFisicos({
    onAnterior: moverFocoEsquerda,
    onSeguinte: moverFocoDireita,
    onEscolher: handleEscolher,
    onAjuda:    mostrarDica,
    onMenu:     handleMenu,
  })

  /* Índice do passo correto entre os baralhados (para dica) */
  const indiceCorretoNosBaralhados = passosBaralhados.findIndex(
    p => p.indiceOriginal === passosColocados.length
  )

  /* ─── RENDERIZAÇÃO ─── */

  /* Modal de confirmação de saída */
  if (confirmarSair) {
    return (
      <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#B8DCEB]">
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10">
          <h2 className="font-display text-4xl font-medium text-[#1A4F7A] text-center">
            Queres mesmo sair?
          </h2>
          <p className="font-display text-xl text-[#5A7A95]">
            O progresso do jogo será perdido.
          </p>
          <div className="flex gap-6 mt-4">
            <button
              onClick={() => setConfirmarSair(false)}
              className={`rounded-2xl px-10 py-3 font-display text-xl font-bold text-white transition-all ${
                focoSair === 0
                  ? 'bg-[#85B7EB] border-4 border-coral scale-105'
                  : 'bg-[#85B7EB] border-4 border-transparent'
              }`}
              style={{ boxShadow: focoSair === 0
                ? '0 0 0 6px rgba(247,160,114,0.25), 0 5px 0 0 #185FA5'
                : '0 5px 0 0 #185FA5' }}
            >
              Não, continuar
            </button>
            <button
              onClick={() => router.push('/missoes')}
              className={`rounded-2xl px-10 py-3 font-display text-xl font-bold text-white transition-all ${
                focoSair === 1
                  ? 'bg-[#D55B5B] border-4 border-coral scale-105'
                  : 'bg-[#D55B5B] border-4 border-transparent'
              }`}
              style={{ boxShadow: focoSair === 1
                ? '0 0 0 6px rgba(247,160,114,0.25), 0 5px 0 0 #934646'
                : '0 5px 0 0 #934646' }}
            >
              Sim, sair
            </button>
          </div>
        </div>
        <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-4 border-l border-white/30 bg-white/20 py-5 backdrop-blur-sm">
          <ButtonHint compact tone="blue" label="Anterior"
            icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
          <ButtonHint compact tone="blue" label="Seguinte"
            icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
          <ButtonHint compact tone="green" emphasis label="Escolher"
            icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
          <ButtonHint compact tone="yellow" label="Ajuda" disabled
            icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
          <BotaoMenu compact onClick={handleMenu} />
        </aside>
      </main>
    )
  }

  /* Priming: mostra a sequência correta */
  if (fase === FASE.PRIMING || fase === FASE.COUNTDOWN) {
    return (
      <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#B8DCEB]">
        <div className="flex flex-1 min-h-0 flex-col px-8 py-4">

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

          <div className="flex flex-1 flex-col items-center justify-center gap-6 relative">

          <h2 className="font-display text-4xl font-medium text-[#1A4F7A]">
            Memoriza a ordem...
          </h2>

          {/* Caixas com imagens preenchidas */}
          <div className="flex items-start justify-center gap-8" role="list">
            {passos.map((p, i) => (
              <div key={i} className={`flex flex-col items-center gap-0 transition-all duration-700 ${
                fase === FASE.COUNTDOWN ? 'opacity-0 translate-y-8' : 'opacity-100'
              }`}
                style={{ height: '320px', width: '200px' }}
              >
                <div className="flex h-48 w-48 md:h-52 md:w-52 items-center justify-center rounded-2xl border-[3px] border-[#7FB342] bg-[#E8F5E9] shrink-0">
                  <Image src={p.imagem} alt={p.instrucao} width={160} height={160}
                    className="h-full w-full object-contain p-3" />
                </div>
                <div className="flex items-start justify-center pt-1 flex-1 w-full">
                  <span className="font-display text-sm font-semibold text-[#5A7A95] text-center leading-tight px-1">
                    {i + 1}. {p.instrucao}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {fase === FASE.COUNTDOWN && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#E8F4FA]/60">
              <span className="font-display text-8xl font-bold text-[#5A7A95] animate-pulse-suave">
                {countdown > 0 ? countdown : ''}
              </span>
            </div>
          )}
          </div>
        </div>

        <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-4 border-l border-white/30 bg-white/20 py-5 backdrop-blur-sm">
          <ButtonHint compact tone="blue" label="Anterior" disabled
            icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
          <ButtonHint compact tone="blue" label="Seguinte" disabled
            icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
          <ButtonHint compact tone="green" emphasis label="Começar" disabled
            icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
          <ButtonHint compact tone="yellow" label="Ajuda" disabled
            icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
          <BotaoMenu compact onClick={() => router.push('/missoes')} />
        </aside>
      </main>
    )
  }

  /* Jogo ativo */
  return (
      <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#B8DCEB]">

        <div className="flex flex-1 min-h-0 flex-col gap-1 px-6 py-3">

          <header className="flex w-full items-center justify-between shrink-0">
            <div className="flex flex-col">
              <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5A7A95]">
                Jogo de Ordenação
              </span>
              <h1 className="font-display text-xl font-bold leading-tight text-ink md:text-2xl">
                Missão Casa de Banho
              </h1>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-1.5 shadow-sm"
              role="status" aria-label={`Estrelas: ${estrelas}`}>
              <StarIcon className="h-6 w-6" />
              <span className="font-display text-2xl font-bold text-ink">{estrelas}</span>
            </div>
          </header>

          {/* Barra de progresso */}
          <BarraProgressoJogo total={totalRondas} atual={rondaAtual} />

        {/* Zona superior: caixas destino */}
        <section className="flex items-center justify-center gap-4" role="list"
          aria-label="Caixas de destino">
          {passos.map((p, i) => {
            const preenchida = passosColocados.includes(i)
            const atual = i === passosColocados.length
            return (
              <CaixaDestino
                key={i}
                numero={i + 1}
                estado={preenchida ? 'preenchida' : atual ? 'atual' : 'vazia'}
                imagem={preenchida ? p.imagem : undefined}
                instrucao={preenchida ? p.instrucao : undefined}
                
              />
            )
          })}
        </section>

        {/* Pergunta da ronda */}
        <div className="flex items-center justify-center">
          <h2 className="font-display text-2xl font-medium text-[#1A4F7A] md:text-3xl">
            {perguntaRonda(rondaAtual)}
          </h2>
        </div>

        {/* Zona inferior: cartões baralhados */}
        <section
          className="flex flex-1 min-h-0 items-center justify-center gap-6"
          role="listbox"
          aria-label="Opções baralhadas"
        >
          {passosBaralhados.map((p, i) => (
            <CartaoPasso
              key={p.indiceOriginal}
              instrucao={p.instrucao}
              imagem={p.imagem}
              emFoco={focoAtual === i}
              onClick={() => { setFocoAtual(i); confirmarCartao(i) }}
              animacao={
                feedback?.indiceCartao === i
                  ? feedback.tipo === 'acerto' ? 'voo' : 'shake'
                  : dicaAtiva && i === indiceCorretoNosBaralhados ? 'pulse' : null
              }
            />
          ))}
        </section>

        {/* Balão de fala do herói (feedback) */}
        <div className="relative h-16 flex items-center justify-start px-4">
          {feedback && (
            <div className="flex items-center gap-3 animate-pulse-suave">
              <Image src="/herois/heroi1.png" alt="" width={56} height={56}
                className="h-14 w-auto object-contain" aria-hidden />
              <div className="rounded-2xl bg-white/90 px-6 py-3 shadow-sm">
                <span className="font-display text-xl font-semibold text-[#1A4F7A]">
                  {feedback.frase}
                </span>
              </div>
            </div>
          )}
          {dicaAtiva && !feedback && (
            <div className="flex items-center gap-3">
              <Image src="/herois/heroi1.png" alt="" width={56} height={56}
                className="h-14 w-auto object-contain" aria-hidden />
              <div className="rounded-2xl bg-[#FFF8DC] px-6 py-3 shadow-sm">
                <span className="font-display text-xl font-semibold text-[#854F0B]">
                  Olha bem para as caixas!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Coluna de botões */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-4 border-l border-white/30 bg-white/20 py-5 backdrop-blur-sm">
        <ButtonHint compact tone="blue" label="Anterior"
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint compact tone="blue" label="Seguinte"
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint compact tone="green" emphasis label="Escolher"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint compact tone="yellow" label="Dica"
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <BotaoMenu compact onClick={handleMenu} />
      </aside>
    </main>
  )
}
