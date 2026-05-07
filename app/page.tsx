'use client'

import { useRouter } from 'next/navigation'
import { Check, HelpCircle } from 'lucide-react'
import Image from 'next/image'
import heroi from '@/public/herois/heroi1.png'
import nuvens from '@/public/nuvens.png'
import { ButtonHint } from '@/components/button-hint'
import { useBotoesFisicos } from '@/lib/teclado'

// Ajusta aqui posição (top/left em %), tamanho (w) e rotação de cada nuvem
const NUVENS = [
  { top: '20%', left: '4%',  width: '210px', rotate: '-8deg' },
  { top: '10%', left: '78%', width: '150px', rotate:  '7deg' },
  { top: '40%', left: '72%', width: '220px', rotate:  '2deg' },
]

export default function BemVindo() {
  const router = useRouter()

  useBotoesFisicos({
    onEscolher: () => router.push('/missoes'),
    onAjuda:    () => router.push('/ajuda'),
  })

  return (
    <main className="relative flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#D2F1FF]">

      {/* Nuvens — relativas ao ecrã inteiro */}
      {NUVENS.map((n, i) => (
        <Image key={i} src={nuvens} alt="" aria-hidden="true"
          className="pointer-events-none absolute select-none"
          style={{ top: n.top, left: n.left, width: n.width, opacity: 0.4, rotate: n.rotate }}
        />
      ))}

      {/* Conteúdo — flex-1 garante que nunca fica por baixo dos controlos */}
      <div className="relative flex flex-1 flex-col items-center overflow-hidden px-10">

        <div className="mt-8 flex flex-col items-center gap-1">
          <h1 className="font-display text-9xl font-bold text-center leading-tight text-[#2E4861]">
            Olá, Tiago!
          </h1>
          <p className="font-display text-4xl font-bold text-center text-[#436076]">
            Missão Casa de Banho
          </p>
        </div>

        {/* Botão COMEÇAR — fundo, por cima do herói */}
        <div className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2">
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-coral px-5 py-1 shadow-md">
            <span className="font-display text-xs font-bold tracking-wider text-white uppercase whitespace-nowrap">
              ★ Escolhido!
            </span>
          </div>
          <button onClick={() => router.push('/missoes')}
            className="flex items-center gap-1 rounded-4xl border-4 border-coral bg-[#85CC97] px-12 py-2 shadow-[0_4px_0_0_#4E9966] transition-transform active:translate-y-1 active:shadow-none"
            aria-label="Começar missão">
            <span className="font-display text-4xl font-bold text-white">COMEÇAR</span>
          </button>
        </div>

        {/* Herói */}
        <Image src={heroi} alt="Herói Missão"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[68vh] w-auto object-contain" />
      </div>

      {/* Controlos — direita, fora do conteúdo para não sobrepor */}
      <aside className="relative z-10 flex w-36 shrink-0 flex-col items-center justify-center gap-8 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="green" emphasis label="Começar"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
        <ButtonHint tone="yellow" label="Ajuda"
          icon={<HelpCircle className="h-7 w-7" strokeWidth={3} aria-hidden />} />
      </aside>
    </main>
  )
}
