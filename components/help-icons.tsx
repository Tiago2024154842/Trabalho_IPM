import type { SVGProps } from "react"

/**
 * Pictogramas do ecrã de Ajuda. Estilo consistente com mission-icons.tsx:
 * formas arredondadas, contornos suaves, paleta calma. Todos a 200x200.
 *
 * Importante: nenhuma figura humana (criança/adulto). Só os instrumentos
 * — pedagogicamente isto evita identificação com erro.
 */

type IconProps = SVGProps<SVGSVGElement>

/* Rolo de papel higiénico vazio + ponto de interrogação. */
export function PaperProblemIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      {/* sombra discreta no chão */}
      <ellipse cx="100" cy="170" rx="50" ry="6" fill="#000" opacity="0.05" />
      {/* corpo do rolo (lado) */}
      <rect x="44" y="74" width="92" height="76" rx="14" fill="#FFFFFF" stroke="#C9A03A" strokeWidth="3" />
      {/* tubo central (vazio) */}
      <ellipse cx="90" cy="74" rx="46" ry="14" fill="#F4E4B6" stroke="#C9A03A" strokeWidth="3" />
      <ellipse cx="90" cy="74" rx="18" ry="6" fill="#A57F2A" />
      {/* pontas do rolo */}
      <ellipse cx="90" cy="150" rx="46" ry="10" fill="#F4E4B6" stroke="#C9A03A" strokeWidth="3" />
      {/* tirinha de papel a cair (curva suave) */}
      <path
        d="M136 90 Q156 110 150 134 Q146 152 130 156"
        fill="none"
        stroke="#C9A03A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* ponto de interrogação */}
      <g transform="translate(140 32)">
        <circle r="22" fill="#FBE9A1" stroke="#C9A03A" strokeWidth="3" />
        <path
          d="M-7 -5 q0 -10 7 -10 q7 0 7 8 q0 6 -7 9 v3"
          fill="none"
          stroke="#6E4F0E"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="0" cy="11" r="2.4" fill="#6E4F0E" />
      </g>
    </svg>
  )
}

/* Calças com gota de água. */
export function WetClothesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="178" rx="56" ry="6" fill="#000" opacity="0.05" />
      {/* cinto */}
      <rect x="56" y="40" width="88" height="14" rx="4" fill="#B7D2E1" stroke="#6FA8C7" strokeWidth="3" />
      {/* parte superior das calças */}
      <path
        d="M58 54 H142 V96 H58 Z"
        fill="#EAF3FA"
        stroke="#6FA8C7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* perna esquerda */}
      <path
        d="M58 96 L70 170 H94 L96 96 Z"
        fill="#EAF3FA"
        stroke="#6FA8C7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* perna direita */}
      <path
        d="M104 96 L106 170 H130 L142 96 Z"
        fill="#EAF3FA"
        stroke="#6FA8C7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* gota grande à frente */}
      <path
        d="M118 70 c-7 12 -14 22 -14 30 a14 14 0 0 0 28 0 c0 -8 -7 -18 -14 -30 z"
        fill="#7FBEE0"
        stroke="#3F8DB6"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* brilho na gota */}
      <path d="M114 92 q4 -4 4 -10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85" />
      {/* gotinha pequena */}
      <path
        d="M82 116 c-3 5 -6 9 -6 13 a6 6 0 0 0 12 0 c0 -4 -3 -8 -6 -13 z"
        fill="#7FBEE0"
        stroke="#3F8DB6"
        strokeWidth="2"
      />
    </svg>
  )
}

/* Mão a segurar papel higiénico (sem figura humana — apenas o instrumento). */
export function CleanHelpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="178" rx="50" ry="6" fill="#000" opacity="0.05" />
      {/* folhas de papel dobrado (atrás) */}
      <path
        d="M40 56 H160 V120 H40 Z"
        fill="#FFFFFF"
        stroke="#9DC8A4"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* perfurações entre folhas (linhas verticais) */}
      <g stroke="#C8DEC9" strokeWidth="2" strokeDasharray="3 4">
        <line x1="80"  y1="56" x2="80"  y2="120" />
        <line x1="120" y1="56" x2="120" y2="120" />
      </g>
      {/* aba dobrada da folha de cima */}
      <path
        d="M40 56 L60 44 L160 44 V56 Z"
        fill="#F1FAF3"
        stroke="#9DC8A4"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* mão (vista de baixo, segurando o papel) */}
      <path
        d="M44 122 H156 Q170 122 170 134 V150 Q170 162 156 162 H62 Q44 162 44 150 Z"
        fill="#F4D6B8"
        stroke="#B68754"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* polegar */}
      <path
        d="M170 132 q14 2 14 14 q0 12 -14 14"
        fill="#F4D6B8"
        stroke="#B68754"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* punho */}
      <rect x="60" y="160" width="84" height="14" rx="4" fill="#E8C29C" stroke="#B68754" strokeWidth="2.5" />
    </svg>
  )
}

/* Mãos abertas com ponto de interrogação por cima — "Não sei como se faz". */
export function QuestionHandsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="180" rx="58" ry="6" fill="#000" opacity="0.05" />
      {/* mão esquerda (palma virada para cima) */}
      <path
        d="M28 132 Q28 110 48 108 L66 110 Q86 110 86 130 L86 152 Q86 168 64 168 L48 168 Q28 168 28 150 Z"
        fill="#F4D6B8"
        stroke="#B68754"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* dedos esquerda */}
      <g stroke="#B68754" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M44 134 V120" />
        <path d="M58 132 V116" />
        <path d="M72 134 V120" />
      </g>
      {/* mão direita (palma virada para cima) */}
      <path
        d="M114 130 Q114 110 134 108 L152 110 Q172 110 172 132 L172 152 Q172 168 152 168 L134 168 Q114 168 114 150 Z"
        fill="#F4D6B8"
        stroke="#B68754"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g stroke="#B68754" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M130 134 V120" />
        <path d="M144 132 V116" />
        <path d="M158 134 V120" />
      </g>
      {/* ponto de interrogação grande, centrado por cima */}
      <g transform="translate(100 56)">
        <circle r="36" fill="#D9EAF8" stroke="#5A8DBF" strokeWidth="3.5" />
        <path
          d="M-12 -10 q0 -16 12 -16 q12 0 12 13 q0 10 -12 14 v6"
          fill="none"
          stroke="#1A4F7A"
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <circle cx="0" cy="20" r="4" fill="#1A4F7A" />
      </g>
    </svg>
  )
}

/* Mãos a tapar ouvidos com nota musical riscada — "Tenho medo do barulho". */
export function NoiseEarsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="178" rx="56" ry="6" fill="#000" opacity="0.05" />
      {/* cabeça (círculo central) */}
      <circle cx="100" cy="106" r="44" fill="#FFE4C9" stroke="#B68754" strokeWidth="3" />
      {/* cabelo simples (calote) */}
      <path
        d="M58 100 Q60 64 100 62 Q140 64 142 100 Q120 90 100 90 Q80 90 58 100 Z"
        fill="#7A5A3A"
      />
      {/* olhos fechados (linhas curvas) */}
      <path d="M82 108 Q88 102 94 108" stroke="#3A2200" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M106 108 Q112 102 118 108" stroke="#3A2200" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* boca tensa (curva pequena) */}
      <path d="M92 128 Q100 124 108 128" stroke="#B85050" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* mão esquerda a tapar a orelha */}
      <ellipse cx="50" cy="106" rx="20" ry="26" fill="#F4D6B8" stroke="#B68754" strokeWidth="3" />
      {/* mão direita a tapar a orelha */}
      <ellipse cx="150" cy="106" rx="20" ry="26" fill="#F4D6B8" stroke="#B68754" strokeWidth="3" />
      {/* nota musical riscada (canto sup. esquerdo) */}
      <g transform="translate(34 38)">
        <path
          d="M0 18 V0 L14 -3 V14"
          stroke="#7E57C2"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="-3" cy="18" rx="6" ry="4" fill="#7E57C2" />
        <ellipse cx="11" cy="14" rx="6" ry="4" fill="#7E57C2" />
        {/* X por cima */}
        <line x1="-12" y1="-8" x2="22" y2="26" stroke="#D55B5B" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="22" y1="-8" x2="-12" y2="26" stroke="#D55B5B" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/* Silhueta de adulto com mão a chamar — "Preciso de um adulto". */
export function AdultIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="186" rx="50" ry="6" fill="#000" opacity="0.05" />
      {/* cabeça */}
      <circle cx="100" cy="50" r="22" fill="#F4D6B8" stroke="#B68754" strokeWidth="3" />
      {/* cabelo (calote curta) */}
      <path
        d="M80 46 Q82 30 100 28 Q118 30 120 46 Q110 40 100 40 Q90 40 80 46 Z"
        fill="#5A4030"
      />
      {/* corpo / camisola */}
      <path
        d="M70 86 Q70 76 84 74 L116 74 Q130 76 130 86 L130 150 L70 150 Z"
        fill="#A4C8E8"
        stroke="#3F6D9C"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* braço esquerdo (descontraído) */}
      <path
        d="M70 90 Q56 110 56 138"
        stroke="#A4C8E8"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="56" cy="142" r="9" fill="#F4D6B8" stroke="#B68754" strokeWidth="2.5" />
      {/* braço direito a acenar (levantado) */}
      <path
        d="M130 90 Q150 70 156 42"
        stroke="#A4C8E8"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="158" cy="38" r="11" fill="#F4D6B8" stroke="#B68754" strokeWidth="2.5" />
      {/* linhas de movimento da mão */}
      <g stroke="#E8657F" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M174 24 q4 6 0 14" />
        <path d="M180 36 q4 6 0 14" />
      </g>
      {/* pernas (calças) */}
      <rect x="78" y="150" width="18" height="30" rx="4" fill="#3F6D9C" />
      <rect x="104" y="150" width="18" height="30" rx="4" fill="#3F6D9C" />
    </svg>
  )
}

/* Rolo de papel caído no chão. */
export function PaperFallenIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      {/* chão */}
      <rect x="10" y="148" width="180" height="3" fill="#C9A03A" opacity="0.4" />
      <ellipse cx="100" cy="156" rx="70" ry="5" fill="#000" opacity="0.06" />
      {/* rolo deitado (corpo cilíndrico de lado) */}
      <ellipse cx="76" cy="124" rx="22" ry="20" fill="#F4E4B6" stroke="#C9A03A" strokeWidth="3" />
      <rect x="76" y="104" width="64" height="40" fill="#FFFFFF" stroke="#C9A03A" strokeWidth="3" />
      <ellipse cx="140" cy="124" rx="22" ry="20" fill="#FFFFFF" stroke="#C9A03A" strokeWidth="3" />
      {/* tubo central (visível na ponta esquerda) */}
      <ellipse cx="76" cy="124" rx="9" ry="8" fill="#A57F2A" />
      {/* tira de papel desenrolada no chão */}
      <path
        d="M140 124 Q160 132 178 130 Q190 130 192 142"
        stroke="#C9A03A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M140 130 Q162 142 184 144"
        stroke="#C9A03A"
        strokeWidth="2"
        strokeDasharray="3 4"
        fill="none"
      />
      {/* setinhas a sugerir queda */}
      <g stroke="#85B7EB" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7">
        <path d="M58 60 V78" />
        <path d="M52 72 L58 80 L64 72" />
        <path d="M88 50 V68" />
        <path d="M82 62 L88 70 L94 62" />
      </g>
    </svg>
  )
}

/* Rolo de papel vazio (sem folhas). */
export function PaperEmptyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="170" rx="50" ry="6" fill="#000" opacity="0.05" />
      {/* suporte de parede (haste horizontal) */}
      <rect x="32" y="98" width="14" height="22" rx="3" fill="#B0BEC5" stroke="#607D8B" strokeWidth="2" />
      <rect x="32" y="118" width="136" height="6" rx="3" fill="#B0BEC5" stroke="#607D8B" strokeWidth="2" />
      <rect x="154" y="98" width="14" height="22" rx="3" fill="#B0BEC5" stroke="#607D8B" strokeWidth="2" />
      {/* tubo de cartão vazio */}
      <ellipse cx="100" cy="100" rx="46" ry="14" fill="#A57F2A" stroke="#7A5A1A" strokeWidth="3" />
      <rect x="54" y="100" width="92" height="34" fill="#C9A03A" stroke="#7A5A1A" strokeWidth="3" />
      <ellipse cx="100" cy="134" rx="46" ry="14" fill="#A57F2A" stroke="#7A5A1A" strokeWidth="3" />
      {/* interior do tubo (sombra) */}
      <ellipse cx="100" cy="100" rx="30" ry="9" fill="#5A3A0E" />
      {/* X grande a indicar vazio */}
      <g transform="translate(100 90)">
        <circle r="22" fill="#FFEAEA" stroke="#D55B5B" strokeWidth="3" />
        <line x1="-10" y1="-10" x2="10" y2="10" stroke="#D55B5B" strokeWidth="4" strokeLinecap="round" />
        <line x1="10" y1="-10" x2="-10" y2="10" stroke="#D55B5B" strokeWidth="4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

/* Mão a acenar (sem figura humana, apenas mão). */
export function WaveHandIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      <ellipse cx="100" cy="178" rx="46" ry="6" fill="#000" opacity="0.05" />
      {/* punho/manga */}
      <rect x="76" y="146" width="48" height="22" rx="6" fill="#E8B5C9" stroke="#B66C8C" strokeWidth="3" />
      {/* palma */}
      <path
        d="M70 84 Q70 70 84 70 Q90 50 100 70 Q108 50 116 70 Q124 50 132 70 Q146 72 144 92 V128 Q144 152 108 152 H92 Q70 152 70 130 Z"
        fill="#F4D6B8"
        stroke="#B68754"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* dedos (linhas internas suaves) */}
      <g stroke="#B68754" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M90 76 V104" />
        <path d="M104 70 V104" />
        <path d="M118 76 V104" />
      </g>
      {/* polegar */}
      <path
        d="M70 110 Q56 112 56 124 Q56 136 70 136"
        fill="#F4D6B8"
        stroke="#B68754"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* linhas de movimento (acenar) */}
      <g stroke="#E8657F" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.85">
        <path d="M150 60 q10 8 6 22" />
        <path d="M162 78 q10 6 8 20" />
      </g>
    </svg>
  )
}
