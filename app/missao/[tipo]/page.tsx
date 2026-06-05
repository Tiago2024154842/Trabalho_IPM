'use client'

import { useState, use } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, HelpCircle, RotateCcw, Volume2 } from 'lucide-react'
import Image from 'next/image'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'
import { MISSOES, type TipoMissao } from '@/lib/missoes'
import { iniciarChamada, terminarChamada } from '@/lib/notificacoesAjuda'

const TOTAL_PASSOS = 6

function PontoProgresso({ ativo }: { ativo: boolean }) {
  return (
    <div className={[
      'h-5 w-5 rounded-full border-2 transition-all duration-200',
      ativo
        ? 'border-[#85CC97] bg-[#85CC97] scale-125 shadow-md'
        : 'border-[#BDD8EE] bg-white',
    ].join(' ')} aria-hidden="true" />
  )
}

export default function PassoMissao({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { estrelas } = useEstrelas()

  // Retoma o passo onde a criança estava se vier de /ajuda/enviado.
  const passoInicial = (() => {
    const p = parseInt(searchParams.get('p') ?? '', 10)
    return Number.isFinite(p) && p >= 0 && p < TOTAL_PASSOS ? p : 0
  })()
  const [passo, setPasso] = useState(passoInicial)

  const missao = MISSOES[tipo as TipoMissao]

  if (!missao) { router.replace('/missoes'); return null }

  const passoAtual = missao.passos[passo]
  const eUltimoPasso = passo === TOTAL_PASSOS - 1

  function avancar() {
    if (eUltimoPasso) {
      terminarChamada()
      router.push(`/missao/${tipo}/recompensa`)
    } else {
      setPasso(p => p + 1)
    }
  }

  function recuar() {
    if (passo === 0) router.push('/missoes')
    else setPasso(p => p - 1)
  }

  function pedirAjuda() {
    // Guarda a localização exata para poder retomar depois.
    iniciarChamada({
      tipo:        'indefinido', // placeholder; substituído quando a criança escolhe
      rotaOrigem:  `/missao/${tipo}`,
      passoOrigem: passo,
      inicio:      new Date(),
    })
    router.push('/ajuda')
  }

  function irParaMenu() {
    terminarChamada()
    router.push('/missoes')
  }

  useBotoesFisicos({ onEscolher: avancar, onAnterior: recuar, onAjuda: pedirAjuda, onMenu: irParaMenu })

  const tituloMissao = missao.titulo === 'Lavar as Mãos'
    ? `Como ${missao.titulo.toLowerCase()}?`
    : `Como fazer ${missao.titulo.toLowerCase()}?`

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#D2F1FF]">

      {/* Conteúdo — flex-1 não fica por baixo dos controlos */}
      <div className="flex flex-1 min-h-0 flex-col gap-6 px-10 py-6">

        {/* App Header — Missão Casa de Banho + estrelas */}
        <header className="flex w-full items-center justify-between shrink-0">
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5A7A95]">
              Missão: {missao.titulo}
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

        {/* Título + Progresso (centrado) */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <h2 className="font-display text-5xl font-bold text-[#2E4861] text-center">
            {tituloMissao}
          </h2>
          <div className="flex items-center gap-3"
            role="progressbar" aria-valuenow={passo + 1} aria-valuemax={TOTAL_PASSOS}>
            {Array.from({ length: TOTAL_PASSOS }).map((_, i) => (
              <PontoProgresso key={i} ativo={i === passo} />
            ))}
          </div>
          <p className="font-display text-lg text-[#436076]">
            Passo {passo + 1} de {TOTAL_PASSOS}
          </p>
        </div>

        {/* Área de 2 colunas: instrução + ilustração */}
        <div className="flex flex-1 min-h-0 items-center justify-center gap-16 w-full">
          {/* Coluna esquerda: cartão de instrução */}
          <div className="max-w-xl w-full relative">
            <div className="rounded-3xl bg-white/80 p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <p className="font-display text-5xl font-bold text-[#2E4861] leading-snug">
                  {passoAtual.instrucao}
                </p>
                <Volume2 className="h-10 w-10 text-[#5A7A95] shrink-0 mt-2" strokeWidth={2} aria-label="Ouvir instrução" />
              </div>
            </div>
            {/* Círculo laranja com número do passo */}
            <div className="absolute -bottom-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7A072] text-white font-display text-lg font-bold shadow-md">
              {passo + 1}
            </div>
          </div>

          {/* Coluna direita: ilustração do herói */}
          <Image
            src={passoAtual.imagem}
            alt="Herói"
            width={288}
            height={288}
            className="h-72 w-auto object-contain shrink-0 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Controlos — direita */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label={passo === 0 ? 'Início' : 'Anterior'}
          icon={<RotateCcw className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label={eUltimoPasso ? 'Terminar!' : 'Feito!'}
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Ajuda"
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <BotaoMenu onClick={irParaMenu} />
      </aside>
    </main>
  )
}
