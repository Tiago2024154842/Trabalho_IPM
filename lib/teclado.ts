'use client'

import { useEffect } from 'react'

interface BotoesHandlers {
  onAnterior?: () => void
  onSeguinte?: () => void
  onEscolher?: () => void
  onAjuda?: () => void
  onMenu?: () => void
  onConquistas?: () => void
}

/* Mapeia as teclas simuladas pelo script Python/GPIO para ações da app. */
export function useBotoesFisicos({ onAnterior, onSeguinte, onEscolher, onAjuda, onMenu, onConquistas }: BotoesHandlers) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')            onAnterior?.()
      else if (e.key === 'ArrowRight')      onSeguinte?.()
      else if (e.key === 'Enter')           onEscolher?.()
      else if (e.key.toLowerCase() === 'h') onAjuda?.()
      else if (e.key.toLowerCase() === 'm') onMenu?.()
      else if (e.key.toLowerCase() === 'c') onConquistas?.()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onAnterior, onSeguinte, onEscolher, onAjuda, onMenu, onConquistas])
}