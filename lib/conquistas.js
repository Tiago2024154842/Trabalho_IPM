/* Sistema de conquistas / autocolantes.
 * Estado em memória de sessão — sem localStorage. */

/** @typedef {{
 *   id: string,
 *   nome: string,
 *   descricao: string,
 *   icone: string,
 *   cor: string,
 *   condicao: { tipo: string, quantidade: number },
 * }} Conquista */

/** @type {Conquista[]} */
export const CONQUISTAS = [
  {
    id: 'primeira_missao',
    nome: 'Primeira Missão',
    descricao: 'Completar uma missão',
    icone: '⭐',
    cor: '#FFF8DC',
    condicao: { tipo: 'missoes', quantidade: 1 },
  },
  {
    id: 'mestre_xixi',
    nome: 'Mestre do Xixi',
    descricao: 'Completar a missão Xixi 5 vezes',
    icone: '💧',
    cor: '#E3F2FD',
    condicao: { tipo: 'missoes_xixi', quantidade: 5 },
  },
  {
    id: 'maos_limpinhas',
    nome: 'Mãos Limpinhas',
    descricao: 'Lavar as mãos 10 vezes',
    icone: '🫧',
    cor: '#E8F5E9',
    condicao: { tipo: 'missoes_maos', quantidade: 10 },
  },
  {
    id: 'heroi_corajoso',
    nome: 'Herói Corajoso',
    descricao: 'Puxar o autoclismo 5 vezes',
    icone: '🛡️',
    cor: '#F3E5F5',
    condicao: { tipo: 'autoclismo', quantidade: 5 },
  },
  {
    id: 'resolvi_sozinho',
    nome: 'Resolvi Sozinho',
    descricao: 'Resolver 3 problemas sem adulto',
    icone: '💪',
    cor: '#FCE4EC',
    condicao: { tipo: 'ajuda_tipo_a', quantidade: 3 },
  },
  {
    id: 'mestre_coco',
    nome: 'Mestre do Cocó',
    descricao: 'Completar a missão Cocó 5 vezes',
    icone: '🌿',
    cor: '#EFEBE9',
    condicao: { tipo: 'missoes_coco', quantidade: 5 },
  },
  {
    id: 'explorador',
    nome: 'Explorador',
    descricao: 'Completar as 3 missões diferentes',
    icone: '🧭',
    cor: '#E8EAF6',
    condicao: { tipo: 'missoes_distintas', quantidade: 3 },
  },
  {
    id: 'jogo_perfeito',
    nome: 'Jogo Perfeito',
    descricao: 'Completar o jogo sem erros',
    icone: '🌟',
    cor: '#FFF3E0',
    condicao: { tipo: 'jogo_perfeito', quantidade: 1 },
  },
  {
    id: 'semana_completa',
    nome: 'Semana Completa',
    descricao: 'Usar a app 7 dias seguidos',
    icone: '📅',
    cor: '#E0F7FA',
    condicao: { tipo: 'dias_consecutivos', quantidade: 7 },
  },
  {
    id: 'super_heroi',
    nome: 'Super-Herói',
    descricao: 'Desbloquear todas as conquistas',
    icone: '👑',
    cor: '#FAC775',
    condicao: { tipo: 'todas_conquistas', quantidade: 9 },
  },
]

/* ─── Estado em memória ─── */

/** Contadores de eventos por tipo */
let contadores = {
  missoes: 2,           // pré-populado para demo
  missoes_xixi: 5,      // pré-populado: "Mestre do Xixi" desbloqueado
  missoes_coco: 1,
  missoes_maos: 10,     // pré-populado: "Mãos Limpinhas" desbloqueado
  autoclismo: 2,
  ajuda_tipo_a: 1,
  missoes_distintas: 2,  // xixi + maos já feitas na demo
  jogo_perfeito: 0,
  dias_consecutivos: 3,
  todas_conquistas: 0,
}

/** IDs de conquistas já vistas (para não repetir animação). */
let conquistasVistas = new Set(['primeira_missao', 'mestre_xixi', 'maos_limpinhas'])

/** IDs de conquistas recentemente desbloqueadas (para animação). */
let conquistasNovas = new Set()

/** Verifica se uma conquista está desbloqueada. */
export function estaDesbloqueada(conquista) {
  if (conquista.condicao.tipo === 'todas_conquistas') {
    const outrasDesbloqueadas = CONQUISTAS
      .filter(c => c.id !== 'super_heroi')
      .filter(c => estaDesbloqueada(c))
      .length
    return outrasDesbloqueadas >= conquista.condicao.quantidade
  }
  const valor = contadores[conquista.condicao.tipo] ?? 0
  return valor >= conquista.condicao.quantidade
}

/** Progresso parcial de uma conquista (para UI). */
export function progressoConquista(conquista) {
  if (conquista.condicao.tipo === 'todas_conquistas') {
    const n = CONQUISTAS.filter(c => c.id !== 'super_heroi').filter(c => estaDesbloqueada(c)).length
    return { atual: n, total: conquista.condicao.quantidade }
  }
  const atual = Math.min(contadores[conquista.condicao.tipo] ?? 0, conquista.condicao.quantidade)
  return { atual, total: conquista.condicao.quantidade }
}

/** Próxima conquista trancada mais próxima de ser desbloqueada. */
export function proximaConquista() {
  let melhor = null
  let melhorRatio = -1
  for (const c of CONQUISTAS) {
    if (estaDesbloqueada(c)) continue
    const p = progressoConquista(c)
    const ratio = p.atual / p.total
    if (ratio > melhorRatio) {
      melhorRatio = ratio
      melhor = c
    }
  }
  return melhor
}

/** Total de conquistas desbloqueadas. */
export function totalDesbloqueadas() {
  return CONQUISTAS.filter(c => estaDesbloqueada(c)).length
}

/**
 * Regista um evento e verifica novas conquistas.
 * @param {'missao_completa'|'jogo_completo'|'ajuda_resolvida'|'barulho_superado'|'autoclismo_puxado'} tipo
 * @param {{ missao?: string, erros?: number }} dados
 * @returns {{ novaConquista: boolean, conquista?: Conquista }}
 */
export function registarEvento(tipo, dados = {}) {
  // Atualizar contadores
  switch (tipo) {
    case 'missao_completa':
      contadores.missoes = (contadores.missoes ?? 0) + 1
      if (dados.missao) {
        const key = `missoes_${dados.missao}`
        contadores[key] = (contadores[key] ?? 0) + 1
      }
      // Missões com autoclismo (xixi/coco) contam
      if (dados.missao === 'xixi' || dados.missao === 'coco') {
        contadores.autoclismo = (contadores.autoclismo ?? 0) + 1
      }
      // Contar missões distintas completadas
      {
        const tipos = ['xixi', 'coco', 'maos']
        const distintas = tipos.filter(t => (contadores[`missoes_${t}`] ?? 0) > 0).length
        contadores.missoes_distintas = distintas
      }
      break
    case 'jogo_completo':
      if (dados.erros === 0) {
        contadores.jogo_perfeito = (contadores.jogo_perfeito ?? 0) + 1
      }
      break
    case 'ajuda_resolvida':
      contadores.ajuda_tipo_a = (contadores.ajuda_tipo_a ?? 0) + 1
      break
    case 'autoclismo_puxado':
      contadores.autoclismo = (contadores.autoclismo ?? 0) + 1
      break
  }

  // Verificar novas conquistas
  for (const c of CONQUISTAS) {
    if (estaDesbloqueada(c) && !conquistasVistas.has(c.id)) {
      conquistasVistas.add(c.id)
      conquistasNovas.add(c.id)
      return { novaConquista: true, conquista: c }
    }
  }
  return { novaConquista: false }
}

/** Verifica se a conquista é nova (para animação de revelação). */
export function eConquistaNova(id) {
  return conquistasNovas.has(id)
}

/** Marca conquista como vista (após animação). */
export function marcarComoVista(id) {
  conquistasNovas.delete(id)
}
