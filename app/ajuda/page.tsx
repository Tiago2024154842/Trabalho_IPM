'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { CartaoAjuda } from '@/components/CartaoAjuda'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'
import {
  enviarNotificacaoAjuda,
  obterChamada,
  iniciarChamada,
} from '@/lib/notificacoesAjuda'
import { MISSOES, type TipoMissao } from '@/lib/missoes'

const OPCOES_AJUDA = [
  { id: 'sujei',   titulo: 'Sujei-me',            imagem: '/herois/heroi1.png', corPlaca: '#E8F5E9', acao: 'demo', tipoDemo: 'naoseicomosefaz' },
  { id: 'adulto',  titulo: 'Preciso de um Adulto', imagem: '/herois/heroi1.png', corPlaca: '#FCE4EC', acao: 'adulto' },
  { id: 'maos',    titulo: 'Lavar as mãos…',       imagem: '/herois/lavar.png', corPlaca: '#E3F2FD', acao: 'demo', tipoDemo: 'naoseicomosefaz' },
  { id: 'barriga', titulo: 'Doi-me a barriga',     imagem: '/herois/heroi1.png', corPlaca: '#FFF8DC', acao: 'demo', tipoDemo: 'barriga' },
  { id: 'papel',   titulo: 'Papel Higiénico…',     imagem: '/herois/heroi6.png', corPlaca: '#F3E5F5', acao: 'demo', tipoDemo: 'papelcaiu' },
]

const NOME_CRIANCA_DEFAULT = 'Tiago'

export default function EcraAjuda() {
  const router = useRouter()
  const [foco, setFoco] = useState(0)
  const { estrelas } = useEstrelas()

  function avancar()  { setFoco(f => (f + 1) % OPCOES_AJUDA.length) }
  function recuar()   { setFoco(f => (f - 1 + OPCOES_AJUDA.length) % OPCOES_AJUDA.length) }

  function confirmarOpcao(indice: number) {
    const opcao = OPCOES_AJUDA[indice]
    const chamada = obterChamada()

    if (opcao.acao === 'demo') {
      router.push(`/ajuda/demo?tipo=${opcao.tipoDemo}`)
      return
    }

    // Tipo B — chama adulto
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

  useBotoesFisicos({
    onAnterior: recuar,
    onSeguinte: avancar,
    onEscolher: () => confirmarOpcao(foco),
    onMenu:     () => router.push('/missoes'),
  })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#FFFAE5] to-[#FFF4D1]">

      <div className="flex flex-1 min-h-0 flex-col gap-4 px-8 py-4">

        {/* Header com AJUDA + estrelas */}
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

        {/* Título central */}
        <div className="flex flex-col items-center gap-0.5 text-center shrink-0">
          <h2 className="font-display text-5xl font-bold leading-tight text-[#1A4F7A] md:text-6xl">
            O que aconteceu?
          </h2>
          <p className="font-display text-lg text-[#5A7A95] md:text-xl">
            Diz me o que se passa. Eu posso ajudar-te!
          </p>
        </div>

        {/* Grid 2x3: 5 cartões + mascote (herói na linha 2, coluna 2) */}
        <section className="grid grid-cols-3 grid-rows-2 gap-4 flex-1 min-h-0 px-2"
          aria-label="Opções de ajuda">
          {/* Linha 1: posições 0, 1, 2 */}
          {OPCOES_AJUDA.slice(0, 3).map((opcao, i) => (
            <CartaoAjuda
              key={opcao.id}
              titulo={opcao.titulo}
              pictograma={
                <Image src={opcao.imagem} alt="" width={600} height={600}
                  className="h-full w-full object-contain" />
              }
              corPlaca={opcao.corPlaca}
              emFoco={foco === i}
              ariaLabel={opcao.titulo}
              onClick={() => { setFoco(i); confirmarOpcao(i) }}
            />
          ))}
          {/* Linha 2, col 1: cartão 3 (barriga) */}
          <CartaoAjuda
            key={OPCOES_AJUDA[3].id}
            titulo={OPCOES_AJUDA[3].titulo}
            pictograma={
              <Image src={OPCOES_AJUDA[3].imagem} alt="" width={160} height={160}
                className="h-full w-full object-contain" />
            }
            corPlaca={OPCOES_AJUDA[3].corPlaca}
            emFoco={foco === 3}
            ariaLabel={OPCOES_AJUDA[3].titulo}
            onClick={() => { setFoco(3); confirmarOpcao(3) }}
          />
          {/* Linha 2, col 2: mascote herói — grande, pernas saem por baixo */}
          <div className="relative flex items-start justify-center overflow-visible">
            <Image src="/herois/ideia.png" alt="Mascote" width={700} height={700}
              className="w-auto h-[210%] object-contain -mt-12 pointer-events-none" />
          </div>
          {/* Linha 2, col 3: cartão 4 (papel) */}
          <CartaoAjuda
            key={OPCOES_AJUDA[4].id}
            titulo={OPCOES_AJUDA[4].titulo}
            pictograma={
              <Image src={OPCOES_AJUDA[4].imagem} alt="" width={160} height={160}
                className="h-full w-full object-contain" />
            }
            corPlaca={OPCOES_AJUDA[4].corPlaca}
            emFoco={foco === 4}
            ariaLabel={OPCOES_AJUDA[4].titulo}
            onClick={() => { setFoco(4); confirmarOpcao(4) }}
          />
        </section>
      </div>

      {/* Sidebar com 4 botões (sem Ajuda — já estamos nela) */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/30 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior"
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="blue" label="Seguinte"
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label="Escolher"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <BotaoMenu onClick={() => router.push('/missoes')} />
      </aside>
    </main>
  )
}
