'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface EstrelasContexto {
  estrelas: number
  atualizarEstrelas: (quantidade: number) => void
}

const Ctx = createContext<EstrelasContexto>({ estrelas: 0, atualizarEstrelas: () => {} })

export function EstrelasProvider({ children }: { children: ReactNode }) {
  const [estrelas, setEstrelas] = useState(0)
  const atualizarEstrelas = useCallback((q: number) => setEstrelas(e => e + q), [])
  return <Ctx.Provider value={{ estrelas, atualizarEstrelas }}>{children}</Ctx.Provider>
}

export function useEstrelas() { return useContext(Ctx) }
