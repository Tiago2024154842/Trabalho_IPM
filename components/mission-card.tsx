import type { ReactNode } from "react"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

type MissionCardProps = {
  title: string
  illustration: ReactNode
  /** Background color token for the illustration plate (e.g. sky-soft, mint-soft). */
  plate: "sky-soft" | "mint-soft" | "sun-soft" | "coral-soft"
  number: number
  inFocus?: boolean
  locked?: boolean
  lockedLabel?: string
  /** Badge text shown in the top-right corner (e.g. "3/10"). */
  badge?: string
}

const plateClasses: Record<NonNullable<MissionCardProps["plate"]>, string> = {
  "sky-soft": "bg-sky-soft",
  "mint-soft": "bg-mint-soft",
  "sun-soft": "bg-sun-soft",
  "coral-soft": "bg-coral-soft",
}

export function MissionCard({
  title,
  illustration,
  plate,
  number,
  inFocus = false,
  locked = false,
  lockedLabel,
  badge,
}: MissionCardProps) {
  return (
    <div
      role="group"
      aria-label={title}
      aria-current={inFocus ? "true" : undefined}
      className={cn(
        "relative flex flex-col h-full rounded-3xl bg-card px-5 pt-5 pb-4 transition-transform",
        "border-4 border-border/60 shadow-[0_6px_0_0_rgba(60,80,110,0.08)]",
        inFocus && "border-coral shadow-[0_8px_0_0_rgba(228,110,110,0.18)] -translate-y-1",
        locked && "opacity-95",
      )}
    >
      {/* IN FOCUS badge */}
      {inFocus && (
        /* inset-x-0 garante que o badge nunca sai para fora do cartão */
        <div className="absolute -top-4 inset-x-0 flex justify-center pointer-events-none">
          <div className="rounded-full bg-coral px-4 py-1.5 shadow-md" aria-label="Escolhido">
            <span className="font-display text-xs font-bold tracking-wider text-white uppercase whitespace-nowrap">
              ★ Escolhido!
            </span>
          </div>
        </div>
      )}

      {/* Step number */}
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 font-display text-base font-semibold text-ink/70">
        {number}
      </div>

      {/* Badge (e.g. "3/10") */}
      {badge && (
        <div className="absolute left-4 top-4 z-10 rounded-full bg-[#FAC775] px-3 py-0.5 shadow-sm">
          <span className="font-display text-xs font-bold text-white">{badge}</span>
        </div>
      )}

      {/* Illustration plate */}
      <div
        className={cn(
          "relative mx-auto mt-2 flex flex-1 min-h-0 w-full items-center justify-center rounded-2xl",
          plateClasses[plate],
        )}
      >
        <div className="flex h-[78%] w-[78%] items-center justify-center">{illustration}</div>

        {locked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-foreground/30 backdrop-blur-[1px]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-card shadow-lg">
              <Lock className="h-8 w-8 text-lock" strokeWidth={2.5} />
            </div>
          </div>
        )}
      </div>

      {/* Title */}
      <div className="flex flex-col items-center justify-center gap-2 mt-3 shrink-0">
        <h3 className="font-display text-2xl font-medium text-ink leading-none md:text-3xl">
          {title}
        </h3>

        {locked && lockedLabel && (
          <span className="rounded-full bg-foreground/5 px-3 py-1 font-display text-xs font-semibold uppercase tracking-wide text-lock">
            {lockedLabel}
          </span>
        )}
      </div>
    </div>
  )
}
