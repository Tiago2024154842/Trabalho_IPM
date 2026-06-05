'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { HeaderAjuda } from '@/components/HeaderAjuda'
import { CartaoAjuda } from '@/components/CartaoAjuda'
import { useBotoesFisicos } from '@/lib/teclado'
import { PaperFallenIcon, PaperEmptyIcon } from '@/components/help-icons'
import {
  enviarNotificacaoAjuda,
  obterChamada,
  iniciarChamada,
} from '@/lib/notificacoesAjuda'
import { MISSOES, type TipoMissao } from '@/lib/missoes'

const NOME_CRIANCA_DEFAULT = 'Tiago'

interface OpcaoPapel {
  id: string
  titulo: string
  pictograma: React.ReactNode
  corPlaca: string
  ariaLabel: string
}

const OPCOES: OpcaoPapel[] = [
  {
    id: 'caiu',
    titulo: 'Caiu ao chão',
    pictograma: <PaperFallenIcon className="h-full w-full" />,
    corPlaca: '#FFF8DC',
    ariaLabel: 'O papel caiu ao chão',
  },
  {
    id: 'naoha',
    titulo: 'Não há papel',
    pictograma: <PaperEmptyIcon className="h-full w-full" />,
    corPlaca: '#FFF0E0',
    ariaLabel: 'Não há papel — preciso que tragam',
  },
]

export default function EcraPapel() {
  const router = useRouter()
  const [foco, setFoco] = useState(0)

  function avancar()  { setFoco(f => (f + 1) % OPCOES.length) }
  function recuar()   { setFoco(f => (f - 1 + OPCOES.length) % OPCOES.length) }

  function confirmarOpcao(indice: number) {
    const opcao = OPCOES[indice]

    if (opcao.id === 'caiu') {
      // Tipo A — demonstração guiada
      router.push('/ajuda/demo?tipo=papelcaiu')
      return
    }

    // Tipo B — não há papel, chama adulto
    const chamada = obterChamada()
    const tipoMissao = chamada?.rotaOrigem.split('/missao/')[1] as TipoMissao | undefined
    const missao = tipoMissao ? MISSOES[tipoMissao] : undefined
    const passoIdx = chamada?.passoOrigem ?? -1
    const rotuloPasso = missao && passoIdx >= 0 ? missao.passos[passoIdx]?.instrucao ?? '—' : '—'

    enviarNotificacaoAjuda('papelnaoh', {
      nomeCrianca:  NOME_CRIANCA_DEFAULT,
      missaoAtual:  missao?.titulo ?? '—',
      passoAtual:   passoIdx >= 0 ? passoIdx + 1 : 0,
      totalPassos:  missao ? missao.passos.length : 0,
      rotuloPasso,
      timestamp:    new Date(),
    })

    iniciarChamada({
      tipo:         'papelnaoh',
      rotaOrigem:   chamada?.rotaOrigem  ?? '/missoes',
      passoOrigem:  chamada?.passoOrigem ?? 0,
      inicio:       chamada?.inicio      ?? new Date(),
    })

    router.push('/ajuda/enviado?tipo=papel')
  }

  useBotoesFisicos({
    onAnterior: recuar,
    onSeguinte: avancar,
    onEscolher: () => confirmarOpcao(foco),
    onMenu:     () => router.push('/missoes'),
  })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#FFFAE5] to-[#FFF4D1]">

      <div className="flex flex-1 min-h-0 flex-col gap-6 px-8 py-4">

        <HeaderAjuda />

        <div className="flex flex-col items-center gap-0.5 text-center">
          <h2 className="font-display text-4xl font-medium leading-tight text-[#1A4F7A] md:text-5xl">
            Problema com o papel
          </h2>
          <p className="font-display text-base italic text-[#5A7A95] md:text-lg">
            O que aconteceu ao papel?
          </p>
        </div>

        {/* Dois cartões centrados, maiores que na grelha 2x2 */}
        <section
          aria-label="Tipo de problema com o papel"
          className="flex flex-1 min-h-0 items-center justify-center gap-8 px-4"
        >
          {OPCOES.map((opcao, i) => (
            <div key={opcao.id} className="h-[70%] w-full max-w-[340px]">
              <CartaoAjuda
                titulo={opcao.titulo}
                pictograma={opcao.pictograma}
                corPlaca={opcao.corPlaca}
                emFoco={foco === i}
                ariaLabel={opcao.ariaLabel}
                onClick={() => { setFoco(i); confirmarOpcao(i) }}
              />
            </div>
          ))}
        </section>
      </div>

      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/30 py-8 backdrop-blur-sm">
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
