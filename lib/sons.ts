'use client'

import { useEffect } from 'react'

// Reprodução simples de efeitos sonoros e narração.
// Os ficheiros vivem em /public/sons (ex.: tocarSom('xixi') → /sons/xixi.mp3).
//
// O áudio é sempre REDUNDÂNCIA (informação perceptível: visual + sonora):
// se a reprodução falhar nunca bloqueia a interação da criança.

// Intervalo de repetição da narração quando a criança fica parada no mesmo
// painel (pode estar bloqueada ou distraída) — voltamos a dar o som.
const REPETIR_MS = 30_000

// Cache por nome — evita recriar o elemento a cada passo.
const cache: Record<string, HTMLAudioElement> = {}

export function tocarSom(nome?: string) {
  if (!nome || typeof window === 'undefined') return
  try {
    let audio = cache[nome]
    if (!audio) {
      audio = new Audio(`/sons/${nome}.mp3`)
      cache[nome] = audio
    }
    audio.currentTime = 0
    void audio.play().catch(() => {})
  } catch {
    /* ignora — áudio é redundância, nunca trava a UX */
  }
}

/**
 * Toca a narração de um painel e, se a criança ficar parada, repete a cada 30s.
 * Quando o painel muda (chave diferente), reinicia: toca já e recomeça o timer.
 *
 * Ao aparecer toca `nome` (a instrução do passo). Nas repetições toca antes o
 * `lembrete` — ex.: "clica no botão verde para avançar" — que diz à criança
 * bloqueada o que fazer, em vez de repetir só a instrução. Sem `lembrete`,
 * repete o próprio `nome`.
 *
 * @param nome     som inicial (sem extensão); undefined ⇒ silêncio
 * @param chave    identifica o painel; quando muda, retoca. Default = nome.
 * @param lembrete som de reforço usado nas repetições (opcional)
 */
export function useNarracao(nome?: string, chave?: string | number, lembrete?: string) {
  useEffect(() => {
    if (!nome) return
    tocarSom(nome)
    const reforco = lembrete ?? nome
    const id = setInterval(() => tocarSom(reforco), REPETIR_MS)
    return () => clearInterval(id)
  }, [nome, chave, lembrete])
}
