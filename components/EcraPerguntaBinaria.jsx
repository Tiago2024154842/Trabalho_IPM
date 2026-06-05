'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'

/**
 * Ecrã reutilizável de pergunta com duas opções (Sim/Não, etc.).
 *
 * @param {{
 *   imagemHeroi: string,
 *   pergunta: string,
 *   subtitulo?: string,
 *   opcao1: { texto: string, icone: React.ReactNode, corIcone: string, onConfirmar: () => void },
 *   opcao2: { texto: string, icone: React.ReactNode, corIcone: string, onConfirmar: () => void },
 *   corFundo?: string,
 *   onMenu?: () => void,
 * }} props
 */
export function EcraPerguntaBinaria({
  imagemHeroi,
  pergunta,
  subtitulo,
  opcao1,
  opcao2,
  corFundo = 'bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9]',
  onMenu,
}) {
  const [foco, setFoco] = useState(0)
  const { estrelas } = useEstrelas()

  const opcoes = [opcao1, opcao2]

  const confirmar = useCallback(() => {
    opcoes[foco].onConfirmar()
  }, [foco, opcoes])

  useBotoesFisicos({
    onAnterior: () => setFoco(f => (f - 1 + 2) % 2),
    onSeguinte: () => setFoco(f => (f + 1) % 2),
    onEscolher: confirmar,
    onMenu,
  })

  return (
    <main className={`flex h-dvh w-full overflow-hidden ${corFundo}`}>

      <div className="flex flex-1 min-h-0 flex-col px-8 py-4">

        {/* Header consistente */}
        <header className="flex w-full items-center justify-between shrink-0">
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5A7A95]">
              Ajuda
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

        {/* Conteúdo centrado */}
        <div className="flex flex-1 min-h-0 flex-col items-center justify-center gap-5">

          {/* Herói com breathing pulse */}
          <div className="shrink-0 animate-breathing">
            <Image
              src={imagemHeroi}
              alt="Herói"
              width={220}
              height={220}
              className="h-[200px] w-auto object-contain drop-shadow-lg"
              priority
            />
          </div>

          {/* Pergunta */}
          <h2 className="font-display text-[44px] font-medium text-[#1A4F7A] text-center leading-tight">
            {pergunta}
          </h2>

          {/* Subtítulo */}
          {subtitulo && (
            <p className="font-display text-base text-[#5A7A95] italic text-center -mt-2">
              {subtitulo}
            </p>
          )}

          {/* Dois cartões lado a lado */}
          <div className="flex items-stretch justify-center gap-8 mt-2">
            {opcoes.map((opcao, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setFoco(i); opcao.onConfirmar() }}
                aria-label={opcao.texto}
                aria-current={foco === i ? 'true' : undefined}
                className={`
                  relative flex w-[240px] h-[140px] flex-col items-center justify-center gap-3
                  rounded-2xl bg-white transition-all duration-300 focus:outline-none
                  ${foco === i
                    ? 'border-[5px] border-coral -translate-y-1'
                    : 'border-2 border-[#D4D0C7] hover:-translate-y-0.5'
                  }
                `}
                style={{
                  boxShadow: foco === i
                    ? '0 0 0 8px rgba(247, 160, 114, 0.25), 0 8px 0 0 rgba(228, 110, 110, 0.18)'
                    : '0 6px 0 0 rgba(60, 80, 110, 0.08)',
                }}
              >
                {/* Badge "ESCOLHIDO!" */}
                {foco === i && (
                  <div className="pointer-events-none absolute -top-4 inset-x-0 flex justify-center">
                    <div className="rounded-full bg-coral px-4 py-1.5 shadow-md">
                      <span className="font-display text-xs font-bold tracking-wider text-white uppercase whitespace-nowrap">
                        ★ Escolhido!
                      </span>
                    </div>
                  </div>
                )}

                {/* Ícone */}
                <div className="flex h-14 w-14 items-center justify-center">
                  {opcao.icone}
                </div>

                {/* Texto */}
                <span className="font-display text-[22px] font-medium text-[#1A4F7A]">
                  {opcao.texto}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Coluna de botões físicos */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/30 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior"
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="blue" label="Seguinte"
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label="Escolher"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Ajuda" disabled
          icon={<span className="h-7 w-7 flex items-center justify-center text-lg font-bold opacity-50">h</span>} />
        {onMenu && <BotaoMenu onClick={onMenu} />}
      </aside>
    </main>
  )
}
