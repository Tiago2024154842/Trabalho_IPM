'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import heroi from '@/public/herois/heroi1.png'
import { ButtonHint } from '@/components/button-hint'
import { BotaoMenu } from '@/components/BotaoMenu'
import { HeaderAjuda } from '@/components/HeaderAjuda'
import { useBotoesFisicos } from '@/lib/teclado'
import { obterChamada, terminarChamada } from '@/lib/notificacoesAjuda'

function formatarTempo(s: number) {
  if (s < 60) return `Há ${s} segundos…`
  const min = Math.floor(s / 60)
  return `Há ${min} ${min === 1 ? 'minuto' : 'minutos'}…`
}

export default function AjudaEnviada() {
  const router = useRouter()
  const [segundos, setSegundos] = useState(0)

  // Atualiza o contador de tempo a cada 10s.
  useEffect(() => {
    const i = setInterval(() => setSegundos(s => s + 10), 10000)
    return () => clearInterval(i)
  }, [])

  // Mock: se passarem 2 minutos sem ação, reforça a notificação ao cuidador.
  useEffect(() => {
    const t = setTimeout(() => {
      console.log('[AJUDA] Notificação reforçada ao cuidador (2 min sem ação)')
    }, 120_000)
    return () => clearTimeout(t)
  }, [])

  function voltarAoPasso() {
    const chamada = obterChamada()
    terminarChamada()
    if (chamada && chamada.rotaOrigem.startsWith('/missao/')) {
      router.replace(`${chamada.rotaOrigem}?p=${chamada.passoOrigem}`)
    } else {
      router.replace('/missoes')
    }
  }

  function mudarOpcao() {
    // Mantém o estado da chamada — só voltamos para o ecrã de seleção.
    router.replace('/ajuda')
  }

  function irParaMenu() {
    terminarChamada()
    router.replace('/missoes')
  }

  useBotoesFisicos({
    onEscolher: voltarAoPasso,
    onAjuda:    mudarOpcao,
    onMenu:     irParaMenu,
    // ANTERIOR / SEGUINTE intencionalmente omitidos (desativados visualmente).
  })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#FFFAE5] to-[#FFF4D1]">

      <div className="flex flex-1 flex-col px-10 py-6">

        <HeaderAjuda />

        {/* Bloco central perfeitamente centrado */}
        <section
          className="flex flex-1 flex-col items-center justify-center gap-5"
          role="status"
          aria-live="polite"
        >
          <Image
            src={heroi}
            alt="Herói tranquilo a esperar contigo"
            className="h-[280px] w-auto object-contain drop-shadow-lg animate-pulse-heroi"
            priority
          />

          <h2 className="font-display text-[3.25rem] font-medium leading-tight text-[#1A4F7A] text-center">
            Já chamei um adulto.
          </h2>

          <p className="mt-4 font-display text-[1.5rem] text-[#5A7A95] text-center max-w-2xl">
            Espera só um bocadinho, está tudo bem.
          </p>

          <p className="mt-6 font-display text-sm text-[#888780]" aria-live="off">
            {formatarTempo(segundos)}
          </p>
        </section>

        {/* Rodapé minimalista — só legenda das ações disponíveis */}
        <p className="text-center font-display text-sm text-[#5A7A95]">
          Quando quiseres, carrega no botão <span className="font-bold text-[#3B7A50]">verde</span> para continuares.
        </p>
      </div>

      {/* Coluna de botões físicos */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/30 py-8 backdrop-blur-sm">
        <ButtonHint tone="blue" label="Anterior" disabled
          icon={<ArrowLeft className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="blue" label="Seguinte" disabled
          icon={<ArrowRight className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <ButtonHint tone="green" emphasis label="Estou bem"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Mudar"
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
        <BotaoMenu onClick={irParaMenu} />
      </aside>
    </main>
  )
}
