'use client'

import { useRouter } from 'next/navigation'
import { Bell } from 'lucide-react'
import { BotaoMenu } from '@/components/BotaoMenu'
import { useBotoesFisicos } from '@/lib/teclado'
import { useNarracao } from '@/lib/sons'

export default function EcraChamar() {
  const router = useRouter()

  // Som de confirmação: a app está a chamar um adulto (repete a cada 30s).
  useNarracao('adulto')

  useBotoesFisicos({
    onMenu: () => router.push('/missoes'),
  })

  return (
    <main className="flex h-dvh w-full overflow-hidden bg-gradient-to-b from-[#FFFAE5] to-[#FFF4D1]">

      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10">

        {/* Sino com animação */}
        <div className="animate-pulse-suave">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#FAC775]/40 md:h-40 md:w-40">
            <Bell className="h-16 w-16 text-[#C99720] md:h-20 md:w-20" strokeWidth={2} aria-hidden />
          </div>
        </div>

        <h2 className="font-display text-5xl font-bold text-[#1A4F7A] text-center md:text-6xl">
          A chamar a educadora...
        </h2>

        <p className="font-display text-2xl text-[#5A7A95] text-center">
          Ela já vem. Fica descansado.
        </p>
      </div>

      {/* Sidebar — só Menu ativo */}
      <aside className="flex w-36 shrink-0 flex-col items-center justify-center gap-6 border-l border-white/30 bg-white/30 py-8 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2 opacity-50">
          <div className="flex items-center justify-center rounded-full bg-[#85B7EB] h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]"
            style={{ boxShadow: '0 4px 0 0 #185FA5' }}>
            <span className="font-display text-white text-2xl font-bold">←</span>
          </div>
          <span className="font-display text-sm font-semibold text-[#185FA5]">Anterior</span>
        </div>
        <div className="flex flex-col items-center gap-2 opacity-50">
          <div className="flex items-center justify-center rounded-full bg-[#85B7EB] h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]"
            style={{ boxShadow: '0 4px 0 0 #185FA5' }}>
            <span className="font-display text-white text-2xl font-bold">→</span>
          </div>
          <span className="font-display text-sm font-semibold text-[#185FA5]">Seguinte</span>
        </div>
        <div className="flex flex-col items-center gap-2 opacity-50">
          <div className="flex items-center justify-center rounded-full bg-[#7FB342] h-16 w-16 md:h-[4.5rem] md:w-[4.5rem]"
            style={{ boxShadow: '0 4px 0 0 #3B6D11' }}>
            <span className="font-display text-white text-2xl font-bold">✓</span>
          </div>
          <span className="font-display text-sm font-semibold text-[#3B6D11]">Escolher</span>
        </div>
        <BotaoMenu onClick={() => router.push('/missoes')} />
      </aside>
    </main>
  )
}
