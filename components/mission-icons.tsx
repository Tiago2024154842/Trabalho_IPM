import type { SVGProps } from "react"

/**
 * Friendly, flat illustrations for the four bathroom missions.
 * Designed at 200x200 with rounded shapes and soft pastel fills
 * so they feel calm and predictable for children aged 4–9.
 */

type IconProps = SVGProps<SVGSVGElement>

export function PeeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      {/* tank */}
      <rect x="58" y="34" width="84" height="46" rx="10" fill="#EAF3FA" stroke="#6FA8C7" strokeWidth="3" />
      {/* flush button */}
      <rect x="118" y="42" width="14" height="6" rx="3" fill="#6FA8C7" />
      {/* bowl */}
      <path
        d="M50 80 H150 L142 138 Q140 156 122 158 H78 Q60 156 58 138 Z"
        fill="#F6FBFD"
        stroke="#6FA8C7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* seat ring */}
      <ellipse cx="100" cy="86" rx="48" ry="9" fill="#DCEAF3" stroke="#6FA8C7" strokeWidth="3" />
      {/* base */}
      <rect x="74" y="158" width="52" height="10" rx="3" fill="#DCEAF3" stroke="#6FA8C7" strokeWidth="3" />
      {/* yellow drops */}
      <path d="M92 100 c-4 7 -8 12 -8 17 a8 8 0 0 0 16 0 c0 -5 -4 -10 -8 -17 z" fill="#F4C84A" />
      <path d="M112 110 c-3 5 -6 9 -6 13 a6 6 0 0 0 12 0 c0 -4 -3 -8 -6 -13 z" fill="#F4C84A" />
      <circle cx="86" cy="128" r="3.5" fill="#F4C84A" />
      <circle cx="118" cy="132" r="2.5" fill="#F4C84A" />
    </svg>
  )
}

export function PoopIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      {/* tank */}
      <rect x="58" y="34" width="84" height="46" rx="10" fill="#EAF3FA" stroke="#6FA8C7" strokeWidth="3" />
      <rect x="118" y="42" width="14" height="6" rx="3" fill="#6FA8C7" />
      {/* bowl */}
      <path
        d="M50 80 H150 L142 138 Q140 156 122 158 H78 Q60 156 58 138 Z"
        fill="#F6FBFD"
        stroke="#6FA8C7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <ellipse cx="100" cy="86" rx="48" ry="9" fill="#DCEAF3" stroke="#6FA8C7" strokeWidth="3" />
      <rect x="74" y="158" width="52" height="10" rx="3" fill="#DCEAF3" stroke="#6FA8C7" strokeWidth="3" />
      {/* friendly poop swirl */}
      <g>
        <path
          d="M82 132 q0 -10 10 -12 q-4 -10 6 -14 q-2 -10 8 -10 q10 0 8 10 q10 4 6 14 q10 2 10 12 q0 10 -12 10 H94 q-12 0 -12 -10 z"
          fill="#A6764B"
          stroke="#6E4A2C"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* eyes */}
        <circle cx="96" cy="124" r="2.4" fill="#3A2618" />
        <circle cx="112" cy="124" r="2.4" fill="#3A2618" />
        {/* smile */}
        <path d="M97 132 q7 5 14 0" stroke="#3A2618" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function WashHandsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      {/* mirror / tile back */}
      <rect x="36" y="22" width="128" height="48" rx="10" fill="#EAF3FA" stroke="#6FA8C7" strokeWidth="3" />
      {/* faucet */}
      <path
        d="M100 70 V94 M88 94 H112"
        stroke="#6FA8C7"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="94" y="56" width="12" height="14" rx="2" fill="#B7D2E1" stroke="#6FA8C7" strokeWidth="2" />
      {/* water stream */}
      <path d="M100 96 V120" stroke="#7FBEE0" strokeWidth="5" strokeLinecap="round" />
      {/* sink */}
      <path
        d="M40 116 H160 L150 158 Q148 170 134 170 H66 Q52 170 50 158 Z"
        fill="#F6FBFD"
        stroke="#6FA8C7"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="40" y="112" width="120" height="8" rx="3" fill="#DCEAF3" stroke="#6FA8C7" strokeWidth="3" />
      {/* bubbles */}
      <circle cx="86" cy="138" r="9" fill="#FFFFFF" stroke="#7FBEE0" strokeWidth="2" />
      <circle cx="104" cy="146" r="11" fill="#FFFFFF" stroke="#7FBEE0" strokeWidth="2" />
      <circle cx="120" cy="136" r="7" fill="#FFFFFF" stroke="#7FBEE0" strokeWidth="2" />
      <circle cx="74" cy="130" r="5" fill="#FFFFFF" stroke="#7FBEE0" strokeWidth="2" />
      <circle cx="132" cy="148" r="5" fill="#FFFFFF" stroke="#7FBEE0" strokeWidth="2" />
      {/* highlights */}
      <circle cx="83" cy="135" r="2" fill="#EAF7FF" />
      <circle cx="100" cy="142" r="2.5" fill="#EAF7FF" />
    </svg>
  )
}

export function PeriodIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" {...props}>
      {/* pad packet */}
      <rect x="34" y="46" width="98" height="120" rx="14" fill="#FBE4EA" stroke="#D88AA0" strokeWidth="3" />
      {/* packet stripe */}
      <rect x="34" y="78" width="98" height="14" fill="#F4C2D0" />
      {/* little flower icon on packet */}
      <g transform="translate(83 124)">
        <circle r="6" fill="#D88AA0" />
        <circle cx="0" cy="-12" r="6" fill="#F4C2D0" />
        <circle cx="11" cy="-6" r="6" fill="#F4C2D0" />
        <circle cx="11" cy="6" r="6" fill="#F4C2D0" />
        <circle cx="0" cy="12" r="6" fill="#F4C2D0" />
        <circle cx="-11" cy="6" r="6" fill="#F4C2D0" />
        <circle cx="-11" cy="-6" r="6" fill="#F4C2D0" />
      </g>
      {/* calendar */}
      <rect x="100" y="86" width="74" height="68" rx="8" fill="#FFFFFF" stroke="#6FA8C7" strokeWidth="3" />
      {/* calendar header */}
      <rect x="100" y="86" width="74" height="16" rx="8" fill="#7FBEE0" />
      <rect x="100" y="94" width="74" height="8" fill="#7FBEE0" />
      {/* binder rings */}
      <rect x="110" y="80" width="6" height="14" rx="2" fill="#6FA8C7" />
      <rect x="158" y="80" width="6" height="14" rx="2" fill="#6FA8C7" />
      {/* grid dots */}
      <g fill="#C9D9E3">
        <circle cx="112" cy="114" r="2.5" />
        <circle cx="124" cy="114" r="2.5" />
        <circle cx="136" cy="114" r="2.5" />
        <circle cx="148" cy="114" r="2.5" />
        <circle cx="160" cy="114" r="2.5" />
        <circle cx="112" cy="128" r="2.5" />
        <circle cx="148" cy="128" r="2.5" />
        <circle cx="160" cy="128" r="2.5" />
        <circle cx="112" cy="142" r="2.5" />
        <circle cx="124" cy="142" r="2.5" />
        <circle cx="160" cy="142" r="2.5" />
      </g>
      {/* highlighted day */}
      <circle cx="136" cy="128" r="7" fill="#E8657F" />
      <circle cx="124" cy="128" r="6" fill="#FBE4EA" stroke="#E8657F" strokeWidth="2" />
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M12 2.6 14.9 8.5 21.4 9.5 16.7 14.1 17.8 20.6 12 17.6 6.2 20.6 7.3 14.1 2.6 9.5 9.1 8.5z"
        fill="#F4C84A"
        stroke="#C99720"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}
