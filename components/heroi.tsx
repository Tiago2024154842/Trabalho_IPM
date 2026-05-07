import type { SVGProps } from 'react'
import { cn } from '@/lib/utils'

type Pose = 'acenar' | 'feliz' | 'sentado'

interface HeroiProps extends SVGProps<SVGSVGElement> {
  pose?: Pose
  className?: string
}

/* Mascote super-herói com "M" no peito. Paleta azul-claro/branco. */
export function Heroi({ pose = 'acenar', className, ...props }: HeroiProps) {
  return (
    <svg
      viewBox="0 0 200 280"
      aria-hidden="true"
      className={cn('select-none', className)}
      {...props}
    >
      {/* Capa */}
      <path
        d="M55 108 Q15 170 38 240 Q65 224 100 220 Q135 224 162 240 Q185 170 145 108"
        fill="#5A94C8"
      />

      {/* Corpo / fato */}
      <ellipse cx="100" cy="172" rx="44" ry="58" fill="#85B7EB" />

      {/* Colarinho */}
      <path d="M80 108 Q100 118 120 108 L116 124 Q100 130 84 124 Z" fill="#85B7EB" />

      {/* Emblema M */}
      <circle cx="100" cy="162" r="18" fill="white" opacity="0.25" />
      <text
        x="100" y="170"
        textAnchor="middle"
        fontSize="22"
        fontWeight="bold"
        fill="white"
        fontFamily="Fredoka, Nunito, sans-serif"
      >
        M
      </text>

      {/* Pescoço */}
      <rect x="88" y="96" width="24" height="18" rx="6" fill="#FFD4A8" />

      {/* Cabeça */}
      <circle cx="100" cy="72" r="42" fill="#FFD4A8" />

      {/* Cabelo */}
      <path
        d="M58 58 Q64 20 100 18 Q136 20 142 58 Q124 46 100 48 Q76 46 58 58"
        fill="#3A2200"
      />

      {/* Olhos */}
      <circle cx="84" cy="72" r="7" fill="white" />
      <circle cx="116" cy="72" r="7" fill="white" />
      <circle cx="85" cy="72" r="4" fill="#1A2A3A" />
      <circle cx="117" cy="72" r="4" fill="#1A2A3A" />
      {/* Brilho nos olhos */}
      <circle cx="87" cy="70" r="1.5" fill="white" />
      <circle cx="119" cy="70" r="1.5" fill="white" />

      {/* Sobrancelhas amigáveis */}
      <path d="M76 61 Q84 56 92 61" stroke="#3A2200" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 61 Q116 56 124 61" stroke="#3A2200" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Sorriso */}
      <path d="M86 88 Q100 100 114 88" stroke="#C0704A" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Bochechas */}
      <circle cx="72" cy="83" r="8" fill="#FFB0A0" opacity="0.35" />
      <circle cx="128" cy="83" r="8" fill="#FFB0A0" opacity="0.35" />

      {pose === 'acenar' ? (
        <>
          {/* Braço esquerdo normal */}
          <path d="M56 130 Q36 148 32 168" stroke="#85B7EB" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="172" r="12" fill="#FFD4A8" />

          {/* Braço direito — a acenar */}
          <path d="M144 118 Q162 90 168 62" stroke="#85B7EB" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="168" cy="56" r="12" fill="#FFD4A8" />
          {/* Dedos a acenar */}
          <path d="M162 48 Q168 40 172 46" stroke="#FFD4A8" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M168 44 Q174 36 176 44" stroke="#FFD4A8" strokeWidth="5" strokeLinecap="round" fill="none" />
        </>
      ) : pose === 'feliz' ? (
        <>
          {/* Braços levantados a celebrar */}
          <path d="M56 122 Q28 100 22 72" stroke="#85B7EB" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="66" r="12" fill="#FFD4A8" />
          <path d="M144 122 Q172 100 178 72" stroke="#85B7EB" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="180" cy="66" r="12" fill="#FFD4A8" />
        </>
      ) : (
        <>
          {/* Braços ao lado — sentado */}
          <path d="M56 130 Q40 160 42 190" stroke="#85B7EB" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="42" cy="194" r="12" fill="#FFD4A8" />
          <path d="M144 130 Q160 160 158 190" stroke="#85B7EB" strokeWidth="22" strokeLinecap="round" fill="none" />
          <circle cx="158" cy="194" r="12" fill="#FFD4A8" />
        </>
      )}

      {/* Pernas */}
      <rect x="72" y="222" width="22" height="32" rx="8" fill="#2D5A8A" />
      <rect x="106" y="222" width="22" height="32" rx="8" fill="#2D5A8A" />

      {/* Botas */}
      <ellipse cx="83" cy="254" rx="16" ry="7" fill="#1A3A5A" />
      <ellipse cx="117" cy="254" rx="16" ry="7" fill="#1A3A5A" />
    </svg>
  )
}