'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import Image from 'next/image'
import heroi from '@/public/herois/heroi5.png'
import { ButtonHint } from '@/components/button-hint'
import { StarIcon } from '@/components/mission-icons'
import { useBotoesFisicos } from '@/lib/teclado'
import { MISSOES, type TipoMissao } from '@/lib/missoes'

const ESTRELAS_POR_MISSAO: Record<TipoMissao, number> = {
  xixi: 3,
  coco: 4,
  maos: 3,
}

export default function Recompensa({ params }: { params: Promise<{ tipo: string }> }) {
  const { tipo } = use(params)
  const router = useRouter()

  const missao = MISSOES[tipo as TipoMissao]
  const estrelas = ESTRELAS_POR_MISSAO[tipo as TipoMissao] ?? 3

  function voltarAoMenu() { router.push('/missoes') }

  useBotoesFisicos({ onEscolher: voltarAoMenu, onAnterior: voltarAoMenu })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#E8F4FA] to-[#D2F1FF]">

      {/* Conteúdo — flex-1 não fica por baixo dos controlos */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 py-6">

        <h1 className="font-display text-8xl font-bold text-[#2E4861] text-center leading-tight">
          Parabéns! 🎉
        </h1>

        {missao && (
          <p className="font-display text-3xl text-[#436076] text-center">
            Completaste a missão{' '}
            <span className="font-bold text-[#2E4861]">{missao.titulo}</span>!
          </p>
        )}

        <div className="flex items-center gap-3 rounded-3xl bg-white/70 px-8 py-4 shadow-sm"
          role="status" aria-label={`Ganhaste ${estrelas} estrelas`}>
          {Array.from({ length: estrelas }).map((_, i) => (
            <StarIcon key={i} className="h-14 w-14" />
          ))}
          <span className="ml-3 font-display text-5xl font-bold text-[#2E4861]">+{estrelas}</span>
        </div>

        <Image src={heroi} alt="Herói a celebrar" className="h-64 w-auto object-contain drop-shadow-lg" />

        <button onClick={voltarAoMenu}
          className="flex items-center gap-3 rounded-3xl border-4 border-coral bg-[#85CC97] px-12 py-4 shadow-[0_5px_0_0_#4E9966] transition-transform active:translate-y-1 active:shadow-none"
          aria-label="Voltar ao menu de missões">
          <span className="font-display text-3xl font-bold text-white">Voltar ao Menu</span>
        </button>
      </div>

      {/* Controlos — direita */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/20 py-8 backdrop-blur-sm">
        <ButtonHint tone="green" emphasis label="Voltar ao Menu"
          icon={<Check className="h-10 w-10" strokeWidth={3.5} aria-hidden />} />
      </aside>
    </main>
  )
}
