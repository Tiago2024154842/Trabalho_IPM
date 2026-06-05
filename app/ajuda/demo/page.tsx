'use client'

import { Suspense, useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { HeaderAjuda } from '@/components/HeaderAjuda'
import { EcraPerguntaBinaria } from '@/components/EcraPerguntaBinaria'
import { useBotoesFisicos } from '@/lib/teclado'
import {
  obterChamada,
  iniciarChamada,
  enviarNotificacaoAjuda,
  terminarChamada,
} from '@/lib/notificacoesAjuda'
import { MISSOES, type TipoMissao } from '@/lib/missoes'
import { useNarracao } from '@/lib/sons'

/* ─── Definição dos passos de cada demonstração ─── */

interface PassoDemo {
  imagem: string
  texto: string
  /** Narração em /public/sons (sem extensão); opcional */
  som?: string
  /** Se true, mostra countdown 3-2-1 depois do texto */
  countdown?: boolean
}

type TipoDemo = 'naoseicomosefaz' | 'barriga' | 'papelcaiu'

/* Fallback caso a imagem específica não exista */
const HEROI_FALLBACK = '/herois/heroi1.png'

/* Título fixo do problema (em cima) — distinto do texto do passo (no cartão). */
const TITULO_DEMO: Record<TipoDemo, string> = {
  naoseicomosefaz: 'Não sei como se faz',
  barriga:         'Dói-me a barriga',
  papelcaiu:       'O papel caiu',
}

function obterPassosDemo(tipo: TipoDemo, chamada: ReturnType<typeof obterChamada>): PassoDemo[] {
  if (tipo === 'naoseicomosefaz') {
    // Repete o passo atual da missão — só 1 passo
    const tipoMissao = chamada?.rotaOrigem.split('/missao/')[1] as TipoMissao | undefined
    const missao = tipoMissao ? MISSOES[tipoMissao] : undefined
    const passoIdx = chamada?.passoOrigem ?? 0
    const passo = missao?.passos[passoIdx]
    return [{
      imagem: passo?.imagem ?? HEROI_FALLBACK,
      texto: passo?.instrucao ?? 'Vê como se faz!',
      som: passo?.som,
    }]
  }

  if (tipo === 'barriga') {
    return [
      { imagem: HEROI_FALLBACK, texto: 'Senta-te na sanita e espera um bocadinho.', som: 'espera_dor' },
      { imagem: HEROI_FALLBACK, texto: 'Faz festinhas na barriga e respira fundo.', som: 'festinhas' },
      { imagem: '/herois/heroi5.png', texto: 'Ainda dói? Vamos chamar a educadora.',  som: 'ainda_doi' },
    ]
  }

  // papelcaiu
  return [
    { imagem: HEROI_FALLBACK, texto: 'Apanha o papel',        som: 'apanha' },
    { imagem: HEROI_FALLBACK, texto: 'Põe no lixo',           som: 'poe_no_lixo' },
    { imagem: HEROI_FALLBACK, texto: 'Tira um bocadinho novo', som: 'tira_papel' },
  ]
}

const NOME_CRIANCA_DEFAULT = 'Tiago'

/* ─── Componente de countdown 3-2-1 ─── */
function Countdown({ onTerminar }: { onTerminar: () => void }) {
  const [valor, setValor] = useState(3)

  useEffect(() => {
    if (valor <= 0) { onTerminar(); return }
    const t = setTimeout(() => setValor(v => v - 1), 1000)
    return () => clearTimeout(t)
  }, [valor, onTerminar])

  if (valor <= 0) return null

  return (
    <div
      className="flex items-center justify-center"
      aria-live="assertive"
      aria-label={`${valor} segundos`}
    >
      <span
        className="font-display text-8xl font-bold text-[#5A7A95] animate-pulse-suave"
        style={{ transition: 'transform 0.3s ease' }}
      >
        {valor}
      </span>
    </div>
  )
}

/* ─── Ecrã principal ─── */
export default function EcraDemoPage() {
  return (
    <Suspense fallback={<div className="flex h-dvh items-center justify-center bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9]" />}>
      <EcraDemo />
    </Suspense>
  )
}

function EcraDemo() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tipo = (searchParams.get('tipo') ?? 'naoseicomosefaz') as TipoDemo
  const chamada = obterChamada()

  const passos = obterPassosDemo(tipo, chamada)

  const [passoAtual, setPassoAtual] = useState(0)
  const [countdownAtivo, setCountdownAtivo] = useState(false)
  const [countdownTerminou, setCountdownTerminou] = useState(false)
  // Fase final: 'pergunta' ou 'celebrar'
  const [faseFinal, setFaseFinal] = useState<'demo' | 'pergunta' | 'celebrar'>('demo')
  const [focoFinal, setFocoFinal] = useState(0) // 0 = Sim, 1 = Preciso de ajuda

  const passoObj = passos[passoAtual]
  const ultimoPasso = passoAtual >= passos.length - 1
  const temCountdown = passoObj?.countdown && !countdownTerminou

  const handleCountdownTerminar = useCallback(() => {
    setCountdownAtivo(false)
    setCountdownTerminou(true)
  }, [])

  /* Avançar para o próximo passo ou para a fase final */
  function avancar() {
    if (faseFinal === 'celebrar') return
    if (faseFinal === 'pergunta') {
      setFocoFinal(f => (f + 1) % 2)
      return
    }

    // Se tem countdown e ainda não começou, iniciar
    if (temCountdown && !countdownAtivo) {
      setCountdownAtivo(true)
      return
    }
    // Se countdown está ativo, não avançar
    if (countdownAtivo) return

    if (ultimoPasso) {
      // Ir para a fase "Conseguiste?"
      setFaseFinal('pergunta')
    } else {
      setPassoAtual(p => p + 1)
      setCountdownTerminou(false)
    }
  }

  function recuar() {
    if (faseFinal === 'pergunta') {
      setFocoFinal(f => (f - 1 + 2) % 2)
      return
    }
    if (faseFinal !== 'demo') return
    if (passoAtual > 0) {
      setPassoAtual(p => p - 1)
      setCountdownTerminou(false)
      setCountdownAtivo(false)
    }
  }

  function confirmar() {
    if (faseFinal === 'celebrar') {
      // Voltar à missão
      voltarAoPassoMissao()
      return
    }

    if (faseFinal === 'pergunta') {
      if (focoFinal === 0) {
        // "Sim!" — celebrar brevemente e voltar à missão
        setFaseFinal('celebrar')
        setTimeout(voltarAoPassoMissao, 1500)
      } else {
        // "Preciso de ajuda" — escalar para Tipo B
        escalarParaAdulto()
      }
      return
    }

    // Barriga: último passo chama a educadora
    if (tipo === 'barriga' && ultimoPasso) {
      router.push('/ajuda/chamar')
      return
    }

    // Na demo normal, avançar
    avancar()
  }

  function voltarAoPassoMissao() {
    if (chamada && chamada.rotaOrigem.startsWith('/missao/')) {
      router.replace(`${chamada.rotaOrigem}?p=${chamada.passoOrigem}`)
    } else {
      router.replace('/missoes')
    }
  }

  function escalarParaAdulto() {
    const tipoMissao = chamada?.rotaOrigem.split('/missao/')[1] as TipoMissao | undefined
    const missao = tipoMissao ? MISSOES[tipoMissao] : undefined
    const passoIdx = chamada?.passoOrigem ?? -1
    const rotuloPasso = missao && passoIdx >= 0 ? missao.passos[passoIdx]?.instrucao ?? '—' : '—'

    enviarNotificacaoAjuda('adulto', {
      nomeCrianca:  NOME_CRIANCA_DEFAULT,
      missaoAtual:  missao?.titulo ?? '—',
      passoAtual:   passoIdx >= 0 ? passoIdx + 1 : 0,
      totalPassos:  missao ? missao.passos.length : 0,
      rotuloPasso,
      timestamp:    new Date(),
    })

    iniciarChamada({
      tipo:         'adulto',
      rotaOrigem:   chamada?.rotaOrigem  ?? '/missoes',
      passoOrigem:  chamada?.passoOrigem ?? 0,
      inicio:       chamada?.inicio      ?? new Date(),
    })

    router.push('/ajuda/enviado?tipo=adulto')
  }

  function irParaMenu() {
    terminarChamada()
    router.replace('/missoes')
  }

  /* Quando faseFinal === 'pergunta', o EcraPerguntaBinaria gere os seus
   * próprios botões — desativamos os handlers do pai para evitar conflito. */
  const perguntaAtiva = faseFinal === 'pergunta'
  useBotoesFisicos({
    onAnterior: perguntaAtiva ? undefined : recuar,
    onSeguinte: perguntaAtiva ? undefined : avancar,
    onEscolher: perguntaAtiva ? undefined : confirmar,
    onMenu:     perguntaAtiva ? undefined : irParaMenu,
  })

  // Narração do passo demonstrado; se ficar parada, aos 30s lembra
  // "clica no botão verde para avançar".
  useNarracao(faseFinal === 'demo' ? passoObj?.som : undefined, `${faseFinal}-${passoAtual}`, 'avancar')

  /* ─── Renderização da fase "Conseguiste?" ─── */
  if (faseFinal === 'celebrar') {
    return (
      <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9]">
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <Image
            src="/herois/heroi5.png"
            alt="Herói a celebrar"
            width={300}
            height={300}
            className="h-[280px] w-auto object-contain drop-shadow-lg animate-breathing"
            priority
          />
          <h2 className="font-display text-5xl font-bold text-[#2E7D32]">
            Boa, conseguiste!
          </h2>
        </div>
      </main>
    )
  }

  if (faseFinal === 'pergunta') {
    return (
      <EcraPerguntaBinaria
        imagemHeroi="/herois/heroi1.png"
        pergunta="Conseguiste?"
        subtitulo="Se sim, boa! Se não, não faz mal."
        opcao1={{
          texto: 'Sim!',
          icone: (
            <svg viewBox="0 0 100 100" className="h-14 w-14" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="#C8E6C9" stroke="#4CAF50" strokeWidth="4" />
              <path d="M30 52 L44 66 L72 36" stroke="#2E7D32" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
          corIcone: '#7FB342',
          onConfirmar: () => { setFaseFinal('celebrar'); setTimeout(voltarAoPassoMissao, 1500) },
        }}
        opcao2={{
          texto: 'Preciso de ajuda',
          icone: (
            <svg viewBox="0 0 100 100" className="h-14 w-14" aria-hidden="true">
              <circle cx="50" cy="50" r="40" fill="#FCE4EC" stroke="#E91E63" strokeWidth="4" />
              {/* Mão aberta a acenar */}
              <path d="M50 28 C50 24 54 22 56 26 L58 38" stroke="#D55B5B" strokeWidth="3" fill="#F8BBD0" strokeLinecap="round" />
              <path d="M56 30 C56 26 60 24 62 28 L63 38" stroke="#D55B5B" strokeWidth="3" fill="#F8BBD0" strokeLinecap="round" />
              <path d="M44 30 C44 26 48 24 50 28 L50 40" stroke="#D55B5B" strokeWidth="3" fill="#F8BBD0" strokeLinecap="round" />
              <path d="M38 34 C38 30 42 28 44 32 L45 40" stroke="#D55B5B" strokeWidth="3" fill="#F8BBD0" strokeLinecap="round" />
              <path d="M36 42 Q36 56 50 60 Q64 56 64 42 L63 38 L58 38 L50 40 L45 40 Z" fill="#F8BBD0" stroke="#D55B5B" strokeWidth="3" strokeLinejoin="round" />
            </svg>
          ),
          corIcone: '#D55B5B',
          onConfirmar: escalarParaAdulto,
        }}
        corFundo="bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9]"
        onMenu={irParaMenu}
      />
    )
  }

  /* ─── Renderização do passo de demonstração ─── */
  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9]">

      <div className="flex flex-1 min-h-0 flex-col gap-6 px-8 py-4">

        <HeaderAjuda />

        {/* Título + Progresso (centrado) */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <h2 className="font-display text-5xl font-bold text-[#1A4F7A] text-center">
            {TITULO_DEMO[tipo]}
          </h2>
          <div className="flex items-center gap-3" aria-label={`Passo ${passoAtual + 1} de ${passos.length}`}>
            {passos.map((_, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-full border-2 transition-all duration-200 ${
                  i === passoAtual
                    ? 'border-[#85CC97] bg-[#85CC97] scale-125 shadow-md'
                    : 'border-[#BDD8EE] bg-white'
                }`}
              />
            ))}
          </div>
          <p className="font-display text-base text-[#436076]">
            Passo {passoAtual + 1} de {passos.length}
          </p>
        </div>

        {/* Área de 2 colunas: instrução + ilustração */}
        <div className="flex flex-1 min-h-0 items-center justify-center gap-16 w-full">
          {/* Coluna esquerda: cartão de instrução */}
          <div className="max-w-xl w-full relative">
            <div className="rounded-3xl bg-white/80 p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <p className="font-display text-4xl font-bold text-[#1A4F7A] leading-snug md:text-5xl">
                  {passoObj.texto}
                </p>
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10 text-[#5A7A95] shrink-0 mt-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Ouvir instrução"
                >
                  <path d="M11 5 6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>
            </div>
            {/* Círculo laranja com número do passo */}
            <div className="absolute -bottom-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7A072] text-white font-display text-lg font-bold shadow-md">
              {passoAtual + 1}
            </div>
          </div>

          {/* Coluna direita: ilustração do herói */}
          <Image
            src={passoObj.imagem}
            alt="Herói a demonstrar o passo"
            width={288}
            height={288}
            className="h-72 w-auto object-contain shrink-0 drop-shadow-lg"
            priority
          />
        </div>

        {/* Countdown (só para "medo do barulho", passo 2) */}
        {countdownAtivo && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#E8F5E9]/80 z-20">
            <Countdown onTerminar={handleCountdownTerminar} />
          </div>
        )}
        {temCountdown && !countdownAtivo && (
          <p className="text-center font-display text-lg text-[#5A7A95] italic">
            Carrega no verde para continuares.
          </p>
        )}
      </div>

      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/30 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior"
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />}
          disabled={passoAtual === 0 || (tipo === 'barriga' && ultimoPasso)}
        />
        <ButtonHint tone="blue" label="Seguinte"
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />}
          disabled={tipo === 'barriga' && ultimoPasso}
        />
        <ButtonHint tone="green" emphasis label={tipo === 'barriga' && ultimoPasso ? 'Chamar' : ultimoPasso ? 'Feito' : 'Seguinte'}
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <BotaoMenu onClick={irParaMenu} />
      </aside>
    </main>
  )
}
