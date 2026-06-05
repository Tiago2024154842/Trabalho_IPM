/* Dados dos níveis do mini-jogo de ordenação.
 * Cada nível define os passos da rotina na ordem correta.
 * As imagens usam fallback para heroi1.png caso não existam. */

/** @typedef {{ instrucao: string, imagem: string }} PassoJogo */
/** @typedef {{ nome: string, badge: string, corBadge: string, passos: PassoJogo[] }} NivelJogo */

/** @type {Record<string, NivelJogo>} */
export const NIVEIS = {
  facil: {
    nome: 'Fácil',
    badge: '3 passos',
    corBadge: '#C8E6C9',
    passos: [
      { instrucao: 'Sentar na sanita',   imagem: '/herois/heroi2.png' },
      { instrucao: 'Puxar o autoclismo', imagem: '/herois/heroi1.png' },
      { instrucao: 'Lavar as mãos',     imagem: '/herois/heroi4.png' },
    ],
  },
  normal: {
    nome: 'Normal',
    badge: '5 passos',
    corBadge: '#FFF8DC',
    passos: [
      { instrucao: 'Entrar na casa de banho', imagem: '/herois/heroi1.png' },
      { instrucao: 'Sentar na sanita',        imagem: '/herois/heroi2.png' },
      { instrucao: 'Limpar com papel',        imagem: '/herois/heroi6.png' },
      { instrucao: 'Puxar o autoclismo',      imagem: '/herois/heroi1.png' },
      { instrucao: 'Lavar as mãos',           imagem: '/herois/heroi4.png' },
    ],
  },
  dificil: {
    nome: 'Difícil',
    badge: '7 passos',
    corBadge: '#F3E5F5',
    passos: [
      { instrucao: 'Entrar na casa de banho', imagem: '/herois/heroi1.png' },
      { instrucao: 'Baixar as calças',        imagem: '/herois/heroi3.png' },
      { instrucao: 'Sentar na sanita',        imagem: '/herois/heroi2.png' },
      { instrucao: 'Limpar com papel',        imagem: '/herois/heroi6.png' },
      { instrucao: 'Puxar o autoclismo',      imagem: '/herois/heroi1.png' },
      { instrucao: 'Lavar as mãos',           imagem: '/herois/heroi4.png' },
      { instrucao: 'Secar as mãos',           imagem: '/herois/heroi1.png' },
    ],
  },
}

export const NIVEL_DEFAULT = 'facil'

/** Baralha um array com Fisher-Yates (não muta o original). */
export function baralhar(arr) {
  const copia = [...arr]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

/** Frases de reforço positivo (acerto). */
export const FRASES_ACERTO = ['Boa!', 'Muito bem!', 'É isso!', 'Excelente!', 'Certo!']

/** Frases suaves de erro (sem negatividade). */
export const FRASES_ERRO = [
  'Hmm, tenta outra vez!',
  'Quase! Tenta outro.',
  'Não é esse, mas estás quase!',
  'Tenta o próximo!',
]

/** Pergunta contextual por ronda. */
export function perguntaRonda(ronda) {
  if (ronda === 1) return 'Qual é o primeiro passo?'
  if (ronda === 2) return 'E a seguir?'
  if (ronda === 3) return 'E depois?'
  return 'E agora?'
}
