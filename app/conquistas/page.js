'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { Autocolante } from '@/components/Autocolante'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { useEstrelas } from '@/lib/estrelasContext'
import {
  CONQUISTAS,
  estaDesbloqueada,
  progressoConquista,
  proximaConquista,
  totalDesbloqueadas,
  eConquistaNova,
  marcarComoVista,
} from '@/lib/conquistas'

const NOME_CRIANCA = 'Tiago'

export default function AlbumConquistas() {
  const router = useRouter()
  const { estrelas } = useEstrelas()
  const [foco, setFoco] = useState(0)

  const total = CONQUISTAS.length
  const desbloqueadas = totalDesbloqueadas()
  const proxima = proximaConquista()
  const conquistaEmFoco = CONQUISTAS[foco]
  const desbloqueadaEmFoco = estaDesbloqueada(conquistaEmFoco)
  const progressoEmFoco = progressoConquista(conquistaEmFoco)

  function moverFoco(direcao) {
    setFoco(f => {
      const novo = f + direcao
      if (novo < 0) return total - 1
      if (novo >= total) return 0
      return novo
    })
  }

  useBotoesFisicos({
    onAnterior: () => moverFoco(-1),
    onSeguinte: () => moverFoco(1),
    onMenu:     () => router.push('/missoes'),
  })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#B8DCEB]">

      <div className="flex flex-1 min-h-0 flex-col px-6 py-3">

        {/* Header */}
        <header className="flex w-full items-center justify-between shrink-0">
          <div className="flex flex-col">
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5A7A95]">
              Conquistas
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

        {/* Título e subtítulo — compactos */}
        <div className="flex flex-col items-center gap-0.5 text-center shrink-0 mt-1">
          <h2 className="font-display text-3xl font-medium leading-tight text-[#1A4F7A]">
            As Minhas Conquistas
          </h2>
          <p className="font-display text-sm text-[#5A7A95]">
            Olha o que já conseguiste, {NOME_CRIANCA}!
          </p>
        </div>

        {/* Grelha de autocolantes — ocupa a maior parte do ecrã */}
        <section
          className="mx-auto w-[82%] flex-1 min-h-0 flex items-center justify-center rounded-3xl bg-white/40 px-6 py-4 shadow-inner mt-2"
          aria-label="Autocolantes"
        >
          <div className="grid grid-cols-5 grid-rows-2 gap-4 justify-items-center">
            {CONQUISTAS.map((c, i) => (
              <Autocolante
                key={c.id}
                nome={c.nome}
                icone={c.icone}
                cor={c.cor}
                desbloqueado={estaDesbloqueada(c)}
                emFoco={foco === i}
                novo={eConquistaNova(c.id)}
                onClick={() => setFoco(i)}
                onAnimacaoTerminou={() => marcarComoVista(c.id)}
              />
            ))}
          </div>
        </section>

        {/* Zona de detalhe — altura fixa */}
        <div className="flex h-[50px] items-center justify-center text-center shrink-0" aria-live="polite">
          {desbloqueadaEmFoco ? (
            <p className="font-display text-sm text-[#3B7A50] md:text-base">
              <span className="mr-1 text-[#7FB342]">✓</span>
              Conquistado! {conquistaEmFoco.descricao}
            </p>
          ) : (
            <p className="font-display text-sm text-[#5A7A95] md:text-base">
              {conquistaEmFoco.descricao}
              <span className="ml-2 text-[#85B7EB] font-semibold">
                ({progressoEmFoco.atual} de {progressoEmFoco.total})
              </span>
            </p>
          )}
        </div>

        {/* Barra de progresso global — compacta */}
        <div className="flex items-center justify-center gap-4 shrink-0 pb-1">
          <p className="font-display text-sm text-[#5A7A95]">
            {desbloqueadas} de {total}
          </p>
          <div className="h-2.5 w-48 rounded-full bg-[#E0E0E0]">
            <div
              className="h-full rounded-full bg-[#7FB342] transition-all duration-500"
              style={{ width: `${(desbloqueadas / total) * 100}%` }}
            />
          </div>
          {proxima && (
            <p className="font-display text-xs italic text-[#5A7A95]">
              Próxima: {proxima.nome}
            </p>
          )}
        </div>
      </div>

      {/* Coluna de botões */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior"
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="blue" label="Seguinte"
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <BotaoMenu onClick={() => router.push('/missoes')} />
      </aside>
    </main>
  )
}
