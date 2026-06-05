import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type ButtonHintProps = {
  label: string
  icon: ReactNode
  /** Color of the physical button cap. */
  tone: "blue" | "green" | "yellow"
  /** Make this hint visually larger/more prominent (e.g. for the main "Choose" action). */
  emphasis?: boolean
  /** Mostra o botão "esbatido" (50% opacidade) quando a ação não está disponível neste ecrã. */
  disabled?: boolean
}

/* Cores exatas do CLAUDE.md com sombra 3D que imita o botão físico. */
const toneClasses: Record<ButtonHintProps["tone"], { cap: string; ring: string; text: string; shadow: string }> = {
  blue: {
    cap:    "bg-[#85B7EB]",
    ring:   "ring-[#85B7EB]/30",
    text:   "text-[#185FA5]",
    shadow: "shadow-[inset_0_-5px_0_0_#185FA5,0_3px_0_0_rgba(0,0,0,0.10)]",
  },
  green: {
    cap:    "bg-[#85CC97]",
    ring:   "ring-[#85CC97]/30",
    text:   "text-[#3B7A50]",
    shadow: "shadow-[inset_0_-5px_0_0_#4E9966,0_3px_0_0_rgba(0,0,0,0.10)]",
  },
  yellow: {
    cap:    "bg-[#FAC775]",
    ring:   "ring-[#FAC775]/40",
    text:   "text-[#854F0B]",
    shadow: "shadow-[inset_0_-5px_0_0_#854F0B,0_3px_0_0_rgba(0,0,0,0.10)]",
  },
}

export function ButtonHint({ label, icon, tone, emphasis = false, disabled = false }: ButtonHintProps) {
  const t = toneClasses[tone]
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 transition-opacity",
        disabled && "opacity-50",
      )}
      aria-disabled={disabled || undefined}
    >
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full ring-8 transition-transform",
          t.ring,
          emphasis ? "h-20 w-20 md:h-24 md:w-24" : "h-16 w-16 md:h-18 md:w-18",
        )}
        aria-hidden="true"
      >
        <div className={cn("absolute inset-0 rounded-full", t.cap, t.shadow)} />
        <div className="relative text-white">{icon}</div>
      </div>
      <span className={cn("font-display text-sm font-semibold md:text-base", t.text)}>{label}</span>
    </div>
  )
}
